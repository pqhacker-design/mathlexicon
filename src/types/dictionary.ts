export type EducationLevel = 'primary' | 'secondary' | 'high_school' | 'university'; // Tiểu học, THCS, THPT, Đại học

export type MathDisciplineId =
  | 'algebra'                 // Đại số (đs.)
  | 'geometry_trig'           // Hình học & Lượng giác (hh.)
  | 'calculus_analysis'       // Giải tích (gt.)
  | 'probability_statistics'  // Xác suất & Thống kê (xs., tk.)
  | 'discrete_logic'          // Toán rời rạc & Logic (log.)
  | 'topology'                // Tôpô học (top.)
  | 'computing_cybernetics'   // Toán tin & Điều khiển học (mt., xib.)
  | 'applied_mechanics'       // Toán ứng dụng & Cơ học (cơ., vl., kt.)
  | 'k12_arithmetic';         // Số học & Toán phổ thông nền tảng

export interface MathDisciplineInfo {
  id: MathDisciplineId;
  nameVi: string;
  nameEn: string;
  abbrevVi: string; // e.g. "đs.", "hh.", "gt."
  icon: string;
  color: string;
  bgLight: string;
  descriptionVi: string;
}

export interface SubjectInfo {
  id: string;
  nameVi: string;
  nameEn: string;
  category: 'natural' | 'social' | 'arts_physical' | 'cross_discipline';
  icon: string;
  color: string;
  bgLight: string;
  descriptionVi: string;
}

export type WordType = 
  | 'noun' 
  | 'verb' 
  | 'adjective' 
  | 'adverb' 
  | 'preposition'
  | 'conjunction'
  | 'phrase' 
  | 'symbol';

export interface KhktSubEntry {
  phraseEn: string;
  tag?: string; // "hh.", "đs.", "gt."...
  meaningVi: string;
}

export interface SubjectSense {
  subjectId?: string; // Tương thích ngược
  subjectNameVi?: string;
  disciplineId?: MathDisciplineId;
  disciplineNameVi?: string;
  meaningVi: string;
  disciplineExplanationVi: string; // Giải thích toán học chuyên sâu
  grades: number[]; // [1..12] hoặc [13] cho bậc đại học
  topic: string; // e.g. "Phép biến đổi tuyến tính", "Phương trình vi phân", "Hình không gian"
  formulaLatex?: string; // Công thức LaTeX chuẩn
  examples: {
    sentenceEn: string;
    sentenceVi: string;
  }[];
}

export interface DictionaryTerm {
  id: string;
  word: string; // Thuật ngữ tiếng Anh
  ipaUk: string; // Phiên âm Oxford UK
  ipaUs: string; // Phiên âm Oxford US
  wordType: WordType;
  primaryMeaningVi: string; // Nghĩa toán học phổ biến nhất
  
  // NGUỒN 1: Từ điển Toán học Anh - Việt (NXB Khoa học và Kỹ thuật 1976)
  khktDefVi?: string; // Nghĩa đối chiếu sách 1976
  khktTags?: string[]; // ["đs.", "gt.", "hh.", "xs.", "tk.", "top.", "log.", "cơ.", "mt."]
  khktSubEntries?: KhktSubEntry[]; // Các thuật ngữ ghép trong từ điển 1976
  khktPage?: number; // Trang trong sách gốc 1976 (PDF từ trang 1 đến 451)

  // NGUỒN 2: Oxford Mathematics Dictionary
  oxfordDefEn?: string; // Định nghĩa học thuật chuẩn Oxford
  oxfordCollocations?: string[]; // Cụm từ toán học học thuật
  etymology?: string; // Nguồn gốc thuật ngữ (Hy Lạp, Latinh, Ả Rập...)
  simpleDefinitionEn?: string; // Tương thích
  
  // Phân loại & Sư phạm
  discipline?: MathDisciplineId;
  primarySubjectId?: string; // Tương thích ('math')
  applicableGrades: number[]; // [1..12], hoặc 13 nếu là Toán đại học
  educationLevel: EducationLevel;
  formulaLatex?: string; // Công thức toán LaTeX
  pedagogyNotesVi?: string; // Lưu ý sư phạm / bẫy bài thi / nhầm lẫn
  usageNotesVi?: string; // Tương thích
  collocations?: string[]; // Tương thích
  
  senses: SubjectSense[];
  synonyms: string[];
  antonyms: string[];
  relatedTerms: string[];
  
  audioUrlUk?: string;
  audioUrlUs?: string;
  isCustom?: boolean;
  createdAt?: string;
  viewCount?: number;
}

export interface SearchFilter {
  query: string;
  disciplineId?: string;
  grade?: number | 'all';
  educationLevel?: EducationLevel | 'all';
  wordType?: WordType | 'all';
  source?: 'all' | 'khkt' | 'oxford';
}

export interface TranslationGlossaryItem {
  termEn: string;
  ipa: string;
  meaningVi: string;
  disciplineExplanation: string;
  discipline: string;
  formulaLatex?: string;
}

export interface TranslationResult {
  translatedText: string;
  sourceText: string;
  sourceLang: 'en' | 'vi';
  targetLang: 'vi' | 'en';
  discipline: string;
  audienceLevel: string;
  glossary: TranslationGlossaryItem[];
  bilingualPairs: {
    sourceSentence: string;
    targetSentence: string;
  }[];
}

export interface UserHistoryItem {
  id: string;
  termId?: string;
  query: string;
  type: 'search' | 'translation' | 'tts';
  timestamp: number;
  details?: string;
}

export interface UserFavoriteItem {
  termId: string;
  addedAt: number;
  notes?: string;
}

export interface FlashcardProgress {
  termId: string;
  box: number; // Leitner box 1-5
  lastReviewed: number;
  nextReviewDate: number;
  timesCorrect: number;
  timesIncorrect: number;
}
