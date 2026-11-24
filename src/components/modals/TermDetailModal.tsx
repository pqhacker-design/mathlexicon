import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  GraduationCap,
  FileText,
  Compass,
  Code,
  KeyRound
} from 'lucide-react';
import { DictionaryTerm } from '../../types/dictionary';
import { PronounceButton } from '../common/PronounceButton';
import { ClickableText } from '../common/ClickableText';
import { MathText } from '../common/MathText';
import { DictionaryStorage } from '../../services/dictionaryStorage';
import { ApiService, TermExplanationResponse, isApiKeyError } from '../../services/apiService';
import { requestOpenApiKeyModal } from '../../services/userApiKeyStorage';
import { getDisciplineById, getGradeLabel } from '../../data/mathDisciplines';
import { findThcsReferencesForWord } from '../../data/thcsCurriculum';
import { ThcsGradeNumber } from '../../types/thcsCurriculum';

interface TermDetailModalProps {
  term: DictionaryTerm | null;
  onClose: () => void;
  onSelectWord?: (word: string) => void;
  onOpenPdfPage?: (page: number) => void;
  onOpenThcsLesson?: (grade: ThcsGradeNumber, lessonId: string) => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  term,
  onClose,
  onSelectWord,
  onOpenPdfPage,
  onOpenThcsLesson,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'ai_assistant'>('details');
  const [isFav, setIsFav] = useState(false);
  const [copied, setCopied] = useState(false);

  // AI Assistant Explanation State
  const [aiData, setAiData] = useState<TermExplanationResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isKeyMissingError, setIsKeyMissingError] = useState(false);

  useEffect(() => {
    if (term) {
      setIsFav(DictionaryStorage.isFavorite(term.id));
      setActiveTab('details');
      setAiData(null);
      setAiError(null);

      // Record in search history
      DictionaryStorage.addHistory({
        query: term.word,
        type: 'search',
        termId: term.id,
        details: term.primaryMeaningVi,
      });
    }
  }, [term]);

  if (!term) return null;

  const disciplineInfo = getDisciplineById(term.discipline || 'algebra');
  const primarySense = term.senses?.[0];
  const thcsMatches = findThcsReferencesForWord(term.word).slice(0, 4);

  const handleToggleFav = () => {
    const updated = DictionaryStorage.toggleFavorite(term.id);
    setIsFav(updated);
  };

  const handleCopy = () => {
    const textToCopy = `${term.word} ${term.ipaUk} - ${term.primaryMeaningVi}\nKH&KT 1976: ${term.khktDefVi || term.primaryMeaningVi}\nOxford: ${term.oxfordDefEn || term.simpleDefinitionEn}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchAiExplanation = async () => {
    setIsLoadingAi(true);
    setAiError(null);
    setIsKeyMissingError(false);
    try {
      const data = await ApiService.explainTerm({
        word: term.word,
        discipline: disciplineInfo?.nameVi || 'Đại số & Giải tích',
        grade: term.applicableGrades[0] || 10,
        contextSentence: primarySense?.examples?.[0]?.sentenceEn,
      });
      setAiData(data);
    } catch (e: any) {
      setIsKeyMissingError(isApiKeyError(e));
      setAiError(
        e?.message || 'Không thể kết nối Gemini AI. Vui lòng kiểm tra lại API Key cá nhân của bạn.'
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {term.wordType}
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {getGradeLabel(term.applicableGrades[0])}
            </span>
            {disciplineInfo && (
              <span
                className="px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1"
                style={{
                  backgroundColor: disciplineInfo.bgLight,
                  color: disciplineInfo.color,
                }}
              >
                <span>{disciplineInfo.abbrevVi}</span>
                <span>{disciplineInfo.nameVi.split('(')[0].trim()}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleFav}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isFav
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isFav ? 'Bỏ lưu yêu thích' : 'Lưu vào từ vựng yêu thích'}
            >
              <Star className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sao chép thông tin thuật ngữ"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer ml-1"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 font-semibold text-sm border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'details'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Tra cứu Song song: KH&KT (1976) & Oxford
          </button>

          <button
            onClick={() => {
              setActiveTab('ai_assistant');
              fetchAiExplanation();
            }}
            className={`py-3 px-4 font-semibold text-sm border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'ai_assistant'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            AI Phân tích Toán học (Gemini)
          </button>
        </div>

        {/* Main Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {activeTab === 'details' ? (
            <>
              {/* Word Title & Pronunciation Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {term.word}
                  </h1>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                    {term.primaryMeaningVi}
                  </p>
                </div>

                {/* Pronunciation Badges: UK & US */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <PronounceButton text={term.word} accent="en-GB" showDownload size="md" />
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-300 pr-2">
                      {term.ipaUk}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <PronounceButton text={term.word} accent="en-US" showDownload size="md" />
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-300 pr-2">
                      {term.ipaUs}
                    </span>
                  </div>
                </div>
              </div>

              {/* DUAL SOURCE SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SOURCE 1: TỪ ĐIỂN TOÁN HỌC ANH - VIỆT (NXB KH&KT 1976) */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/70 to-sky-50/40 dark:from-slate-800/90 dark:to-slate-800/50 border border-blue-200/80 dark:border-blue-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      NXB KH&KT (1976)
                    </span>
                    {term.khktTags && term.khktTags.length > 0 && (
                      <div className="flex gap-1">
                        {term.khktTags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-200/70 dark:bg-blue-950 text-blue-800 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {term.khktDefVi || term.primaryMeaningVi}
                  </div>

                  {/* Sub-entries in 1976 book */}
                  {term.khktSubEntries && term.khktSubEntries.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-blue-200/60 dark:border-slate-700">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Thuật ngữ ghép trong từ điển 1976:
                      </span>
                      <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                        {term.khktSubEntries.map((se, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-1.5 rounded-md bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800"
                          >
                            <span className="font-semibold text-blue-900 dark:text-blue-300">
                              {se.phraseEn}
                            </span>
                            {se.tag && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold ml-1">
                                ({se.tag})
                              </span>
                            )}
                            <span className="text-slate-600 dark:text-slate-300 ml-1.5">
                              : {se.meaningVi}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PDF Jump Button */}
                  {term.khktPage && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenPdfPage?.(term.khktPage!);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Xem trang scan gốc {term.khktPage} trong sách PDF
                      </button>
                    </div>
                  )}
                </div>

                {/* SOURCE 2: OXFORD MATHEMATICS DICTIONARY */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 to-purple-50/40 dark:from-slate-800/90 dark:to-slate-800/50 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-indigo-600" />
                      Oxford Mathematics
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Academic English
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    <ClickableText
                      text={term.oxfordDefEn || term.simpleDefinitionEn || ''}
                      onWordClick={onSelectWord}
                    />
                  </p>

                  {/* Etymology */}
                  {term.etymology && (
                    <div className="pt-2 border-t border-indigo-200/60 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-indigo-900 dark:text-indigo-300 block mb-0.5">
                        Nguồn gốc từ ngữ (Etymology):
                      </span>
                      {term.etymology}
                    </div>
                  )}

                  {/* Oxford Academic Collocations */}
                  {(term.oxfordCollocations?.length || term.collocations?.length) ? (
                    <div className="pt-2 border-t border-indigo-200/60 dark:border-slate-700">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Oxford Collocations (Cụm thuật ngữ toán):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(term.oxfordCollocations || term.collocations || []).map((col, idx) => (
                          <span
                            key={idx}
                            onClick={() => onSelectWord?.(col)}
                            className="px-2 py-0.5 text-xs rounded-md bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 hover:border-indigo-400 cursor-pointer transition-colors"
                          >
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* LaTeX Formula Display */}
              {term.formulaLatex && (
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      Công thức Toán học chuẩn LaTeX:
                    </span>
                    <div className="font-mono text-sm sm:text-base text-yellow-300 overflow-x-auto py-1">
                      {term.formulaLatex}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(term.formulaLatex!);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors shrink-0 cursor-pointer"
                  >
                    Copy mã LaTeX
                  </button>
                </div>
              )}

              {/* Pedagogy Notes & Examination Warnings */}
              {(term.pedagogyNotesVi || term.usageNotesVi) && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <span className="font-bold block mb-0.5">Lưu ý sư phạm & Bẫy kiểm tra toán học:</span>
                    {term.pedagogyNotesVi || term.usageNotesVi}
                  </div>
                </div>
              )}

              {/* Mathematical Sense Details & Context Examples */}
              {primarySense && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      Ý nghĩa & Ví dụ trong đề bài toán ({primarySense.topic})
                    </h3>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {primarySense.disciplineExplanationVi}
                  </p>

                  {primarySense.examples && primarySense.examples.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {primarySense.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              <MathText text={ex.sentenceEn} onWordClick={onSelectWord} />
                            </p>
                            <PronounceButton text={ex.sentenceEn.replace(/\$/g, '')} accent="en-US" size="sm" />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                            → <MathText text={ex.sentenceVi} />
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* THCS Curriculum Cross-References */}
              {thcsMatches.length > 0 && onOpenThcsLesson && (
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    Xuất hiện trong Chương trình Toán THCS Song ngữ (MOET 2026)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {thcsMatches.map((loc) => (
                      <button
                        key={loc.lesson.id}
                        type="button"
                        onClick={() => onOpenThcsLesson(loc.grade, loc.lesson.id)}
                        className="text-left p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
                      >
                        <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                          Toán {loc.grade} • Chương {loc.chapter.chapterNumber} • Bài {loc.lesson.lessonNumber}
                        </div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {loc.lesson.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {loc.lesson.titleVi}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Terms */}
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Thuật ngữ toán học liên quan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {term.relatedTerms.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectWord?.(r)}
                        className="px-2.5 py-1 text-xs rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* AI Assistant Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-linear-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-200 dark:border-indigo-900 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    AI Thẩm định Toán học: Oxford & KH&KT (1976)
                  </h3>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">
                    Phân tích học thuật sâu, đối chiếu chuẩn thuật ngữ và công thức LaTeX
                  </p>
                </div>
                <button
                  onClick={fetchAiExplanation}
                  disabled={isLoadingAi}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  {isLoadingAi ? 'Đang phân tích...' : 'Làm mới phân tích'}
                </button>
              </div>

              {isLoadingAi && (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
                  <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm">Gemini AI đang phân tích thuật ngữ toán học chuyên sâu...</p>
                </div>
              )}

              {aiError && (
                <div className="p-4 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-sm border border-rose-200 dark:border-rose-900 space-y-3">
                  <p>{aiError}</p>
                  {isKeyMissingError && (
                    <button
                      type="button"
                      onClick={() => requestOpenApiKeyModal()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      Nhập Gemini API Key cá nhân
                    </button>
                  )}
                </div>
              )}

              {aiData && !isLoadingAi && (
                <div className="space-y-4">
                  {/* Grade-tailored explanation */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                      Giải thích toán học sư phạm
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                      {aiData.gradeExplanationVi}
                    </p>
                  </div>

                  {/* LaTeX if generated */}
                  {aiData.formulaLatex && (
                    <div className="p-3 bg-slate-900 text-yellow-300 font-mono text-sm rounded-xl border border-slate-700">
                      <span className="text-xs font-sans text-slate-400 block mb-1">Công thức LaTeX:</span>
                      <code>{aiData.formulaLatex}</code>
                    </div>
                  )}

                  {/* Common exam mistakes */}
                  {aiData.commonMistakesVi && (
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Lỗi sai & Bẫy ngộ nhận trong bài thi toán
                      </span>
                      <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                        {aiData.commonMistakesVi}
                      </p>
                    </div>
                  )}

                  {/* AI Generated Practice Sentences */}
                  {aiData.practiceExamples && aiData.practiceExamples.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Câu đề bài / Định lý ứng dụng mẫu:
                      </span>
                      {aiData.practiceExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {ex.en}
                            </p>
                            <PronounceButton text={ex.en} accent="en-US" size="sm" />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">
                            → {ex.vi}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>MATH LEXICON AI • Từ điển Toán học Anh - Việt (KH&KT 1976 & Oxford)</span>
          <span>Bấm vào từ tiếng Anh bất kỳ để tra cứu tiếp</span>
        </div>
      </div>
    </div>
  );
};
