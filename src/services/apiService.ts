import { TranslationResult } from '../types/dictionary';
import { getUserApiKey, USER_API_KEY_HEADER } from './userApiKeyStorage';

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

export type ApiKeyErrorCode = 'API_KEY_REQUIRED' | 'API_KEY_INVALID';

export class ApiKeyError extends Error {
  code: ApiKeyErrorCode;

  constructor(message: string, code: ApiKeyErrorCode) {
    super(message);
    this.name = 'ApiKeyError';
    this.code = code;
  }
}

export function isApiKeyError(err: unknown): err is ApiKeyError {
  return err instanceof ApiKeyError;
}

async function postGeminiJson<T>(
  endpoint: string,
  payload: Record<string, unknown>,
  explicitApiKey?: string
): Promise<T> {
  const apiKey = (explicitApiKey ?? getUserApiKey()).trim();
  if (!apiKey) {
    throw new ApiKeyError(
      'Chưa có Gemini API Key cá nhân. Vui lòng nhập API key của bạn để sử dụng tính năng AI.',
      'API_KEY_REQUIRED'
    );
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [USER_API_KEY_HEADER]: apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    if (errData?.code === 'API_KEY_REQUIRED' || errData?.code === 'API_KEY_INVALID') {
      throw new ApiKeyError(
        errData.error || 'Gemini API Key không hợp lệ hoặc bị thiếu.',
        errData.code
      );
    }
    throw new Error(errData.error || `Lỗi máy chủ (${res.status})`);
  }

  return (await res.json()) as T;
}

export class ApiService {
  static async verifyApiKey(candidateKey: string): Promise<{ valid: boolean; model?: string }> {
    return postGeminiJson<{ valid: boolean; model?: string }>(
      '/api/gemini/verify-key',
      {},
      candidateKey
    );
  }

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
    return postGeminiJson<TranslationResult>('/api/gemini/translate', params);
  }

  static async explainTerm(params: {
    word: string;
    discipline?: string;
    subject?: string;
    grade?: number;
    contextSentence?: string;
  }): Promise<TermExplanationResponse> {
    return postGeminiJson<TermExplanationResponse>('/api/gemini/explain', params);
  }

  static async getPronunciationFeedback(params: {
    word: string;
    targetIpa: string;
    transcript: string;
  }): Promise<PronunciationFeedbackResponse> {
    return postGeminiJson<PronunciationFeedbackResponse>(
      '/api/gemini/pronunciation-feedback',
      params
    );
  }

  static async generateThcsAssist(params: {
    grade: number;
    chapterTitleEn: string;
    chapterTitleVi: string;
    lessonTitleEn: string;
    lessonTitleVi: string;
    customQuestion?: string;
  }): Promise<ThcsAssistResponse> {
    return postGeminiJson<ThcsAssistResponse>('/api/gemini/thcs-assist', params);
  }
}
