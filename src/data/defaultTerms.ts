import { DictionaryTerm } from '../types/dictionary';
import { MATH_DICTIONARY_DATASET } from './mathDataset';
import { MATH_DICTIONARY_TERMS } from './mathTerms';
import { buildThcsDictionaryTerms } from './thcsCurriculum';

// Helper to normalize and ensure full dual-source metadata on every math term
function enrichMathTerm(t: DictionaryTerm): DictionaryTerm {
  const isK12 = t.educationLevel === 'primary' || (t.applicableGrades && t.applicableGrades.some(g => g <= 9));
  
  return {
    ...t,
    discipline: t.discipline || (isK12 ? 'k12_arithmetic' : 'algebra'),
    primarySubjectId: 'math',
    khktDefVi: t.khktDefVi || t.primaryMeaningVi,
    khktTags: t.khktTags || (isK12 ? ['đs.', 'pt.'] : ['đs.']),
    oxfordDefEn: t.oxfordDefEn || t.simpleDefinitionEn || 'A key concept in mathematical studies.',
    oxfordCollocations: t.oxfordCollocations || t.collocations || [],
    pedagogyNotesVi: t.pedagogyNotesVi || t.usageNotesVi,
    formulaLatex: t.formulaLatex || t.senses?.[0]?.formulaLatex,
  };
}

const enrichedMathTerms = MATH_DICTIONARY_TERMS.map(enrichMathTerm);
const thcsTerms = buildThcsDictionaryTerms();

// Deduplicate by word lowercase to prevent multiple instances of the same term
const wordMap = new Map<string, DictionaryTerm>();

// 1. First add the authoritative dataset with exact KH&KT 1976 page numbers
for (const term of MATH_DICTIONARY_DATASET) {
  wordMap.set(term.word.toLowerCase().trim(), term);
}

// 2. Add the comprehensive K-12 list and THCS Grade 6-9 bilingual curriculum vocabulary
for (const term of [...enrichedMathTerms, ...thcsTerms]) {
  const key = term.word.toLowerCase().trim();
  if (!wordMap.has(key)) {
    wordMap.set(key, term);
  } else {
    // Merge any missing fields & grades into the existing entry
    const existing = wordMap.get(key)!;
    if (!existing.formulaLatex && term.formulaLatex) existing.formulaLatex = term.formulaLatex;
    if (!existing.pedagogyNotesVi && term.pedagogyNotesVi) existing.pedagogyNotesVi = term.pedagogyNotesVi;
    if (term.applicableGrades?.length) {
      const mergedGrades = Array.from(new Set([...(existing.applicableGrades || []), ...term.applicableGrades]));
      existing.applicableGrades = mergedGrades;
    }
    if (term.senses && term.senses.length > 0 && (!existing.senses || existing.senses.length === 0)) {
      existing.senses = term.senses;
    }
  }
}

export const DEFAULT_DICTIONARY_TERMS: DictionaryTerm[] = Array.from(wordMap.values());
