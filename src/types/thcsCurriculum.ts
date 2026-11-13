export type ThcsGradeNumber = 6 | 7 | 8 | 9;

export type ExpressionCategory = 'explaining' | 'questioning' | 'instructing' | 'solving';

export interface ThcsVocabItem {
  termEn: string;
  ipaUk: string;
  ipaUs: string;
  wordType?: string;
  meaningVi: string;
  definitionEn: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  teacherNoteVi?: string;
  teacherNoteEn?: string;
}

export interface ThcsNotationItem {
  symbolLatex: string;
  readAsEn: string;
  meaningVi: string;
  explanationEn: string;
  explanationVi: string;
  exampleLatex?: string;
  exampleReadAsEn?: string;
}

export interface ThcsExpressionItem {
  category: ExpressionCategory;
  en: string;
  vi: string;
  contextNoteVi?: string;
}

export interface ThcsWorkedStep {
  stepNumber: number;
  stepEn: string;
  stepVi: string;
  mathLatex?: string;
}

export interface ThcsWorkedExample {
  id: string;
  titleEn: string;
  titleVi: string;
  problemEn: string;
  problemVi: string;
  steps: ThcsWorkedStep[];
  conclusionEn: string;
  conclusionVi: string;
}

export interface ThcsExerciseItem {
  id: string;
  level: 'Foundation' | 'Core' | 'Challenge';
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
  explanationEn: string;
  explanationVi: string;
}

export interface ThcsLesson {
  id: string;
  lessonNumber: number;
  titleEn: string;
  titleVi: string;
  pdfPage?: number;
  objectivesEn: string[];
  objectivesVi: string[];
  vocabulary: ThcsVocabItem[];
  notationReadings: ThcsNotationItem[];
  classroomExpressions: ThcsExpressionItem[];
  workedExamples: ThcsWorkedExample[];
  exercises: ThcsExerciseItem[];
}

export interface ThcsChapter {
  id: string;
  grade: ThcsGradeNumber;
  chapterNumber: number;
  titleEn: string;
  titleVi: string;
  overviewEn: string;
  overviewVi: string;
  disciplineId: string;
  lessons: ThcsLesson[];
}

export interface ThcsGradeBook {
  grade: ThcsGradeNumber;
  titleEn: string;
  titleVi: string;
  pdfUrl: string;
  pdfFileName: string;
  totalChapters: number;
  totalLessons: number;
  chapters: ThcsChapter[];
}
