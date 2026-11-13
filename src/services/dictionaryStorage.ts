import { DictionaryTerm, EducationLevel, FlashcardProgress, UserFavoriteItem, UserHistoryItem, WordType } from '../types/dictionary';
import { DEFAULT_DICTIONARY_TERMS } from '../data/defaultTerms';

const STORAGE_KEYS = {
  TERMS: 'mathlexicon_terms_v3',
  FAVORITES: 'mathlexicon_favorites_v2',
  HISTORY: 'mathlexicon_history_v2',
  FLASHCARDS: 'mathlexicon_flashcards_v2',
  SETTINGS: 'mathlexicon_settings_v2',
};

// Calculate Levenshtein Distance for typo tolerance
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Remove Vietnamese accents for flexible search
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export class DictionaryStorage {
  // Load all terms (default + custom)
  static getAllTerms(): DictionaryTerm[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TERMS);
      if (stored) {
        const storedTerms: DictionaryTerm[] = JSON.parse(stored);
        // Retain user custom-created terms
        const customTerms = storedTerms.filter(t => t.isCustom || t.id.startsWith('term_custom_'));
        const customIds = new Set(customTerms.map(t => t.id));
        const merged = [
          ...customTerms,
          ...DEFAULT_DICTIONARY_TERMS.filter(t => !customIds.has(t.id))
        ];
        return merged;
      }
    } catch (e) {
      console.warn('Error reading stored terms, falling back to defaults:', e);
    }
    return [...DEFAULT_DICTIONARY_TERMS];
  }

  // Save all custom terms
  static saveAllTerms(terms: DictionaryTerm[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TERMS, JSON.stringify(terms));
    } catch (e) {
      console.error('Failed to save terms:', e);
    }
  }

  // Search terms in English -> Vietnamese
  static search(
    query: string,
    options?: {
      subjectId?: string;
      disciplineId?: string;
      grade?: number | 'all';
      educationLevel?: EducationLevel | 'all';
      wordType?: WordType | 'all';
    }
  ): { terms: DictionaryTerm[]; isFuzzy: boolean } {
    const rawQuery = (query || '').trim().toLowerCase();
    const cleanQuery = removeVietnameseTones(rawQuery);
    let all = this.getAllTerms();

    // Filter by discipline / subject
    if (options?.disciplineId && options.disciplineId !== 'all') {
      all = all.filter(t => 
        t.discipline === options.disciplineId || 
        t.senses.some(s => s.disciplineId === options.disciplineId)
      );
    } else if (options?.subjectId && options.subjectId !== 'all') {
      all = all.filter(t => 
        t.primarySubjectId === options.subjectId || 
        t.discipline === (options.subjectId as any) ||
        t.senses.some(s => s.subjectId === options.subjectId)
      );
    }

    // Filter by grade
    if (options?.grade && options.grade !== 'all') {
      const g = Number(options.grade);
      all = all.filter(t => 
        t.applicableGrades.includes(g) ||
        t.senses.some(s => s.grades.includes(g))
      );
    }

    // Filter by education level
    if (options?.educationLevel && options.educationLevel !== 'all') {
      all = all.filter(t => t.educationLevel === options.educationLevel);
    }

    // Filter by word type
    if (options?.wordType && options.wordType !== 'all') {
      all = all.filter(t => t.wordType === options.wordType);
    }

    if (!rawQuery) {
      return { terms: all, isFuzzy: false };
    }

    // 1. Exact match on English word
    const exactMatches = all.filter(t => t.word.toLowerCase() === rawQuery);

    // 2. Starts with query
    const prefixMatches = all.filter(
      t => t.word.toLowerCase().startsWith(rawQuery) && !exactMatches.includes(t)
    );

    // 3. Contains in word, KH&KT sub-entries, Oxford definitions, or Vietnamese meanings
    const contentMatches = all.filter(t => {
      if (exactMatches.includes(t) || prefixMatches.includes(t)) return false;
      const word = t.word.toLowerCase();
      const viMeaning = removeVietnameseTones(t.primaryMeaningVi);
      const khktVi = removeVietnameseTones(t.khktDefVi || '');
      const enDef = (t.oxfordDefEn || t.simpleDefinitionEn || '').toLowerCase();
      const collocations = (t.oxfordCollocations || t.collocations || []).map(c => c.toLowerCase()).join(' ');
      const subEntries = (t.khktSubEntries || []).map(se => (se.phraseEn + ' ' + se.meaningVi).toLowerCase()).join(' ');
      const related = (t.relatedTerms || []).map(r => r.toLowerCase()).join(' ');
      const synonyms = (t.synonyms || []).map(s => s.toLowerCase()).join(' ');
      const senseVi = t.senses.map(s => removeVietnameseTones(s.meaningVi + ' ' + s.disciplineExplanationVi)).join(' ');

      return (
        word.includes(rawQuery) ||
        viMeaning.includes(cleanQuery) ||
        khktVi.includes(cleanQuery) ||
        enDef.includes(rawQuery) ||
        collocations.includes(rawQuery) ||
        subEntries.includes(rawQuery) ||
        removeVietnameseTones(subEntries).includes(cleanQuery) ||
        related.includes(rawQuery) ||
        synonyms.includes(rawQuery) ||
        senseVi.includes(cleanQuery)
      );
    });

    const directResults = [...exactMatches, ...prefixMatches, ...contentMatches];

    if (directResults.length > 0) {
      return { terms: directResults, isFuzzy: false };
    }

    // 4. Fuzzy search (if user misspelled the English word)
    if (rawQuery.length >= 3) {
      const fuzzyMatches = all.filter(t => {
        const dist = levenshteinDistance(t.word.toLowerCase(), rawQuery);
        // Allow distance <= 2 for words >= 4 letters
        return dist <= (rawQuery.length > 5 ? 2 : 1);
      });

      if (fuzzyMatches.length > 0) {
        return { terms: fuzzyMatches, isFuzzy: true };
      }
    }

    return { terms: [], isFuzzy: false };
  }

  // Reverse search: Vietnamese -> English
  static searchVietnamese(query: string, subjectId?: string): DictionaryTerm[] {
    const cleanQuery = removeVietnameseTones((query || '').trim());
    if (!cleanQuery) return this.getAllTerms();

    let all = this.getAllTerms();
    if (subjectId && subjectId !== 'all') {
      all = all.filter(t => 
        t.primarySubjectId === subjectId || 
        t.senses.some(s => s.subjectId === subjectId)
      );
    }

    return all.filter(t => {
      const primaryVi = removeVietnameseTones(t.primaryMeaningVi);
      if (primaryVi.includes(cleanQuery)) return true;

      const sensesMatch = t.senses.some(s => 
        removeVietnameseTones(s.meaningVi).includes(cleanQuery) ||
        removeVietnameseTones(s.disciplineExplanationVi).includes(cleanQuery) ||
        removeVietnameseTones(s.topic).includes(cleanQuery)
      );
      return sensesMatch;
    });
  }

  static getTermById(id: string): DictionaryTerm | undefined {
    return this.getAllTerms().find(t => t.id === id);
  }

  static getTermByWord(word: string): DictionaryTerm | undefined {
    const w = word.trim().toLowerCase();
    const all = this.getAllTerms();
    // 1. Direct word match
    let match = all.find(t => t.word.toLowerCase() === w);
    if (match) return match;
    // 2. Exact match in relatedTerms or synonyms
    match = all.find(t =>
      (t.relatedTerms || []).some(r => r.toLowerCase() === w) ||
      (t.synonyms || []).some(s => s.toLowerCase() === w)
    );
    if (match) return match;
    // 3. Sub-segment in slash-separated words e.g. "digit" in "number / digit"
    match = all.find(t => {
      const parts = t.word.toLowerCase().split(/[\s/()+,]+/);
      return parts.includes(w);
    });
    return match;
  }

  static saveTerm(term: DictionaryTerm): void {
    const terms = this.getAllTerms();
    const idx = terms.findIndex(t => t.id === term.id);
    if (idx >= 0) {
      terms[idx] = term;
    } else {
      terms.unshift(term);
    }
    this.saveAllTerms(terms);
  }

  static deleteTerm(id: string): void {
    const terms = this.getAllTerms().filter(t => t.id !== id);
    this.saveAllTerms(terms);
  }

  // Duplicates check
  static findDuplicates(): { word: string; terms: DictionaryTerm[] }[] {
    const all = this.getAllTerms();
    const map = new Map<string, DictionaryTerm[]>();
    for (const t of all) {
      const key = t.word.toLowerCase().trim();
      const list = map.get(key) || [];
      list.push(t);
      map.set(key, list);
    }
    const duplicates: { word: string; terms: DictionaryTerm[] }[] = [];
    map.forEach((terms, word) => {
      if (terms.length > 1) {
        duplicates.push({ word, terms });
      }
    });
    return duplicates;
  }

  // --- FAVORITES ---
  static getFavorites(): UserFavoriteItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static isFavorite(termId: string): boolean {
    return this.getFavorites().some(f => f.termId === termId);
  }

  static toggleFavorite(termId: string, notes?: string): boolean {
    let favs = this.getFavorites();
    const exists = favs.some(f => f.termId === termId);
    if (exists) {
      favs = favs.filter(f => f.termId !== termId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      return false;
    } else {
      favs.unshift({ termId, addedAt: Date.now(), notes });
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      return true;
    }
  }

  // --- HISTORY ---
  static getHistory(): UserHistoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static addHistory(item: Omit<UserHistoryItem, 'id' | 'timestamp'>): void {
    try {
      const history = this.getHistory();
      // Keep recent 100 entries, avoid immediate duplicates
      const filtered = history.filter(h => !(h.query === item.query && h.type === item.type));
      const newItem: UserHistoryItem = {
        ...item,
        id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        timestamp: Date.now(),
      };
      filtered.unshift(newItem);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered.slice(0, 100)));
    } catch (e) {
      console.warn('Failed to add history:', e);
    }
  }

  static clearHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  }

  // --- FLASHCARDS PROGRESS (Leitner 5-box system) ---
  static getFlashcardProgress(): Record<string, FlashcardProgress> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  static updateFlashcardResult(termId: string, isCorrect: boolean): void {
    const progress = this.getFlashcardProgress();
    const current = progress[termId] || {
      termId,
      box: 1,
      lastReviewed: 0,
      nextReviewDate: 0,
      timesCorrect: 0,
      timesIncorrect: 0,
    };

    if (isCorrect) {
      current.box = Math.min(5, current.box + 1);
      current.timesCorrect += 1;
    } else {
      current.box = 1; // Reset to box 1 upon error
      current.timesIncorrect += 1;
    }

    current.lastReviewed = Date.now();
    // Spaced repetition intervals: box 1: 1 day, box 2: 3 days, box 3: 7 days, box 4: 14 days, box 5: 30 days
    const intervalDays = [1, 3, 7, 14, 30][current.box - 1];
    current.nextReviewDate = Date.now() + intervalDays * 24 * 60 * 60 * 1000;

    progress[termId] = current;
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(progress));
  }

  // --- IMPORT / EXPORT ---
  static exportToJson(): string {
    const terms = this.getAllTerms();
    return JSON.stringify(terms, null, 2);
  }

  static exportToCsv(): string {
    const terms = this.getAllTerms();
    const headers = [
      'Từ tiếng Anh (Word)',
      'Phiên âm UK',
      'Phiên âm US',
      'Loại từ',
      'Nghĩa tiếng Việt',
      'Định nghĩa tiếng Anh',
      'Môn học chính',
      'Các lớp áp dụng',
      'Cụm từ đi kèm',
      'Ví dụ tiếng Anh',
      'Dịch ví dụ'
    ];

    const rows = terms.map(t => {
      const firstSense = t.senses[0];
      const firstEx = firstSense?.examples[0];
      return [
        `"${(t.word || '').replace(/"/g, '""')}"`,
        `"${(t.ipaUk || '').replace(/"/g, '""')}"`,
        `"${(t.ipaUs || '').replace(/"/g, '""')}"`,
        `"${(t.wordType || '').replace(/"/g, '""')}"`,
        `"${(t.primaryMeaningVi || '').replace(/"/g, '""')}"`,
        `"${(t.simpleDefinitionEn || '').replace(/"/g, '""')}"`,
        `"${t.primarySubjectId || ''}"`,
        `"${t.applicableGrades.join(',')}"`,
        `"${(t.collocations || []).join('; ')}"`,
        `"${(firstEx?.sentenceEn || '').replace(/"/g, '""')}"`,
        `"${(firstEx?.sentenceVi || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  static importFromCsv(csvText: string): { importedCount: number; errors: string[] } {
    const lines = csvText.split('\n').filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      return { importedCount: 0, errors: ['File CSV không có dữ liệu hợp lệ.'] };
    }

    const errors: string[] = [];
    let count = 0;
    const currentTerms = this.getAllTerms();

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Basic CSV split supporting quotes
      const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
      const values: string[] = [];
      let match;
      while ((match = regex.exec(line))) {
        let val = match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2];
        if (val !== undefined) values.push(val.trim());
      }

      if (values.length < 5) {
        errors.push(`Dòng ${i + 1}: Không đủ số cột tối thiểu.`);
        continue;
      }

      const [
        word,
        ipaUk,
        ipaUs,
        wordType,
        meaningVi,
        simpleDef,
        subjectId,
        gradesStr,
        collocStr,
        exEn,
        exVi
      ] = values;

      if (!word || !meaningVi) {
        errors.push(`Dòng ${i + 1}: Từ hoặc nghĩa tiếng Việt bị rỗng.`);
        continue;
      }

      const grades = (gradesStr || '10')
        .split(',')
        .map(g => parseInt(g.trim(), 10))
        .filter(n => !isNaN(n) && n >= 1 && n <= 12);

      const newTerm: DictionaryTerm = {
        id: 'term_custom_' + Date.now() + '_' + i,
        word: word.trim(),
        ipaUk: ipaUk || '/.../',
        ipaUs: ipaUs || ipaUk || '/.../',
        wordType: (wordType as WordType) || 'noun',
        primaryMeaningVi: meaningVi.trim(),
        simpleDefinitionEn: simpleDef || 'Educational term in ' + (subjectId || 'general studies'),
        primarySubjectId: subjectId || 'math',
        applicableGrades: grades.length > 0 ? grades : [10],
        educationLevel: grades[0] <= 5 ? 'primary' : grades[0] <= 9 ? 'secondary' : 'high_school',
        senses: [
          {
            subjectId: subjectId || 'math',
            subjectNameVi: subjectId || 'Chuyên ngành',
            meaningVi: meaningVi.trim(),
            disciplineExplanationVi: meaningVi.trim(),
            grades: grades.length > 0 ? grades : [10],
            topic: 'Nhập từ file',
            examples: exEn ? [{ sentenceEn: exEn, sentenceVi: exVi || '' }] : []
          }
        ],
        synonyms: [],
        antonyms: [],
        relatedTerms: [],
        collocations: collocStr ? collocStr.split(';').map(s => s.trim()) : [],
        isCustom: true,
        createdAt: new Date().toISOString()
      };

      currentTerms.unshift(newTerm);
      count++;
    }

    this.saveAllTerms(currentTerms);
    return { importedCount: count, errors };
  }
}
