import { DictionaryTerm } from '../types/dictionary';
import {
  ThcsChapter,
  ThcsGradeBook,
  ThcsGradeNumber,
  ThcsLesson,
  ThcsVocabItem,
} from '../types/thcsCurriculum';
import { THCS_GRADE_6 } from './thcsGrade6';
import { THCS_GRADE_7 } from './thcsGrade7';
import { THCS_GRADE_8 } from './thcsGrade8';
import { THCS_GRADE_9 } from './thcsGrade9';

export const THCS_CURRICULUM_BOOKS: ThcsGradeBook[] = [
  THCS_GRADE_6,
  THCS_GRADE_7,
  THCS_GRADE_8,
  THCS_GRADE_9,
];

export function getGradeBook(grade: ThcsGradeNumber): ThcsGradeBook {
  return THCS_CURRICULUM_BOOKS.find((b) => b.grade === grade) || THCS_GRADE_6;
}

export interface ThcsLessonLocation {
  grade: ThcsGradeNumber;
  chapter: ThcsChapter;
  lesson: ThcsLesson;
}

export interface ThcsSearchHit {
  type: 'lesson' | 'vocab' | 'notation' | 'expression' | 'example';
  grade: ThcsGradeNumber;
  chapter: ThcsChapter;
  lesson: ThcsLesson;
  title: string;
  subtitle: string;
  matchedTextEn?: string;
  matchedTextVi?: string;
}

function normalizeText(str: string): string {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function searchThcsCurriculum(
  query: string,
  gradeFilter?: ThcsGradeNumber | 'all'
): ThcsSearchHit[] {
  const q = normalizeText(query);
  if (!q) return [];

  const books =
    gradeFilter && gradeFilter !== 'all'
      ? THCS_CURRICULUM_BOOKS.filter((b) => b.grade === gradeFilter)
      : THCS_CURRICULUM_BOOKS;

  const hits: ThcsSearchHit[] = [];

  for (const book of books) {
    for (const chapter of book.chapters) {
      for (const lesson of chapter.lessons) {
        // Match lesson title
        if (
          normalizeText(lesson.titleEn).includes(q) ||
          normalizeText(lesson.titleVi).includes(q) ||
          normalizeText(chapter.titleEn).includes(q) ||
          normalizeText(chapter.titleVi).includes(q)
        ) {
          hits.push({
            type: 'lesson',
            grade: book.grade,
            chapter,
            lesson,
            title: `${lesson.titleEn}`,
            subtitle: `Lớp ${book.grade} • Chương ${chapter.chapterNumber}: ${chapter.titleVi} — ${lesson.titleVi}`,
          });
        }

        // Match vocabulary
        for (const v of lesson.vocabulary) {
          if (
            normalizeText(v.termEn).includes(q) ||
            normalizeText(v.meaningVi).includes(q) ||
            normalizeText(v.definitionEn).includes(q) ||
            normalizeText(v.definitionVi).includes(q)
          ) {
            hits.push({
              type: 'vocab',
              grade: book.grade,
              chapter,
              lesson,
              title: v.termEn,
              subtitle: `Từ vựng Lớp ${book.grade} • Bài ${lesson.lessonNumber}`,
              matchedTextEn: v.definitionEn,
              matchedTextVi: `${v.meaningVi} — ${v.definitionVi}`,
            });
          }
        }

        // Match notation readings
        for (const n of lesson.notationReadings) {
          if (
            normalizeText(n.readAsEn).includes(q) ||
            normalizeText(n.meaningVi).includes(q) ||
            normalizeText(n.symbolLatex).includes(q)
          ) {
            hits.push({
              type: 'notation',
              grade: book.grade,
              chapter,
              lesson,
              title: n.readAsEn,
              subtitle: `Cách đọc ký hiệu • Lớp ${book.grade} • Bài ${lesson.lessonNumber}`,
              matchedTextEn: n.symbolLatex,
              matchedTextVi: n.meaningVi,
            });
          }
        }

        // Match classroom expressions
        for (const expr of lesson.classroomExpressions) {
          if (normalizeText(expr.en).includes(q) || normalizeText(expr.vi).includes(q)) {
            hits.push({
              type: 'expression',
              grade: book.grade,
              chapter,
              lesson,
              title: expr.en,
              subtitle: `Mẫu câu giảng dạy • Lớp ${book.grade} • Bài ${lesson.lessonNumber}`,
              matchedTextEn: expr.en,
              matchedTextVi: expr.vi,
            });
          }
        }

        // Match worked examples
        for (const ex of lesson.workedExamples) {
          if (
            normalizeText(ex.titleEn).includes(q) ||
            normalizeText(ex.titleVi).includes(q) ||
            normalizeText(ex.problemEn).includes(q) ||
            normalizeText(ex.problemVi).includes(q)
          ) {
            hits.push({
              type: 'example',
              grade: book.grade,
              chapter,
              lesson,
              title: ex.titleEn,
              subtitle: `Ví dụ minh họa • Lớp ${book.grade} • Bài ${lesson.lessonNumber}`,
              matchedTextEn: ex.problemEn,
              matchedTextVi: ex.problemVi,
            });
          }
        }
      }
    }
  }

  return hits.slice(0, 40);
}

export function findThcsReferencesForWord(word: string): ThcsLessonLocation[] {
  const q = normalizeText(word);
  if (!q) return [];
  const results: ThcsLessonLocation[] = [];

  for (const book of THCS_CURRICULUM_BOOKS) {
    for (const chapter of book.chapters) {
      for (const lesson of chapter.lessons) {
        const hasMatch =
          lesson.vocabulary.some((v) =>
            v.termEn
              .split('/')
              .some((part) => normalizeText(part).includes(q) || q.includes(normalizeText(part)))
          ) ||
          normalizeText(lesson.titleEn).includes(q);
        if (hasMatch) {
          results.push({ grade: book.grade, chapter, lesson });
        }
      }
    }
  }

  return results;
}

// Convert THCS vocabulary items into DictionaryTerms so global search finds every THCS term
export function buildThcsDictionaryTerms(): DictionaryTerm[] {
  const terms: DictionaryTerm[] = [];

  const toTerm = (
    v: ThcsVocabItem,
    grade: ThcsGradeNumber,
    chapter: ThcsChapter,
    lesson: ThcsLesson,
    idx: number
  ): DictionaryTerm => {
    const cleanMainWord = v.termEn.split('/')[0].trim();
    return {
      id: `thcs_g${grade}_l${lesson.lessonNumber}_${idx}`,
      word: cleanMainWord,
      ipaUk: v.ipaUk,
      ipaUs: v.ipaUs,
      wordType: (v.wordType as any) || 'noun',
      primaryMeaningVi: v.meaningVi,
      khktDefVi: `${v.meaningVi} — ${v.definitionVi}`,
      khktTags: chapter.disciplineId === 'geometry_trig' ? ['hh.', 'pt.'] : chapter.disciplineId === 'probability_statistics' ? ['xs.', 'tk.'] : ['đs.', 'pt.'],
      oxfordDefEn: v.definitionEn,
      simpleDefinitionEn: v.definitionEn,
      discipline: (chapter.disciplineId as any) || 'k12_arithmetic',
      primarySubjectId: 'math',
      applicableGrades: [grade],
      educationLevel: 'secondary',
      pedagogyNotesVi: v.teacherNoteVi || `Thuộc Toán Lớp ${grade} (MOET 2026) • Chương ${chapter.chapterNumber}: ${chapter.titleVi} • Bài ${lesson.lessonNumber}: ${lesson.titleVi}.`,
      relatedTerms: v.termEn
        .split('/')
        .map((s) => s.trim())
        .filter((s) => s && s.toLowerCase() !== cleanMainWord.toLowerCase()),
      synonyms: [],
      antonyms: [],
      senses: [
        {
          subjectId: 'math',
          subjectNameVi: `Toán THCS Lớp ${grade}`,
          disciplineId: (chapter.disciplineId as any) || 'k12_arithmetic',
          disciplineNameVi: chapter.titleVi,
          meaningVi: v.meaningVi,
          disciplineExplanationVi: `${v.definitionVi}${v.teacherNoteEn ? ` (${v.teacherNoteEn})` : ''}`,
          grades: [grade],
          topic: `${chapter.titleVi} – ${lesson.titleVi}`,
          examples: [
            {
              sentenceEn: v.exampleEn,
              sentenceVi: v.exampleVi,
            },
          ],
        },
      ],
    };
  };

  for (const book of THCS_CURRICULUM_BOOKS) {
    for (const chapter of book.chapters) {
      for (const lesson of chapter.lessons) {
        lesson.vocabulary.forEach((v, idx) => {
          terms.push(toTerm(v, book.grade, chapter, lesson, idx));
        });
      }
    }
  }

  return terms;
}

export interface ThcsPracticeItem {
  id: string;
  term: DictionaryTerm;
  grade: ThcsGradeNumber;
  chapterId: string;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleVi: string;
  lessonId: string;
  lessonNumber: number;
  lessonTitleEn: string;
  lessonTitleVi: string;
  definitionVi: string;
  teacherNoteVi?: string;
  teacherNoteEn?: string;
}

export function cleanMathForSpeech(input: string): string {
  if (!input) return '';
  return input
    .replace(/\$\$/g, ' ')
    .replace(/\$/g, ' ')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2')
    .replace(/\\sqrt\[3\]\{([^}]+)\}/g, 'cube root of $1')
    .replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1')
    .replace(/\\triangle/g, 'triangle')
    .replace(/\\angle/g, 'angle')
    .replace(/\\widehat\{([^}]+)\}/g, 'angle $1')
    .replace(/\\parallel/g, 'is parallel to')
    .replace(/\\perp/g, 'is perpendicular to')
    .replace(/\\cong/g, 'is congruent to')
    .replace(/\\sim/g, 'is similar to')
    .replace(/\\in/g, 'belongs to')
    .replace(/\\notin/g, 'does not belong to')
    .replace(/\\ne/g, 'is not equal to')
    .replace(/\\le/g, 'is less than or equal to')
    .replace(/\\ge/g, 'is greater than or equal to')
    .replace(/\\pm/g, 'plus or minus')
    .replace(/\\times|\\cdot/g, 'times')
    .replace(/\\div/g, 'divided by')
    .replace(/\\implies/g, 'implies')
    .replace(/\\iff/g, 'if and only if')
    .replace(/\\pi/g, 'pi')
    .replace(/\\alpha/g, 'alpha')
    .replace(/\\beta/g, 'beta')
    .replace(/\\Delta/g, 'delta')
    .replace(/\\Omega/g, 'omega')
    .replace(/\^\\circ/g, ' degrees')
    .replace(/\^2/g, ' squared')
    .replace(/\^3/g, ' cubed')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getThcsPracticeDeck(filter?: {
  grade?: ThcsGradeNumber | 'all';
  chapterId?: string | 'all';
  lessonId?: string | 'all';
}): ThcsPracticeItem[] {
  const gradeFilter = filter?.grade ?? 'all';
  const chapterFilter = filter?.chapterId ?? 'all';
  const lessonFilter = filter?.lessonId ?? 'all';

  const deck: ThcsPracticeItem[] = [];

  for (const book of THCS_CURRICULUM_BOOKS) {
    if (gradeFilter !== 'all' && book.grade !== gradeFilter) continue;

    for (const chapter of book.chapters) {
      if (chapterFilter !== 'all' && chapter.id !== chapterFilter) continue;

      for (const lesson of chapter.lessons) {
        if (lessonFilter !== 'all' && lesson.id !== lessonFilter) continue;

        lesson.vocabulary.forEach((v, idx) => {
          const id = `thcs_g${book.grade}_l${lesson.lessonNumber}_${idx}`;
          const cleanMainWord = v.termEn.split('/')[0].trim();
          const term: DictionaryTerm = {
            id,
            word: cleanMainWord,
            ipaUk: v.ipaUk,
            ipaUs: v.ipaUs,
            wordType: (v.wordType as any) || 'noun',
            primaryMeaningVi: v.meaningVi,
            khktDefVi: `${v.meaningVi} — ${v.definitionVi}`,
            khktTags:
              chapter.disciplineId === 'geometry_trig'
                ? ['hh.', 'pt.']
                : chapter.disciplineId === 'probability_statistics'
                ? ['xs.', 'tk.']
                : ['đs.', 'pt.'],
            oxfordDefEn: v.definitionEn,
            simpleDefinitionEn: v.definitionEn,
            discipline: (chapter.disciplineId as any) || 'k12_arithmetic',
            primarySubjectId: 'math',
            applicableGrades: [book.grade],
            educationLevel: 'secondary',
            pedagogyNotesVi:
              v.teacherNoteVi ||
              `Thuộc Toán Lớp ${book.grade} (MOET 2026) • Chương ${chapter.chapterNumber}: ${chapter.titleVi} • Bài ${lesson.lessonNumber}: ${lesson.titleVi}.`,
            relatedTerms: v.termEn
              .split('/')
              .map((s) => s.trim())
              .filter((s) => s && s.toLowerCase() !== cleanMainWord.toLowerCase()),
            synonyms: [],
            antonyms: [],
            senses: [
              {
                subjectId: 'math',
                subjectNameVi: `Toán THCS Lớp ${book.grade}`,
                disciplineId: (chapter.disciplineId as any) || 'k12_arithmetic',
                disciplineNameVi: chapter.titleVi,
                meaningVi: v.meaningVi,
                disciplineExplanationVi: `${v.definitionVi}${v.teacherNoteEn ? ` (${v.teacherNoteEn})` : ''}`,
                grades: [book.grade],
                topic: `${chapter.titleVi} – ${lesson.titleVi}`,
                examples: [
                  {
                    sentenceEn: v.exampleEn,
                    sentenceVi: v.exampleVi,
                  },
                ],
              },
            ],
          };

          deck.push({
            id,
            term,
            grade: book.grade,
            chapterId: chapter.id,
            chapterNumber: chapter.chapterNumber,
            chapterTitleEn: chapter.titleEn,
            chapterTitleVi: chapter.titleVi,
            lessonId: lesson.id,
            lessonNumber: lesson.lessonNumber,
            lessonTitleEn: lesson.titleEn,
            lessonTitleVi: lesson.titleVi,
            definitionVi: v.definitionVi,
            teacherNoteVi: v.teacherNoteVi,
            teacherNoteEn: v.teacherNoteEn,
          });
        });
      }
    }
  }

  return deck;
}

