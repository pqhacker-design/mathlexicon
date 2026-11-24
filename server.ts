import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Extract and validate user-provided Gemini API key from request header.
// The application intentionally does NOT use any server-side app API key.
function extractUserApiKey(req: Request): string | null {
  const raw = req.header('x-gemini-api-key');
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (trimmed.length < 10 || trimmed.length > 256) return null;
  // Printable ASCII only, no whitespace or control characters
  if (!/^[\x21-\x7E]+$/.test(trimmed)) return null;
  return trimmed;
}

function createUserGeminiClient(userApiKey: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: userApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function isAuthOrKeyError(err: any): boolean {
  const status = err?.status ?? err?.statusCode ?? err?.error?.code;
  const msg = String(err?.message || err || '').toLowerCase();
  return (
    status === 401 ||
    status === 403 ||
    msg.includes('api_key_invalid') ||
    msg.includes('api key not valid') ||
    msg.includes('invalid api key') ||
    msg.includes('api key expired') ||
    msg.includes('permission_denied') ||
    msg.includes('unauthenticated')
  );
}

function isQuotaError(err: any): boolean {
  const status = err?.status ?? err?.statusCode ?? err?.error?.code;
  const msg = String(err?.message || err || '').toLowerCase();
  return status === 429 || msg.includes('resource_exhausted') || msg.includes('quota');
}

function sendGeminiError(res: Response, err: any, contextLabel: string) {
  if (isAuthOrKeyError(err)) {
    return res.status(401).json({
      code: 'API_KEY_INVALID',
      error:
        'Gemini API Key không hợp lệ, đã hết hạn hoặc không có quyền truy cập. Vui lòng kiểm tra lại API key cá nhân của bạn.',
    });
  }

  if (isQuotaError(err)) {
    return res.status(429).json({
      code: 'RATE_LIMITED',
      error:
        'API Key cá nhân của bạn đã vượt quá hạn mức (quota) hoặc giới hạn tần suất của Google Gemini. Vui lòng thử lại sau hoặc kiểm tra gói sử dụng trong Google AI Studio.',
    });
  }

  return res.status(502).json({
    code: 'AI_UPSTREAM_ERROR',
    error: `${contextLabel}: Không thể nhận phản hồi từ Gemini AI lúc này. Vui lòng thử lại sau.`,
  });
}

// Resilient Gemini model caller using ONLY the caller's personal API key
async function callGeminiWithFallback(params: {
  userApiKey: string;
  contents: string;
  config?: Record<string, unknown>;
  models?: string[];
  timeoutMs?: number;
}): Promise<{ text: string; model: string }> {
  const ai = createUserGeminiClient(params.userApiKey);
  const modelsToTry = params.models || [
    'gemini-4-hydrogen',
    'gemini-2.5-flash',
    'gemini-3.1-flash-lite',
  ];
  const timeoutMs = params.timeoutMs ?? 20000;

  let lastError: any = null;
  for (const model of modelsToTry) {
    try {
      const responsePromise = ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Model ${model} timed out`)), timeoutMs)
      );

      const response = await Promise.race([responsePromise, timeoutPromise]);
      if (response && response.text) {
        return { text: response.text, model };
      }
    } catch (err: any) {
      lastError = err;
      // Fail fast on invalid key or quota exhaustion rather than retrying other models
      if (isAuthOrKeyError(err) || isQuotaError(err)) {
        throw err;
      }
      console.warn(`[Gemini Fallback] Model ${model} unavailable. Trying next model...`);
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  throw lastError || new Error('Không thể kết nối đến dịch vụ Gemini AI.');
}

function requireUserApiKey(req: Request, res: Response): string | null {
  const key = extractUserApiKey(req);
  if (!key) {
    res.status(401).json({
      code: 'API_KEY_REQUIRED',
      error:
        'Vui lòng nhập Gemini API Key cá nhân trong mục "API Key AI cá nhân" để sử dụng tính năng này.',
    });
    return null;
  }
  return key;
}

// 0. API: Verify User's Personal Gemini API Key
app.post('/api/gemini/verify-key', async (req: Request, res: Response) => {
  const userApiKey = requireUserApiKey(req, res);
  if (!userApiKey) return;

  try {
    const { model } = await callGeminiWithFallback({
      userApiKey,
      contents: 'Reply with OK.',
      timeoutMs: 12000,
    });
    return res.json({ valid: true, model });
  } catch (err: any) {
    return sendGeminiError(res, err, 'Kiểm tra API Key thất bại');
  }
});

// 1. API: Specialized Mathematical Translation (Preserving LaTeX Formulas)
app.post('/api/gemini/translate', async (req: Request, res: Response) => {
  const userApiKey = requireUserApiKey(req, res);
  if (!userApiKey) return;

  try {
    const {
      text,
      sourceLang = 'en',
      targetLang = 'vi',
      discipline = 'algebra',
      audienceLevel = 'high_school',
    } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Nội dung văn bản dịch không được để trống.' });
    }

    const systemInstruction = `
Bạn là chuyên gia ngôn ngữ học toán học và dịch thuật tài liệu Toán học chuyên sâu (Olympic Toán IMO, AP Calculus, SAT Math, luận văn & giáo trình đại học).
Nhiệm vụ: Dịch văn bản Toán học giữa tiếng Anh và tiếng Việt với độ chính xác học thuật cao nhất, đối chiếu song song Từ điển Toán học Anh - Việt (NXB Khoa học và Kỹ thuật 1976) và Oxford Mathematics Dictionary.

QUY TẮC BẮT BUỘC:
1. BẢO TOÀN NGUYÊN VẸN 100%: Mọi công thức toán học định dạng LaTeX ($ ... $ hoặc $$ ... $$), tên biến (x, y, z, f, g), véc-tơ, ma trận, ký hiệu tích phân (\\int), đạo hàm (\\frac{df}{dx}), giới hạn (\\lim), tổng xích-ma (\\sum) và bảng biểu số liệu.
2. Dịch thuật ngữ chính xác theo hệ thống chuẩn của giới Toán học Việt Nam:
   - "derivative" -> "đạo hàm" (gt.)
   - "integral" -> "tích phân / nguyên hàm" (gt.)
   - "limit" -> "giới hạn" (gt.)
   - "continuity" -> "tính liên tục" (gt.)
   - "eigenvalue" -> "giá trị riêng / đặc trưng trị" (đs.)
   - "eigenvector" -> "véc-tơ riêng" (đs.)
   - "determinant" -> "định thức" (đs.)
   - "invertible matrix" -> "ma trận khả nghịch / khả đảo" (đs.)
   - "subgroup" -> "nhóm con" (đs.)
   - "compact set" -> "tập compact" (top.)
   - "conic section" -> "đường conic / tiết diện cônic" (hh.)
   - "hypothesis" -> "giả thiết" (khác với "conclusion" -> "kết luận")
   - "domain" -> "tập xác định", "range/codomain" -> "tập giá trị/tập đích"
3. Tạo bảng chú giải thuật ngữ toán học chuyên ngành (glossary) gồm phiên âm, nghĩa tiếng Việt chuẩn KH&KT, và định nghĩa học thuật Oxford.
4. Tách văn bản thành các cặp câu song ngữ đối chiếu (bilingualPairs).
    `.trim();

    const prompt = `
Dịch văn bản toán học sau từ ${sourceLang === 'en' ? 'tiếng Anh sang tiếng Việt' : 'tiếng Việt sang tiếng Anh'}:
Phân ngành toán học: "${String(discipline).slice(0, 60)}". Trình độ: "${String(audienceLevel).slice(0, 60)}".
---
${text.slice(0, 12000)}
---
Trả về JSON đúng cấu trúc yêu cầu.
    `.trim();

    const { text: responseText } = await callGeminiWithFallback({
      userApiKey,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedText: {
              type: Type.STRING,
              description: 'Văn bản toán học đã dịch hoàn chỉnh, bảo toàn công thức LaTeX',
            },
            bilingualPairs: {
              type: Type.ARRAY,
              description: 'Danh sách các cặp câu song ngữ toán học đối chiếu',
              items: {
                type: Type.OBJECT,
                properties: {
                  sourceSentence: { type: Type.STRING },
                  targetSentence: { type: Type.STRING },
                },
                required: ['sourceSentence', 'targetSentence'],
              },
            },
            glossary: {
              type: Type.ARRAY,
              description: 'Bảng thuật ngữ toán học chuyên sâu xuất hiện trong văn bản',
              items: {
                type: Type.OBJECT,
                properties: {
                  termEn: { type: Type.STRING },
                  ipa: { type: Type.STRING },
                  meaningVi: { type: Type.STRING },
                  disciplineExplanation: { type: Type.STRING },
                  discipline: { type: Type.STRING },
                  formulaLatex: { type: Type.STRING },
                },
                required: ['termEn', 'meaningVi', 'disciplineExplanation', 'discipline'],
              },
            },
          },
          required: ['translatedText', 'bilingualPairs', 'glossary'],
        },
      },
    });

    const parsed = JSON.parse(responseText || '{}');

    return res.json({
      translatedText: parsed.translatedText || '',
      sourceText: text,
      sourceLang,
      targetLang,
      discipline,
      audienceLevel,
      bilingualPairs: parsed.bilingualPairs || [],
      glossary: parsed.glossary || [],
    });
  } catch (error: any) {
    console.error('Translation error');
    return sendGeminiError(res, error, 'Lỗi dịch tài liệu toán học');
  }
});

// 2. API: In-depth Mathematical Term Explanation & Oxford + KH&KT Assistant
app.post('/api/gemini/explain', async (req: Request, res: Response) => {
  const userApiKey = requireUserApiKey(req, res);
  if (!userApiKey) return;

  try {
    const word = req.body?.word || req.body?.term;
    const { discipline = 'algebra', grade = 10, contextSentence } = req.body || {};

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({ error: 'Cần cung cấp thuật ngữ toán học cần tra cứu.' });
    }

    const safeWord = word.trim().slice(0, 200);
    const systemInstruction = `
Bạn là chuyên gia thẩm định Từ điển Toán học Anh - Việt, am tường:
1. Từ điển Toán học Anh - Việt (NXB Khoa học và Kỹ thuật 1976 - do Viện Toán học Việt Nam & Hội Toán học Việt Nam biên soạn: Lê Văn Thiêm, Hoàng Tuỵ, Phan Đức Chính...).
2. Oxford Dictionary of Mathematics & Oxford Academic English.
3. Chương trình giáo dục phổ thông môn Toán và Toán cao cấp đại học.

Nhiệm vụ: Phân tích thuật ngữ toán học tiếng Anh "${safeWord}" một cách toàn diện và học thuật nhất.
Yêu cầu:
- Ký hiệu phân ngành chuẩn xác: đs. (đại số), gt. (giải tích), hh. (hình học), xs. (xác suất), tk. (thống kê), top. (tôpô), log. (toán logic), mt. (máy tính), cơ. (cơ học).
- Nghĩa tiếng Việt chuẩn mực theo từ điển KH&KT 1976.
- Định nghĩa học thuật tiếng Anh chuẩn mực từ Oxford Mathematics.
- Nguồn gốc thuật ngữ (etymology) từ tiếng Hy Lạp, Latinh, hoặc Ả Rập.
- Công thức toán học định dạng LaTeX ($...$).
- Lưu ý sư phạm & các bẫy đề thi, ngộ nhận khái niệm của học sinh/sinh viên.
- Cụm từ chuyên ngành đi kèm (collocations/sub-entries).
    `.trim();

    const prompt = `
Phân tích thuật ngữ toán học: "${safeWord}"
Chuyên ngành: "${String(discipline).slice(0, 80)}"
Trình độ: Lớp ${Number(grade) || 10}
${contextSentence ? `Ngữ cảnh trong bài toán: "${String(contextSentence).slice(0, 500)}"` : ''}
    `.trim();

    const { text: responseText } = await callGeminiWithFallback({
      userApiKey,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            ipaUk: { type: Type.STRING },
            ipaUs: { type: Type.STRING },
            wordType: { type: Type.STRING },
            primaryMeaningVi: { type: Type.STRING },
            khktDefVi: {
              type: Type.STRING,
              description: 'Nghĩa thuật ngữ đối chiếu Từ điển Toán học NXB KH&KT 1976',
            },
            khktTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Các ký hiệu ngành: đs., gt., hh., xs., tk., top., log., mt., cơ.',
            },
            oxfordDefEn: {
              type: Type.STRING,
              description: 'Định nghĩa học thuật tiếng Anh chuẩn Oxford Mathematics Dictionary',
            },
            etymology: {
              type: Type.STRING,
              description: 'Nguồn gốc ngôn ngữ của thuật ngữ (Latinh, Hy Lạp, Ả Rập...)',
            },
            gradeExplanationVi: {
              type: Type.STRING,
              description: 'Giải thích toán học sư phạm chi tiết, sáng sủa và chuẩn mực',
            },
            formulaLatex: {
              type: Type.STRING,
              description: 'Công thức toán học định dạng LaTeX ($...$)',
            },
            commonMistakesVi: {
              type: Type.STRING,
              description: 'Lưu ý bẫy đề thi và lỗi ngộ nhận khái niệm toán học thường gặp',
            },
            collocations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Các cụm từ ghép toán học học thuật phổ biến',
            },
            practiceExamples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  vi: { type: Type.STRING },
                },
                required: ['en', 'vi'],
              },
            },
          },
          required: [
            'word',
            'ipaUk',
            'ipaUs',
            'primaryMeaningVi',
            'khktDefVi',
            'oxfordDefEn',
            'gradeExplanationVi',
            'collocations',
            'practiceExamples',
          ],
        },
      },
    });

    const parsed = JSON.parse(responseText || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Explanation error');
    return sendGeminiError(res, error, 'Lỗi khi phân tích thuật ngữ toán học');
  }
});

// 3. API: Text-To-Speech (Uses ONLY user-provided key if supplied; falls back to browser WebSpeech otherwise)
app.post('/api/gemini/tts', async (req: Request, res: Response) => {
  try {
    const {
      text,
      accent = 'en-US',
      voiceName = 'Kore',
      speed = 1.0,
    } = req.body || {};

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Nội dung đọc không được để trống.' });
    }

    const cleanText = text.slice(0, 1500).trim();
    const userApiKey = extractUserApiKey(req);

    if (userApiKey) {
      let gcpVoiceName: string;
      if (accent === 'en-GB') {
        gcpVoiceName = ['Fenrir', 'Charon'].includes(voiceName) ? 'en-GB-Neural2-B' : 'en-GB-Neural2-A';
      } else {
        gcpVoiceName = ['Puck', 'Fenrir', 'Charon'].includes(voiceName) ? 'en-US-Neural2-D' : 'en-US-Neural2-F';
      }

      try {
        const ttsResponse = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': userApiKey,
          },
          body: JSON.stringify({
            input: { text: cleanText },
            voice: {
              languageCode: accent === 'en-GB' ? 'en-GB' : 'en-US',
              name: gcpVoiceName,
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: Math.max(0.25, Math.min(2.0, Number(speed) || 1.0)),
              pitch: 0.0,
            },
          }),
        });

        if (ttsResponse.ok) {
          const ttsData = await ttsResponse.json();
          if (ttsData.audioContent) {
            return res.json({
              audioBase64: ttsData.audioContent,
              mimeType: 'audio/mp3',
              accent,
              voiceName,
              speed,
            });
          }
        }
      } catch {
        // Fall back smoothly to browser WebSpeech
      }
    }

    return res.json({
      fallbackToWebSpeech: true,
      accent,
      voiceName,
      speed,
    });
  } catch {
    return res.json({
      fallbackToWebSpeech: true,
      accent: req.body?.accent || 'en-US',
      voiceName: req.body?.voiceName || 'Puck',
      speed: req.body?.speed || 1.0,
    });
  }
});

// 4. API: AI Pronunciation Coach & Phoneme Feedback
app.post('/api/gemini/pronunciation-feedback', async (req: Request, res: Response) => {
  const userApiKey = requireUserApiKey(req, res);
  if (!userApiKey) return;

  const { word = '', targetIpa = '', transcript = '' } = req.body || {};

  if (!word || !transcript || typeof word !== 'string' || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'Thiếu từ cần luyện đọc hoặc nội dung giọng đọc.' });
  }

  try {
    const safeWord = word.trim().slice(0, 200);
    const safeIpa = String(targetIpa || '').slice(0, 100);
    const safeTranscript = transcript.trim().slice(0, 400);

    const systemInstruction = `
Bạn là chuyên gia ngữ âm tiếng Anh (Phonetics Coach) dành riêng cho giáo viên và học sinh Việt Nam môn Toán.
Nhiệm vụ: Phân tích phát âm đối với thuật ngữ "${safeWord}" (Phiên âm chuẩn: ${safeIpa}).
Văn bản nhận diện từ giọng đọc: "${safeTranscript}".
Hãy đánh giá:
1. Độ chính xác tương đối (Thang điểm 1-100).
2. Lỗi ngữ âm phổ biến của người Việt (âm đuôi /s/, /t/, /d/, /z/, âm /θ/, /ð/, trọng âm từ).
3. Lời khuyên cụ thể để sửa khẩu hình và bật hơi khi giảng dạy trên lớp.
    `.trim();

    const prompt = `Đánh giá phát âm thuật ngữ "${safeWord}" khi nhận diện giọng đọc ra: "${safeTranscript}".`;

    const { text: responseText } = await callGeminiWithFallback({
      userApiKey,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: 'Điểm số từ 1 đến 100' },
            rating: { type: Type.STRING, description: 'Xuất sắc / Tốt / Cần cố gắng' },
            stressCorrect: { type: Type.BOOLEAN, description: 'Đúng trọng âm hay không' },
            endingSoundsCorrect: { type: Type.BOOLEAN, description: 'Đúng âm cuối hay không' },
            phonemeFeedbackVi: { type: Type.STRING, description: 'Nhận xét cụ thể về từng âm vị' },
            coachingTipVi: { type: Type.STRING, description: 'Mẹo sửa khẩu hình lưỡi, môi, bật hơi' },
          },
          required: [
            'score',
            'rating',
            'stressCorrect',
            'endingSoundsCorrect',
            'phonemeFeedbackVi',
            'coachingTipVi',
          ],
        },
      },
    });

    const parsed = JSON.parse(responseText || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Pronunciation feedback error');
    return sendGeminiError(res, error, 'Lỗi đánh giá phát âm AI');
  }
});

// 5. API: THCS Bilingual Math Teaching Assistant (MOET Grade 6-9 Curriculum)
app.post('/api/gemini/thcs-assist', async (req: Request, res: Response) => {
  const userApiKey = requireUserApiKey(req, res);
  if (!userApiKey) return;

  try {
    const {
      grade = 6,
      chapterTitleEn = '',
      chapterTitleVi = '',
      lessonTitleEn = '',
      lessonTitleVi = '',
      customQuestion = '',
    } = req.body || {};

    if (!lessonTitleEn && !customQuestion) {
      return res.status(400).json({ error: 'Cần cung cấp tên bài học hoặc câu hỏi toán THCS.' });
    }

    const systemInstruction = `
Bạn là chuyên gia sư phạm Toán THCS song ngữ Anh - Việt (am hiểu bộ "Tài liệu hướng dẫn triển khai dạy học cấp THCS bằng tiếng Anh – Môn Toán Lớp 6, 7, 8, 9" của Bộ GD&ĐT).
Nhiệm vụ: Hỗ trợ giáo viên Toán THCS soạn nhanh câu giảng dạy trên lớp, cách đọc ký hiệu bằng tiếng Anh, và ví dụ minh họa từng bước có giải thích song ngữ Anh - Việt.
Yêu cầu:
- Công thức Toán viết bằng LaTeX trong cặp dấu $...$.
- Mọi câu giảng, ví dụ, lời giải đều có song song tiếng Anh học thuật chuẩn xác và giải thích tiếng Việt rõ ràng, dễ hiểu.
- Ghi rõ cách đọc bằng chữ tiếng Anh (spoken script) nếu có ký hiệu/công thức.
    `.trim();

    const prompt = `
Khối lớp: Toán Lớp ${Number(grade) || 6} (THCS Việt Nam).
Chương: ${String(chapterTitleEn).slice(0, 200)} (${String(chapterTitleVi).slice(0, 200)}).
Bài học: ${String(lessonTitleEn).slice(0, 200)} (${String(lessonTitleVi).slice(0, 200)}).
${customQuestion ? `Yêu cầu cụ thể của giáo viên: "${String(customQuestion).slice(0, 1000)}"` : 'Hãy tạo thêm: (1) 3 mẫu câu giảng dạy hữu ích trên lớp (Useful Classroom Expressions), (2) 1 ví dụ minh họa mới kèm lời giải từng bước song ngữ Anh - Việt, và (3) 1 lưu ý về sự khác biệt ký hiệu/thuật ngữ Anh - Việt.'}
    `.trim();

    const { text: responseText } = await callGeminiWithFallback({
      userApiKey,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryEn: { type: Type.STRING },
            summaryVi: { type: Type.STRING },
            classroomSentences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  vi: { type: Type.STRING },
                },
                required: ['en', 'vi'],
              },
            },
            workedExample: {
              type: Type.OBJECT,
              properties: {
                problemEn: { type: Type.STRING },
                problemVi: { type: Type.STRING },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      stepEn: { type: Type.STRING },
                      stepVi: { type: Type.STRING },
                    },
                    required: ['stepEn', 'stepVi'],
                  },
                },
                answerEn: { type: Type.STRING },
                answerVi: { type: Type.STRING },
              },
              required: ['problemEn', 'problemVi', 'steps', 'answerEn', 'answerVi'],
            },
            teacherTipEn: { type: Type.STRING },
            teacherTipVi: { type: Type.STRING },
          },
          required: ['summaryEn', 'summaryVi', 'classroomSentences', 'workedExample', 'teacherTipEn', 'teacherTipVi'],
        },
      },
    });

    const parsed = JSON.parse(responseText || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('THCS assist error');
    return sendGeminiError(res, error, 'Lỗi trợ lý giảng dạy THCS');
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MATH LEXICON AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
