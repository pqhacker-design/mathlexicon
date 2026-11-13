import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Search,
  Volume2,
  Sparkles,
  FileText,
  GraduationCap,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  HelpCircle,
  MessageSquare,
  Sigma,
  ListChecks,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  ThcsChapter,
  ThcsGradeNumber,
  ThcsLesson,
  ExpressionCategory,
} from '../../types/thcsCurriculum';
import {
  THCS_CURRICULUM_BOOKS,
  getGradeBook,
  searchThcsCurriculum,
  ThcsSearchHit,
} from '../../data/thcsCurriculum';
import { MathText } from '../common/MathText';
import { PronounceButton } from '../common/PronounceButton';
import { ApiService, ThcsAssistResponse } from '../../services/apiService';

interface ThcsCurriculumViewProps {
  initialGrade?: ThcsGradeNumber;
  initialLessonId?: string;
  onSelectWord?: (word: string) => void;
  onOpenThcsPdf?: (grade: ThcsGradeNumber, page?: number) => void;
}

type LessonTab = 'vocab' | 'notation' | 'expressions' | 'examples' | 'exercises';

// Clean LaTeX syntax into natural English speech text for TTS playback
function cleanMathForSpeech(input: string): string {
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

const EXPRESSION_CATEGORY_LABELS: Record<ExpressionCategory | 'all', string> = {
  all: 'Tất cả mẫu câu',
  explaining: 'Giải thích kiến thức',
  questioning: 'Câu hỏi tương tác lớp',
  instructing: 'Yêu cầu / Hướng dẫn HS',
  solving: 'Trình bày lời giải',
};

export const ThcsCurriculumView: React.FC<ThcsCurriculumViewProps> = ({
  initialGrade = 6,
  initialLessonId,
  onSelectWord,
  onOpenThcsPdf,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<ThcsGradeNumber>(initialGrade);
  const gradeBook = useMemo(() => getGradeBook(selectedGrade), [selectedGrade]);

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLessonId || gradeBook.chapters[0]?.lessons[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<LessonTab>('vocab');
  const [searchQuery, setSearchQuery] = useState('');
  const [exprCategory, setExprCategory] = useState<ExpressionCategory | 'all'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // AI Teaching Assistant state
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiResult, setAiResult] = useState<ThcsAssistResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Sync grade changes when initialGrade prop updates
  useEffect(() => {
    setSelectedGrade(initialGrade);
  }, [initialGrade]);

  // Ensure valid chapter/lesson selection when switching grade
  useEffect(() => {
    const firstChapter = gradeBook.chapters[0];
    if (!firstChapter) return;
    const found = gradeBook.chapters.some((ch) =>
      ch.lessons.some((l) => l.id === selectedLessonId)
    );
    if (!found && firstChapter.lessons[0]) {
      setSelectedLessonId(firstChapter.lessons[0].id);
      setExpandedChapters({ [firstChapter.id]: true });
    } else {
      const parentChapter = gradeBook.chapters.find((ch) =>
        ch.lessons.some((l) => l.id === selectedLessonId)
      );
      if (parentChapter) {
        setExpandedChapters((prev) => ({ ...prev, [parentChapter.id]: true }));
      }
    }
    setAiResult(null);
    setAiError(null);
  }, [gradeBook, selectedLessonId]);

  const { activeChapter, activeLesson } = useMemo(() => {
    for (const ch of gradeBook.chapters) {
      const found = ch.lessons.find((l) => l.id === selectedLessonId);
      if (found) return { activeChapter: ch, activeLesson: found };
    }
    const fallbackCh = gradeBook.chapters[0];
    return {
      activeChapter: fallbackCh,
      activeLesson: fallbackCh?.lessons[0],
    };
  }, [gradeBook, selectedLessonId]);

  const searchHits = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchThcsCurriculum(searchQuery, 'all');
  }, [searchQuery]);

  const handleSelectHit = (hit: ThcsSearchHit) => {
    setSelectedGrade(hit.grade);
    setSelectedLessonId(hit.lesson.id);
    setExpandedChapters((prev) => ({ ...prev, [hit.chapter.id]: true }));
    if (hit.type === 'vocab') setActiveTab('vocab');
    else if (hit.type === 'notation') setActiveTab('notation');
    else if (hit.type === 'expression') setActiveTab('expressions');
    else if (hit.type === 'example') setActiveTab('examples');
    setSearchQuery('');
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskAi = async (customText?: string) => {
    if (!activeChapter || !activeLesson) return;
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const data = await ApiService.generateThcsAssist({
        grade: selectedGrade,
        chapterTitleEn: activeChapter.titleEn,
        chapterTitleVi: activeChapter.titleVi,
        lessonTitleEn: activeLesson.titleEn,
        lessonTitleVi: activeLesson.titleVi,
        customQuestion: customText ?? customPrompt.trim(),
      });
      setAiResult(data);
    } catch (err: any) {
      setAiError(err?.message || 'Không thể kết nối trợ lý AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const filteredExpressions = useMemo(() => {
    if (!activeLesson) return [];
    if (exprCategory === 'all') return activeLesson.classroomExpressions;
    return activeLesson.classroomExpressions.filter((e) => e.category === exprCategory);
  }, [activeLesson, exprCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Controls Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span>Tài liệu hướng dẫn dạy học Toán THCS bằng tiếng Anh (BGD&ĐT 2026)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Chương trình Toán THCS Song ngữ (Lớp 6 – Lớp 9)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Tra cứu từ vựng, cách đọc ký hiệu toán học bằng tiếng Anh, mẫu câu giảng dạy trên lớp, ví dụ minh họa từng bước và bài tập có lời giải Anh – Việt.
            </p>
          </div>

          {/* Segmented Grade Tabs */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start lg:self-center shrink-0">
            {([6, 7, 8, 9] as ThcsGradeNumber[]).map((g) => {
              const active = selectedGrade === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setSelectedGrade(g);
                    const book = getGradeBook(g);
                    if (book.chapters[0]?.lessons[0]) {
                      setSelectedLessonId(book.chapters[0].lessons[0].id);
                      setExpandedChapters({ [book.chapters[0].id]: true });
                    }
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer tabular-nums whitespace-nowrap ${
                    active
                      ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Toán {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cross-grade Search Input */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh theo tên bài, từ vựng, ký hiệu (VD: squared, Thales, discriminant, Vieta, đường trung bình, góc nâng)..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Hits Dropdown */}
          {searchQuery.trim() && (
            <div className="mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {searchHits.length === 0 ? (
                <div className="p-4 text-xs text-slate-500 text-center">
                  Không tìm thấy nội dung khớp với "{searchQuery}" trong Toán Lớp 6–9.
                </div>
              ) : (
                searchHits.map((hit, idx) => (
                  <button
                    key={`${hit.lesson.id}-${hit.type}-${idx}`}
                    type="button"
                    onClick={() => handleSelectHit(hit)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        <MathText text={hit.title} />
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {hit.subtitle}
                      </p>
                      {hit.matchedTextVi && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          <MathText text={hit.matchedTextVi} />
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-400 shrink-0 tabular-nums">
                      Lớp {hit.grade} →
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Two-Zone Pedagogical Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone (~30% / 4 cols): Chapter & Lesson Curriculum Tree */}
        <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/40">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Mục lục Toán Lớp {selectedGrade}
              </h2>
              <p className="text-xs text-slate-500 tabular-nums">
                {gradeBook.totalChapters} chương • {gradeBook.totalLessons} bài trong giáo trình
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenThcsPdf?.(selectedGrade, 1)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              title={`Xem sách PDF Toán ${selectedGrade}`}
            >
              <FileText className="w-3.5 h-3.5" />
              PDF gốc
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[68vh] overflow-y-auto">
            {gradeBook.chapters.map((chapter: ThcsChapter) => {
              const isExpanded = !!expandedChapters[chapter.id];
              return (
                <div key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full px-4 py-3 text-left flex items-start justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-blue-700 dark:text-blue-400 tabular-nums">
                        Chương {chapter.chapterNumber}
                      </div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                        {chapter.titleEn}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {chapter.titleVi}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-50/70 dark:bg-slate-950/40 px-2 py-1.5 space-y-1 border-t border-slate-100 dark:border-slate-800">
                      {chapter.lessons.map((lesson) => {
                        const isSelected = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => {
                              setSelectedLessonId(lesson.id);
                              setAiResult(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="font-semibold leading-snug">
                              Bài {lesson.lessonNumber}: {lesson.titleEn}
                            </div>
                            <div
                              className={`text-[11px] mt-0.5 ${
                                isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {lesson.titleVi}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Zone (~70% / 8 cols): Active Lesson Bilingual Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {activeChapter && activeLesson && (
            <>
              {/* Lesson Overview Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                      Toán Lớp {selectedGrade} • Chương {activeChapter.chapterNumber}: {activeChapter.titleVi} • Bài {activeLesson.lessonNumber}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      <MathText text={activeLesson.titleEn} onWordClick={onSelectWord} />
                    </h2>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      <MathText text={activeLesson.titleVi} />
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <PronounceButton
                      text={cleanMathForSpeech(activeLesson.titleEn)}
                      accent="en-US"
                      label="Nghe tiêu đề"
                      size="sm"
                    />
                    <a
                      href={`${gradeBook.pdfUrl}#page=${activeLesson.pdfPage || 1}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Mở PDF Toán {selectedGrade}
                    </a>
                  </div>
                </div>

                {/* Bilingual Lesson Objectives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                      Lesson Objectives (English)
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      {activeLesson.objectivesEn.map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>
                            <MathText text={obj} onWordClick={onSelectWord} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                      Mục tiêu bài học (Tiếng Việt)
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      {activeLesson.objectivesVi.map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <MathText text={obj} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section Navigation Tabs */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 px-2 sm:px-4">
                  {[
                    {
                      id: 'vocab' as LessonTab,
                      label: 'Từ vựng',
                      count: activeLesson.vocabulary.length,
                      icon: BookOpen,
                    },
                    {
                      id: 'notation' as LessonTab,
                      label: 'Đọc ký hiệu & công thức',
                      count: activeLesson.notationReadings.length,
                      icon: Volume2,
                    },
                    {
                      id: 'expressions' as LessonTab,
                      label: 'Mẫu câu giảng dạy',
                      count: activeLesson.classroomExpressions.length,
                      icon: MessageSquare,
                    },
                    {
                      id: 'examples' as LessonTab,
                      label: 'Ví dụ minh họa',
                      count: activeLesson.workedExamples.length,
                      icon: Sigma,
                    },
                    {
                      id: 'exercises' as LessonTab,
                      label: 'Bài tập & AI Soạn giảng',
                      count: activeLesson.exercises.length,
                      icon: ListChecks,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3.5 px-3 sm:px-4 border-b-2 text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                          isActive
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                        <span className="text-xs text-slate-400 font-mono tabular-nums">
                          ({tab.count})
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Panels */}
                <div className="p-5 sm:p-6">
                  {/* TAB 1: VOCABULARY */}
                  {activeTab === 'vocab' && (
                    <div className="space-y-4">
                      {activeLesson.vocabulary.map((v, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {v.termEn}
                              </h3>
                              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {v.meaningVi}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                <PronounceButton text={v.termEn.replace(/\//g, ', ')} accent="en-GB" size="sm" />
                                <span className="text-xs font-mono text-slate-500">{v.ipaUk}</span>
                              </div>
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                <PronounceButton text={v.termEn.replace(/\//g, ', ')} accent="en-US" size="sm" />
                                <span className="text-xs font-mono text-slate-500">{v.ipaUs}</span>
                              </div>
                            </div>
                          </div>

                          {/* Bilingual Definitions */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                English Explanation
                              </span>
                              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                                <MathText text={v.definitionEn} onWordClick={onSelectWord} />
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Giải thích Tiếng Việt
                              </span>
                              <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                                <MathText text={v.definitionVi} />
                              </p>
                            </div>
                          </div>

                          {/* Context Example Sentence */}
                          <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 space-y-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                <MathText text={v.exampleEn} onWordClick={onSelectWord} />
                              </p>
                              <PronounceButton
                                text={cleanMathForSpeech(v.exampleEn)}
                                accent="en-US"
                                size="sm"
                                label="Đọc câu"
                              />
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              → <MathText text={v.exampleVi} />
                            </p>
                          </div>

                          {/* Teacher Pedagogical Note */}
                          {(v.teacherNoteVi || v.teacherNoteEn) && (
                            <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                              <span className="font-bold">Lưu ý cho giáo viên khi giảng dạy song ngữ:</span>
                              {v.teacherNoteVi && <p>{v.teacherNoteVi}</p>}
                              {v.teacherNoteEn && <p className="italic opacity-90">{v.teacherNoteEn}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 2: READING MATHEMATICAL NOTATION ALOUD */}
                  {activeTab === 'notation' && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        Hướng dẫn chuẩn cách phát âm ký hiệu và công thức toán học thành câu tiếng Anh tự nhiên trên lớp. Bấm nút nghe để luyện đọc mẫu.
                      </p>

                      {activeLesson.notationReadings.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-lg sm:text-xl font-semibold text-slate-900 dark:text-white overflow-x-auto">
                              <MathText text={item.symbolLatex} />
                            </div>

                            <div className="flex-1 space-y-1.5">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                  Cách đọc tiếng Anh (Read aloud as)
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <PronounceButton text={item.readAsEn} accent="en-GB" size="sm" />
                                  <PronounceButton text={item.readAsEn} accent="en-US" size="sm" />
                                </div>
                              </div>
                              <p className="text-base font-bold text-slate-900 dark:text-white">
                                "{item.readAsEn}"
                              </p>
                              <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                Nghĩa tiếng Việt: {item.meaningVi}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200/70 dark:border-slate-700/70">
                            <div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">EN: </span>
                              <MathText text={item.explanationEn} onWordClick={onSelectWord} />
                            </div>
                            <div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">VI: </span>
                              <MathText text={item.explanationVi} />
                            </div>
                          </div>

                          {item.exampleLatex && item.exampleReadAsEn && (
                            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                              <div>
                                <span className="font-bold text-slate-700 dark:text-slate-200 mr-2">
                                  Ví dụ đọc:
                                </span>
                                <MathText text={item.exampleLatex} className="font-semibold mr-2" />
                                <span className="text-slate-500">→ "{item.exampleReadAsEn}"</span>
                              </div>
                              <PronounceButton text={item.exampleReadAsEn} accent="en-US" size="sm" label="Nghe ví dụ" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: CLASSROOM EXPRESSIONS */}
                  {activeTab === 'expressions' && (
                    <div className="space-y-4">
                      {/* Category Filter */}
                      <div className="flex flex-wrap items-center gap-2">
                        {(['all', 'explaining', 'questioning', 'instructing', 'solving'] as const).map(
                          (cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setExprCategory(cat)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                                exprCategory === cat
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                            >
                              {EXPRESSION_CATEGORY_LABELS[cat]}
                            </button>
                          )
                        )}
                      </div>

                      <div className="space-y-3">
                        {filteredExpressions.map((expr, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                  {EXPRESSION_CATEGORY_LABELS[expr.category]}
                                </span>
                                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                                  <MathText text={expr.en} onWordClick={onSelectWord} />
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <PronounceButton
                                  text={cleanMathForSpeech(expr.en)}
                                  accent="en-GB"
                                  size="sm"
                                />
                                <PronounceButton
                                  text={cleanMathForSpeech(expr.en)}
                                  accent="en-US"
                                  size="sm"
                                />
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                              <span className="font-semibold text-slate-700 dark:text-slate-200">Tiếng Việt: </span>
                              <MathText text={expr.vi} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: WORKED EXAMPLES */}
                  {activeTab === 'examples' && (
                    <div className="space-y-5">
                      {activeLesson.workedExamples.map((ex) => (
                        <div
                          key={ex.id}
                          className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                          <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                <MathText text={ex.titleEn} />
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                <MathText text={ex.titleVi} />
                              </p>
                            </div>
                            <PronounceButton
                              text={cleanMathForSpeech(
                                `${ex.problemEn} ${ex.steps.map((s) => s.stepEn).join(' ')} ${ex.conclusionEn}`
                              )}
                              accent="en-US"
                              size="sm"
                              label="Đọc toàn bộ ví dụ"
                            />
                          </div>

                          <div className="p-5 space-y-4">
                            {/* Bilingual Problem Statement */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/50">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold uppercase text-blue-700 dark:text-blue-400">
                                    Problem (EN)
                                  </span>
                                  <PronounceButton
                                    text={cleanMathForSpeech(ex.problemEn)}
                                    accent="en-US"
                                    size="sm"
                                  />
                                </div>
                                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                                  <MathText text={ex.problemEn} onWordClick={onSelectWord} />
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block">
                                  Đề bài (VI)
                                </span>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                  <MathText text={ex.problemVi} />
                                </p>
                              </div>
                            </div>

                            {/* Step-by-step Bilingual Solution */}
                            <div className="space-y-3">
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Lời giải từng bước (Step-by-step Solution)
                              </div>
                              {ex.steps.map((step) => (
                                <div
                                  key={step.stepNumber}
                                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-2"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                                        Bước {step.stepNumber} (Step {step.stepNumber})
                                      </span>
                                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        <MathText text={step.stepEn} onWordClick={onSelectWord} />
                                      </p>
                                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                        → <MathText text={step.stepVi} />
                                      </p>
                                    </div>
                                    <PronounceButton
                                      text={cleanMathForSpeech(step.stepEn)}
                                      accent="en-US"
                                      size="sm"
                                    />
                                  </div>

                                  {step.mathLatex && (
                                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 overflow-x-auto">
                                      <MathText text={step.mathLatex} />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Bilingual Conclusion */}
                            <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs sm:text-sm space-y-1">
                              <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                                Conclusion (EN): <MathText text={ex.conclusionEn} onWordClick={onSelectWord} />
                              </p>
                              <p className="text-emerald-800 dark:text-emerald-300">
                                Kết luận (VI): <MathText text={ex.conclusionVi} />
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 5: EXERCISES & AI LESSON ASSISTANT */}
                  {activeTab === 'exercises' && (
                    <div className="space-y-6">
                      {/* Built-in Exercises with Toggleable Bilingual Keys */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                          Bài tập luyện tập & Đáp án song ngữ
                        </h3>
                        {activeLesson.exercises.map((q, idx) => {
                          const isShown = !!revealedAnswers[q.id];
                          return (
                            <div
                              key={q.id}
                              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                                    Câu {idx + 1} • Mức độ: {q.level}
                                  </div>
                                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    <MathText text={q.questionEn} onWordClick={onSelectWord} />
                                  </p>
                                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                    <MathText text={q.questionVi} />
                                  </p>
                                </div>
                                <PronounceButton
                                  text={cleanMathForSpeech(q.questionEn)}
                                  accent="en-US"
                                  size="sm"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleAnswer(q.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              >
                                {isShown ? (
                                  <>
                                    <EyeOff className="w-3.5 h-3.5" />
                                    Ẩn đáp án & giải thích
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3.5 h-3.5" />
                                    Xem đáp án & giải thích song ngữ
                                  </>
                                )}
                              </button>

                              {isShown && (
                                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs sm:text-sm">
                                  <div className="font-bold text-emerald-700 dark:text-emerald-400">
                                    Đáp án (Answer): <MathText text={q.answerEn} />{' '}
                                    {q.answerVi !== q.answerEn && (
                                      <span className="font-normal text-slate-500">
                                        (<MathText text={q.answerVi} />)
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-700 dark:text-slate-200">
                                    <span className="font-semibold">EN: </span>
                                    <MathText text={q.explanationEn} onWordClick={onSelectWord} />
                                  </div>
                                  <div className="text-slate-600 dark:text-slate-300">
                                    <span className="font-semibold">VI: </span>
                                    <MathText text={q.explanationVi} />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* AI Bilingual Teaching Assistant */}
                      <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              Trợ lý AI Soạn câu giảng & Ví dụ Song ngữ cho Giáo viên
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                              Tạo thêm mẫu câu giảng dạy trên lớp, ví dụ minh họa từng bước hoặc hỏi đáp chuyên môn riêng cho bài học này.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAskAi('')}
                            disabled={isLoadingAi}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                          >
                            {isLoadingAi ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Đang tạo gợi ý...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                Tạo thêm ví dụ & câu giảng
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && customPrompt.trim()) {
                                handleAskAi(customPrompt.trim());
                              }
                            }}
                            placeholder="Nhập câu hỏi riêng (VD: Cách giải thích định lý này dễ hiểu cho HS lớp 8 bằng tiếng Anh...)"
                            className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => handleAskAi(customPrompt.trim())}
                            disabled={isLoadingAi || !customPrompt.trim()}
                            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer shrink-0"
                          >
                            Hỏi trợ lý AI
                          </button>
                        </div>

                        {aiError && (
                          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs border border-rose-200 dark:border-rose-900">
                            {aiError}
                          </div>
                        )}

                        {aiResult && !isLoadingAi && (
                          <div className="space-y-4 pt-2 border-t border-indigo-200/70 dark:border-indigo-900/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">
                                  Summary (EN)
                                </span>
                                <MathText text={aiResult.summaryEn} onWordClick={onSelectWord} />
                              </div>
                              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                                  Tóm tắt sư phạm (VI)
                                </span>
                                <MathText text={aiResult.summaryVi} />
                              </div>
                            </div>

                            {aiResult.classroomSentences?.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                  Mẫu câu giảng gợi ý thêm
                                </span>
                                {aiResult.classroomSentences.map((s, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2 text-xs sm:text-sm"
                                  >
                                    <div className="space-y-1">
                                      <p className="font-medium text-slate-900 dark:text-white">
                                        <MathText text={s.en} onWordClick={onSelectWord} />
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        → <MathText text={s.vi} />
                                      </p>
                                    </div>
                                    <PronounceButton
                                      text={cleanMathForSpeech(s.en)}
                                      accent="en-US"
                                      size="sm"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {aiResult.workedExample && (
                              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
                                <div className="font-bold text-indigo-700 dark:text-indigo-400">
                                  Ví dụ minh họa bổ sung
                                </div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  <MathText text={aiResult.workedExample.problemEn} onWordClick={onSelectWord} />
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-300">
                                  <MathText text={aiResult.workedExample.problemVi} />
                                </p>
                                <div className="space-y-1.5 pt-2">
                                  {aiResult.workedExample.steps?.map((st, sIdx) => (
                                    <div
                                      key={sIdx}
                                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 space-y-0.5 text-xs"
                                    >
                                      <p className="font-medium text-slate-800 dark:text-slate-200">
                                        <MathText text={st.stepEn} onWordClick={onSelectWord} />
                                      </p>
                                      <p className="text-slate-500 dark:text-slate-400">
                                        → <MathText text={st.stepVi} />
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                  Đáp án: <MathText text={aiResult.workedExample.answerEn} /> —{' '}
                                  <MathText text={aiResult.workedExample.answerVi} />
                                </div>
                              </div>
                            )}

                            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                              <span className="font-bold flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5" />
                                Ghi chú giảng dạy (Teacher Tip):
                              </span>
                              <p><MathText text={aiResult.teacherTipEn} /></p>
                              <p><MathText text={aiResult.teacherTipVi} /></p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
