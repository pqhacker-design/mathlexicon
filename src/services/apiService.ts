import { TranslationResult } from '../types/dictionary';

export interface TermExplanationResponse {
  word: string;
  ipaUk: string;
  ipaUs: string;
  wordType: string;
  primaryMeaningVi: string;
  khktDefVi?: string;
  khktTags?: string[];
  oxfordDefEn?: string;
  etymology?: string;
  gradeExplanationVi: string;
  formulaLatex?: string;
  crossDisciplineNotesVi?: string;
  commonMistakesVi?: string;
  collocations: string[];
  practiceExamples: {
    en: string;
    vi: string;
  }[];
}

export interface PronunciationFeedbackResponse {
  score: number;
  rating: string;
  stressCorrect: boolean;
  endingSoundsCorrect: boolean;
  phonemeFeedbackVi: string;
  coachingTipVi: string;
}

export class ApiService {
  static async translateText(params: {
    text: string;
    sourceLang: 'en' | 'vi';
    targetLang: 'vi' | 'en';
    subject?: string;
    discipline?: string;
    grade?: number;
    audienceLevel?: string;
    mode?: string;
  }): Promise<TranslationResult> {
    const res = await fetch('/api/gemini/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Lỗi máy chủ (${res.status})`);
    }

    return await res.json();
  }

  static async explainTerm(params: {
    word: string;
    discipline?: string;
    subject?: string;
    grade?: number;
    contextSentence?: string;
  }): Promise<TermExplanationResponse> {
    const res = await fetch('/api/gemini/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Lỗi giải thích thuật ngữ (${res.status})`);
    }

    return await res.json();
  }

  static async getPronunciationFeedback(params: {
    word: string;
    targetIpa: string;
    transcript: string;
  }): Promise<PronunciationFeedbackResponse> {
    const res = await fetch('/api/gemini/pronunciation-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Lỗi đánh giá phát âm (${res.status})`);
    }

    return await res.json();
  }

  static async generateThcsAssist(params: {
    grade: number;
    chapterTitleEn: string;
    chapterTitleVi: string;
    lessonTitleEn: string;
    lessonTitleVi: string;
    customQuestion?: string;
  }): Promise<ThcsAssistResponse> {
    const res = await fetch('/api/gemini/thcs-assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Lỗi trợ lý giảng dạy THCS (${res.status})`);
    }

    return await res.json();
  }
}

export interface ThcsAssistResponse {
  summaryEn: string;
  summaryVi: string;
  classroomSentences: {
    en: string;
    vi: string;
  }[];
  workedExample: {
    problemEn: string;
    problemVi: string;
    steps: {
      stepEn: string;
      stepVi: string;
    }[];
    answerEn: string;
    answerVi: string;
  };
  teacherTipEn: string;
  teacherTipVi: string;
}
