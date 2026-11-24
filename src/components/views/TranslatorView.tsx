import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRightLeft,
  Copy,
  Check,
  Trash2,
  Download,
  Table,
  BookOpen,
  SplitSquareVertical,
  Loader2,
  AlertCircle,
  Code,
  KeyRound
} from 'lucide-react';
import { ApiService, isApiKeyError } from '../../services/apiService';
import { requestOpenApiKeyModal } from '../../services/userApiKeyStorage';
import { TranslationResult, TranslationGlossaryItem } from '../../types/dictionary';
import { MATH_DISCIPLINES, getDisciplineById } from '../../data/mathDisciplines';
import { PronounceButton } from '../common/PronounceButton';
import { DictionaryStorage } from '../../services/dictionaryStorage';

const MATH_TEMPLATES = [
  {
    label: 'Giải tích & Tích phân',
    text: 'Let $f(x) = x^3 - 3x + 2$. Determine the critical points where the derivative $f\'(x) = 0$, and evaluate the definite integral $\\int_{0}^{2} f(x)dx$.',
    discipline: 'calculus_analysis',
  },
  {
    label: 'Đại số tuyến tính & Ma trận',
    text: 'Given a square matrix $A \\in \\mathbb{R}^{3 \\times 3}$, find its eigenvalues and eigenvectors satisfying $A\\vec{v} = \\lambda\\vec{v}$. If $\\det(A) \\neq 0$, compute the inverse matrix $A^{-1}$.',
    discipline: 'algebra',
  },
  {
    label: 'Hình học & Conic',
    text: 'In the Euclidean plane, an ellipse has the standard equation $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$. Find the coordinates of the foci and the eccentricity $e = \\frac{c}{a}$.',
    discipline: 'geometry_trig',
  },
  {
    label: 'Xác suất & Biến ngẫu nhiên',
    text: 'Let $X$ be a continuous random variable with probability density function $f(x)$. Compute the expected value $E[X] = \\int_{-\\infty}^{\\infty} x f(x) dx$ and the variance $\\sigma^2$.',
    discipline: 'probability_statistics',
  },
];

export const TranslatorView: React.FC = () => {
  const [sourceText, setSourceText] = useState(MATH_TEMPLATES[0].text);
  const [sourceLang, setSourceLang] = useState<'en' | 'vi'>('en');
  const [targetLang, setTargetLang] = useState<'vi' | 'en'>('vi');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('calculus_analysis');
  const [audienceLevel, setAudienceLevel] = useState<string>('high_school');
  const [grade, setGrade] = useState<number>(12);
  const [displayMode, setDisplayMode] = useState<'full' | 'bilingual' | 'glossary'>('full');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyError, setIsKeyError] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSwap = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    if (result?.translatedText) {
      setSourceText(result.translatedText);
      setResult(null);
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    setError(null);
    setIsKeyError(false);

    try {
      const res = await ApiService.translateText({
        text: sourceText,
        sourceLang,
        targetLang,
        discipline: selectedDiscipline,
        grade,
        audienceLevel,
      });
      setResult(res);

      // Record in history
      DictionaryStorage.addHistory({
        query: sourceText.slice(0, 50) + (sourceText.length > 50 ? '...' : ''),
        type: 'translation',
        details: `${sourceLang.toUpperCase()} → ${targetLang.toUpperCase()} (${selectedDiscipline})`,
      });
    } catch (e: any) {
      setIsKeyError(isApiKeyError(e));
      setError(e?.message || 'Có lỗi xảy ra khi dịch thuật AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const content = `MATH LEXICON AI - BẢN DỊCH TÀI LIỆU TOÁN HỌC CHUYÊN SÂU
Ngành: ${selectedDiscipline} | Cấp học: ${audienceLevel} (Lớp ${grade})
Ngày: ${new Date().toLocaleString('vi-VN')}
--------------------------------------------------
[VĂN BẢN GỐC (${sourceLang.toUpperCase()})]:
${sourceText}

[BẢN DỊCH BẢO TOÀN LATEX (${targetLang.toUpperCase()})]:
${result.translatedText}

${
  result.glossary.length > 0
    ? `--------------------------------------------------
BẢNG CHÚ GIẢI THUẬT NGỮ TOÁN HỌC (OXFORD & KH&KT 1976):
${result.glossary
  .map(
    (g) =>
      `• ${g.termEn} (${g.ipa || ''}) -> ${g.meaningVi} [${g.discipline}] : ${g.disciplineExplanation}`
  )
  .join('\n')}`
    : ''
}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `math_translation_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white rounded-2xl p-6 shadow-lg space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/20 backdrop-blur-xs text-white">
            Bảo toàn công thức LaTeX ($ ... $)
          </span>
          <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-purple-500/40 text-purple-100">
            Học thuật Toán học & Đề thi Quốc tế
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Dịch Đề Bài & Tài liệu Toán học Chuyên sâu
        </h1>
        <p className="text-purple-100 text-sm max-w-2xl">
          Công cụ dịch thông minh thiết kế riêng cho tài liệu toán, đề thi IMO, SAT Math, AP Calculus. Tự động bảo toàn toàn bộ công thức LaTeX, ký hiệu tích phân, ma trận và tạo bảng chú giải đối chiếu Oxford & KH&KT 1976.
        </p>
      </div>

      {/* Preset Math Templates Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Chọn đề bài toán học mẫu thử nghiệm:
        </span>
        <div className="flex flex-wrap gap-2">
          {MATH_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSourceText(tmpl.text);
                setSelectedDiscipline(tmpl.discipline);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-950/40 dark:hover:text-purple-300 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {tmpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Language Direction */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {sourceLang === 'en' ? 'Tiếng Anh (EN)' : 'Tiếng Việt (VI)'}
          </span>
          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Đổi chiều dịch"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            {targetLang === 'vi' ? 'Tiếng Việt (VI)' : 'Tiếng Anh (EN)'}
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Discipline */}
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
          >
            {MATH_DISCIPLINES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nameVi} ({d.abbrevVi})
              </option>
            ))}
          </select>

          {/* Level */}
          <select
            value={audienceLevel}
            onChange={(e) => setAudienceLevel(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
          >
            <option value="primary">Tiểu học (Lớp 1-5)</option>
            <option value="secondary">THCS (Lớp 6-9)</option>
            <option value="high_school">THPT (Lớp 10-12)</option>
            <option value="university">Đại học / Nghiên cứu</option>
          </select>
        </div>
      </div>

      {/* Main Dual Box Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Source Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs space-y-3 min-h-[300px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Văn bản gốc ({sourceLang.toUpperCase()}):
            </span>
            <div className="flex items-center gap-1">
              <PronounceButton text={sourceText} accent="en-US" size="sm" />
              <button
                onClick={() => setSourceText('')}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                title="Xóa nội dung"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Nhập đề bài, định lý hoặc đoạn văn toán học có công thức $ ... $..."
            className="w-full flex-1 p-2 text-sm text-slate-800 dark:text-slate-100 bg-transparent focus:outline-hidden resize-none font-mono leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400">
              {sourceText.length} ký tự
            </span>
            <button
              onClick={handleTranslate}
              disabled={isLoading || !sourceText.trim()}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang dịch chuyên ngành...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Dịch tài liệu Toán
                </>
              )}
            </button>
          </div>
        </div>

        {/* Translation Result Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs space-y-3 min-h-[300px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Bản dịch chuyên môn ({targetLang.toUpperCase()}):
            </span>
            {result?.translatedText && (
              <div className="flex items-center gap-1">
                <PronounceButton text={result.translatedText} accent="en-US" size="sm" />
                <button
                  onClick={() => handleCopy(result.translatedText)}
                  className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg transition-colors cursor-pointer"
                  title="Sao chép bản dịch"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg transition-colors cursor-pointer"
                  title="Tải tệp văn bản"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-2 text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-sans overflow-y-auto whitespace-pre-line">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-400 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <p className="text-xs">AI đang bảo toàn công thức LaTeX và đối chiếu từ điển KH&KT 1976...</p>
              </div>
            ) : result ? (
              <div className="space-y-3">
                <p className="font-medium text-slate-900 dark:text-white">
                  {result.translatedText}
                </p>
              </div>
            ) : error ? (
              <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs space-y-2.5 border border-rose-200 dark:border-rose-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
                {isKeyError && (
                  <button
                    type="button"
                    onClick={() => requestOpenApiKeyModal()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    Nhập Gemini API Key cá nhân
                  </button>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs italic py-12">
                Kết quả dịch thuật bảo toàn LaTeX và bảng đối chiếu thuật ngữ sẽ hiển thị ở đây.
              </div>
            )}
          </div>

          {result && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              <span>Bảo toàn công thức LaTeX thành công</span>
              <span>{result.glossary.length} thuật ngữ toán học</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Bilingual Sentence Pairs & Math Glossary */}
      {result && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <button
              onClick={() => setDisplayMode('full')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                displayMode === 'full'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Xem toàn bộ (Bilingual & Glossary)
            </button>
            <button
              onClick={() => setDisplayMode('bilingual')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                displayMode === 'bilingual'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Đối chiếu từng câu song ngữ
            </button>
            <button
              onClick={() => setDisplayMode('glossary')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                displayMode === 'glossary'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Bảng thuật ngữ Toán ({result.glossary.length})
            </button>
          </div>

          {/* Bilingual Pairs */}
          {(displayMode === 'full' || displayMode === 'bilingual') && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Đối chiếu câu song ngữ:
              </h3>
              <div className="space-y-2">
                {result.bilingualPairs.map((pair, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <div className="text-xs font-mono text-slate-800 dark:text-slate-200">
                      {pair.sourceSentence}
                    </div>
                    <div className="text-xs font-sans text-purple-700 dark:text-purple-300 font-medium">
                      {pair.targetSentence}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Math Glossary */}
          {(displayMode === 'full' || displayMode === 'glossary') && result.glossary.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Table className="w-4 h-4 text-purple-600" />
                Bảng chú giải thuật ngữ toán học đối chiếu:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.glossary.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-purple-600 dark:text-purple-400">
                        {g.termEn}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {g.ipa}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Nghĩa chuẩn: {g.meaningVi}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {g.disciplineExplanation}
                    </p>

                    {g.formulaLatex && (
                      <div className="p-1 rounded-sm bg-slate-900 text-yellow-300 font-mono text-[11px]">
                        <code>{g.formulaLatex}</code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
