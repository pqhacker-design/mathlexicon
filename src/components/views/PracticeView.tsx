import React, { useState, useEffect, useMemo } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  XCircle,
  BookOpen,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ListChecks,
  GraduationCap,
  Layers,
  AlertCircle,
  Sparkles,
  RotateCcw,
  KeyRound,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MATH_DISCIPLINES, getDisciplineById } from '../../data/mathDisciplines';
import {
  THCS_CURRICULUM_BOOKS,
  getThcsPracticeDeck,
  cleanMathForSpeech,
  ThcsPracticeItem,
} from '../../data/thcsCurriculum';
import { ThcsGradeNumber } from '../../types/thcsCurriculum';
import { PronounceButton } from '../common/PronounceButton';
import { MathText } from '../common/MathText';
import { DictionaryStorage } from '../../services/dictionaryStorage';
import { ApiService, PronunciationFeedbackResponse, isApiKeyError } from '../../services/apiService';
import { requestOpenApiKeyModal } from '../../services/userApiKeyStorage';
import { ttsService } from '../../services/ttsService';

type SourceMode = 'thcs_lesson' | 'discipline';
type PracticeTab = 'flashcard' | 'speech_coach' | 'quiz_meaning' | 'quiz_listening';

export const PracticeView: React.FC<{ currentGrade: number | 'all' }> = ({ currentGrade }) => {
  const [activeTab, setActiveTab] = useState<PracticeTab>('flashcard');
  const [sourceMode, setSourceMode] = useState<SourceMode>('thcs_lesson');

  // --- THCS Grade -> Chapter -> Lesson filters (Grades 6, 7, 8, 9) ---
  const initialThcsGrade: ThcsGradeNumber | 'all' =
    currentGrade === 6 || currentGrade === 7 || currentGrade === 8 || currentGrade === 9
      ? currentGrade
      : 6;
  const [thcsGrade, setThcsGrade] = useState<ThcsGradeNumber | 'all'>(initialThcsGrade);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');
  const [showLessonWordList, setShowLessonWordList] = useState<boolean>(true);

  // --- General Discipline & K12 filters ---
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(currentGrade);

  // --- Mastery Progress state (synced with localStorage) ---
  const [progressMap, setProgressMap] = useState<
    ReturnType<typeof DictionaryStorage.getFlashcardProgress>
  >(() => DictionaryStorage.getFlashcardProgress());

  const allTerms = useMemo(() => DictionaryStorage.getAllTerms(), []);

  // Derived chapters & lessons for selected THCS grade
  const availableChapters = useMemo(() => {
    if (thcsGrade === 'all') {
      return THCS_CURRICULUM_BOOKS.flatMap((b) => b.chapters);
    }
    const book = THCS_CURRICULUM_BOOKS.find((b) => b.grade === thcsGrade);
    return book ? book.chapters : [];
  }, [thcsGrade]);

  const availableLessons = useMemo(() => {
    if (selectedChapterId === 'all') {
      return availableChapters.flatMap((c) =>
        c.lessons.map((l) => ({ chapter: c, lesson: l }))
      );
    }
    const ch = availableChapters.find((c) => c.id === selectedChapterId);
    return ch ? ch.lessons.map((l) => ({ chapter: ch, lesson: l })) : [];
  }, [availableChapters, selectedChapterId]);

  // THCS practice deck
  const thcsDeck = useMemo(
    () =>
      getThcsPracticeDeck({
        grade: thcsGrade,
        chapterId: selectedChapterId,
        lessonId: selectedLessonId,
      }),
    [thcsGrade, selectedChapterId, selectedLessonId]
  );

  // General discipline deck
  const disciplineDeck = useMemo(
    () =>
      allTerms.filter((t) => {
        if (
          selectedSubject !== 'all' &&
          t.discipline !== selectedSubject &&
          t.primarySubjectId !== selectedSubject
        ) {
          return false;
        }
        if (selectedGrade !== 'all' && !t.applicableGrades.includes(selectedGrade as number)) {
          return false;
        }
        return true;
      }),
    [allTerms, selectedSubject, selectedGrade]
  );

  // Active cards unified view
  const activePracticeItems: ThcsPracticeItem[] = useMemo(() => {
    if (sourceMode === 'thcs_lesson') {
      return thcsDeck;
    }
    const pool = disciplineDeck.length > 0 ? disciplineDeck : allTerms;
    return pool.map((term) => ({
      id: term.id,
      term,
      grade: (term.applicableGrades[0] as ThcsGradeNumber) || 6,
      chapterId: term.discipline || 'all',
      chapterNumber: 0,
      chapterTitleEn: getDisciplineById(term.discipline || 'algebra')?.nameEn || 'Mathematics',
      chapterTitleVi: getDisciplineById(term.discipline || 'algebra')?.nameVi || 'Toán học',
      lessonId: term.id,
      lessonNumber: 0,
      lessonTitleEn: term.senses[0]?.topic || '',
      lessonTitleVi: term.senses[0]?.topic || '',
      definitionVi: term.khktDefVi || term.primaryMeaningVi || '',
      teacherNoteVi: term.pedagogyNotesVi,
    }));
  }, [sourceMode, thcsDeck, disciplineDeck, allTerms]);

  // --- Card & Quiz State ---
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const safeIndex =
    activePracticeItems.length > 0 ? cardIndex % activePracticeItems.length : 0;
  const currentItem = activePracticeItems[safeIndex];
  const currentCard = currentItem?.term;

  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // --- Speech Coach State ---
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTranscript, setRecordedTranscript] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSpeechKeyError, setIsSpeechKeyError] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<PronunciationFeedbackResponse | null>(null);

  // Reset chapter/lesson when THCS grade changes
  const handleSelectThcsGrade = (grade: ThcsGradeNumber | 'all') => {
    setThcsGrade(grade);
    setSelectedChapterId('all');
    setSelectedLessonId('all');
    setCardIndex(0);
    setIsFlipped(false);
  };

  const handleSelectChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setSelectedLessonId('all');
    setCardIndex(0);
    setIsFlipped(false);
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCardIndex(0);
    setIsFlipped(false);
  };

  // Compute mastery stats in current deck
  const masteredCount = useMemo(() => {
    return activePracticeItems.filter((item) => {
      const p = progressMap[item.id];
      return p && p.timesCorrect > 0;
    }).length;
  }, [activePracticeItems, progressMap]);

  // Quiz options generator (drawing distractors from wider pool so always 4 choices)
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!currentCard) {
      setOptions([]);
      return;
    }
    const correctMeaning = currentCard.primaryMeaningVi;
    const candidateMeanings = Array.from(
      new Set(
        allTerms
          .filter((t) => t.id !== currentCard.id && t.primaryMeaningVi !== correctMeaning)
          .map((t) => t.primaryMeaningVi)
      )
    );
    const distractors = candidateMeanings
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const merged = [correctMeaning, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(merged);
    setSelectedOption(null);
    setIsAnswered(false);
    setRecordedTranscript('');
    setManualInput('');
    setSpeechFeedback(null);
    setSpeechError(null);
  }, [
    safeIndex,
    activeTab,
    sourceMode,
    thcsGrade,
    selectedChapterId,
    selectedLessonId,
    selectedSubject,
    selectedGrade,
    currentCard?.id,
    allTerms,
  ]);

  const handleNextCard = (learned: boolean) => {
    if (currentCard) {
      DictionaryStorage.updateFlashcardResult(currentCard.id, learned);
      setProgressMap(DictionaryStorage.getFlashcardProgress());
      if (learned) {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      }
    }
    setIsFlipped(false);
    if (activePracticeItems.length > 0) {
      setCardIndex((prev) => (prev + 1) % activePracticeItems.length);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (activePracticeItems.length > 0) {
      setCardIndex((prev) =>
        prev === 0 ? activePracticeItems.length - 1 : prev - 1
      );
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !currentCard) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const correct = opt === currentCard.primaryMeaningVi;
    DictionaryStorage.updateFlashcardResult(currentCard.id, correct);
    setProgressMap(DictionaryStorage.getFlashcardProgress());

    if (correct) {
      setQuizScore((prev) => prev + 10);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleNextQuiz = () => {
    if (activePracticeItems.length > 0) {
      setCardIndex((prev) => (prev + 1) % activePracticeItems.length);
    }
  };

  const analyzeTranscript = async (spokenText: string) => {
    if (!currentCard || !spokenText.trim()) return;
    setRecordedTranscript(spokenText.trim());
    setIsAnalyzing(true);
    setSpeechError(null);
    setIsSpeechKeyError(false);
    try {
      const feedback = await ApiService.getPronunciationFeedback({
        word: cleanMathForSpeech(currentCard.word),
        targetIpa: currentCard.ipaUs,
        transcript: spokenText.trim(),
      });
      setSpeechFeedback(feedback);
      if (feedback.score >= 80) {
        DictionaryStorage.updateFlashcardResult(currentCard.id, true);
        setProgressMap(DictionaryStorage.getFlashcardProgress());
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      }
    } catch (e: any) {
      setIsSpeechKeyError(isApiKeyError(e));
      setSpeechError(e?.message || 'Không thể phân tích phát âm lúc này.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Web Speech Recognition for Pronunciation Practice
  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        'Trình duyệt hiện tại chưa bật Web Speech Recognition. Thầy/cô có thể nghe giọng mẫu Anh – Mỹ và nhập thử nội dung vào ô bên dưới để AI chấm điểm.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);
      setSpeechFeedback(null);
      setSpeechError(null);

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        await analyzeTranscript(transcript);
      };

      recognition.onerror = (ev: any) => {
        setIsRecording(false);
        setSpeechError(
          ev?.error === 'not-allowed'
            ? 'Quyền micro bị chặn. Vui lòng cấp quyền micro cho trình duyệt hoặc dùng ô kiểm tra thủ công bên dưới.'
            : 'Không thu được âm thanh rõ. Vui lòng thử đọc lại gần micro hơn.'
        );
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      setSpeechError('Không thể khởi động micro trên thiết bị này.');
    }
  };

  if (!currentCard || !currentItem) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Chưa có từ vựng nào khớp với bộ lọc đã chọn.
        </p>
        <button
          onClick={() => handleSelectThcsGrade('all')}
          className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
        >
          Hiển thị toàn bộ từ vựng THCS
        </button>
      </div>
    );
  }

  const speechWord = cleanMathForSpeech(currentCard.word);
  const exampleEn = currentCard.senses[0]?.examples[0]?.sentenceEn || '';
  const exampleVi = currentCard.senses[0]?.examples[0]?.sentenceVi || '';
  const speechExample = cleanMathForSpeech(exampleEn);
  const currentMastered = (progressMap[currentItem.id]?.timesCorrect || 0) > 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header & Curriculum Filters */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Mic className="w-6 h-6 text-emerald-600" />
              Luyện phát âm &amp; Học từ vựng chuyên ngành
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Hệ thống hóa từ vựng Toán THCS Lớp 6–9 theo từng Chương &amp; Bài học giúp giáo viên luyện phát âm Anh/Mỹ và ghi nhớ bài giảng.
            </p>
          </div>

          {/* Source Mode Switcher */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 self-start">
            <button
              type="button"
              onClick={() => {
                setSourceMode('thcs_lesson');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                sourceMode === 'thcs_lesson'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Theo Bài học THCS (Lớp 6–9)
            </button>
            <button
              type="button"
              onClick={() => {
                setSourceMode('discipline');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                sourceMode === 'discipline'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Chuyên ngành Toán (1976 &amp; Oxford)
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        {sourceMode === 'thcs_lesson' ? (
          <div className="space-y-4 pt-1 border-t border-slate-100 dark:border-slate-700/70">
            {/* Grade 6-9 Segmented Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Khối lớp THCS:
                </span>
                {(['all', 6, 7, 8, 9] as const).map((g) => {
                  const count = getThcsPracticeDeck({ grade: g }).length;
                  const active = thcsGrade === g;
                  return (
                    <button
                      key={String(g)}
                      type="button"
                      onClick={() => handleSelectThcsGrade(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        active
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400'
                      }`}
                    >
                      {g === 'all' ? `Tất cả THCS (${count})` : `Toán ${g} (${count})`}
                    </button>
                  );
                })}
              </div>

              {/* Lesson Mastery Counter */}
              <div className="flex items-center gap-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 px-3 py-1.5 rounded-lg">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Đã thuộc trong bộ: <strong>{masteredCount}</strong> / {activePracticeItems.length} từ
                </span>
                <div className="w-24 h-2 bg-emerald-100 dark:bg-slate-700 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{
                      width: `${
                        activePracticeItems.length > 0
                          ? Math.round((masteredCount / activePracticeItems.length) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Chapter & Lesson Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Chương học ({availableChapters.length} chương)
                </label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => handleSelectChapter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="all">
                    Tất cả các chương {thcsGrade === 'all' ? 'THCS (Lớp 6–9)' : `Toán ${thcsGrade}`}
                  </option>
                  {availableChapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Lớp {ch.grade} • Chương {ch.chapterNumber}: {ch.titleVi} ({ch.titleEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Bài học ({availableLessons.length} bài)
                </label>
                <select
                  value={selectedLessonId}
                  onChange={(e) => handleSelectLesson(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="all">
                    Tất cả bài học ({thcsDeck.length} từ vựng)
                  </option>
                  {availableLessons.map(({ chapter, lesson }) => (
                    <option key={lesson.id} value={lesson.id}>
                      Lớp {chapter.grade} • Bài {lesson.lessonNumber}: {lesson.titleVi} — {lesson.titleEn.replace(/\$/g, '')} ({lesson.vocabulary.length} từ)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Phân ngành Toán:
              </span>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="all">Tất cả ngành toán ({allTerms.length} từ)</option>
                {MATH_DISCIPLINES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameVi} ({d.abbrevVi})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Khối lớp:</span>
              <select
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(
                    e.target.value === 'all' ? 'all' : Number(e.target.value)
                  );
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="all">Tất cả lớp 1-12</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    Lớp {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Practice Mode Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 gap-2 pt-1 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('flashcard')}
              className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 ${
                activeTab === 'flashcard'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Thẻ ghi nhớ (Flashcard)
            </button>
            <button
              onClick={() => setActiveTab('speech_coach')}
              className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 ${
                activeTab === 'speech_coach'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Luyện phát âm &amp; AI Chấm điểm
            </button>
            <button
              onClick={() => setActiveTab('quiz_meaning')}
              className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 ${
                activeTab === 'quiz_meaning'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Nhìn từ chọn nghĩa
            </button>
            <button
              onClick={() => setActiveTab('quiz_listening')}
              className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 ${
                activeTab === 'quiz_listening'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Nghe âm thanh chọn nghĩa
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowLessonWordList((v) => !v)}
            className="mb-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <ListChecks className="w-3.5 h-3.5" />
            {showLessonWordList ? 'Ẩn danh sách từ' : `Danh sách (${activePracticeItems.length})`}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Practice Stage + Lesson Word List Sidebar */}
      <div
        className={`grid gap-6 ${
          showLessonWordList ? 'grid-cols-1 lg:grid-cols-12 items-start' : 'grid-cols-1'
        }`}
      >
        <div className={showLessonWordList ? 'lg:col-span-7 xl:col-span-8' : ''}>
          {/* 1. Flashcard Mode */}
          {activeTab === 'flashcard' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    Từ {safeIndex + 1} / {activePracticeItems.length}
                  </span>
                  {currentMastered && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Đã thuộc
                    </span>
                  )}
                </div>
                <span>Bấm vào thẻ để lật mặt sau</span>
              </div>

              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full min-h-[340px] p-7 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-md cursor-pointer transition-all flex flex-col justify-between items-center text-center space-y-4 select-none"
              >
                <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold uppercase">
                    {currentCard.wordType}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium text-right">
                    {sourceMode === 'thcs_lesson'
                      ? `Toán ${currentItem.grade} • Chương ${currentItem.chapterNumber} • Bài ${currentItem.lessonNumber}: ${currentItem.lessonTitleVi}`
                      : getDisciplineById(currentCard.discipline || 'algebra')?.nameVi}
                  </span>
                </div>

                {!isFlipped ? (
                  <div className="space-y-4 py-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      <MathText text={currentCard.word} />
                    </h2>
                    <div
                      className="flex flex-wrap items-center justify-center gap-3 pt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <span className="text-[11px] font-bold text-slate-400">UK</span>
                        <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                          {currentCard.ipaUk}
                        </span>
                        <PronounceButton text={speechWord} accent="en-GB" size="sm" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <span className="text-[11px] font-bold text-slate-400">US</span>
                        <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                          {currentCard.ipaUs}
                        </span>
                        <PronounceButton text={speechWord} accent="en-US" size="sm" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 pt-2">
                      Bấm vào thẻ để xem định nghĩa song ngữ và ví dụ minh họa
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 py-2 w-full text-left">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        <MathText text={currentCard.primaryMeaningVi} />
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                        <span className="font-bold text-slate-500 uppercase text-[10px]">
                          English Definition
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                          <MathText text={currentCard.simpleDefinitionEn || currentCard.oxfordDefEn || ''} />
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900 text-xs space-y-1">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
                          Giải thích Tiếng Việt
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                          <MathText text={currentItem.definitionVi} />
                        </p>
                      </div>
                    </div>

                    {exampleEn && (
                      <div
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 space-y-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-500 uppercase text-[10px]">
                            Ví dụ minh họa
                          </span>
                          <PronounceButton text={speechExample} accent="en-US" size="sm" />
                        </div>
                        <p className="italic text-slate-800 dark:text-slate-100">
                          <MathText text={exampleEn} />
                        </p>
                        {exampleVi && (
                          <p className="text-slate-500 dark:text-slate-400">
                            → <MathText text={exampleVi} />
                          </p>
                        )}
                      </div>
                    )}

                    {currentItem.teacherNoteVi && (
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">
                        <strong>Lưu ý sư phạm:</strong> <MathText text={currentItem.teacherNoteVi} />
                      </p>
                    )}
                  </div>
                )}

                <div className="text-[11px] text-slate-400">
                  Lớp {currentCard.applicableGrades.join(', ')} •{' '}
                  {isFlipped ? 'Mặt sau (Giải thích song ngữ)' : 'Mặt trước (Thuật ngữ & IPA)'}
                </div>
              </div>

              {/* Navigation & Leitner Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Từ trước
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleNextCard(false)}
                    className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs hover:bg-rose-100 cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Cần ôn lại
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextCard(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã thuộc từ này
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev + 1) % activePracticeItems.length);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                >
                  Từ tiếp <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. Speech Coach & Pronunciation Feedback */}
          {activeTab === 'speech_coach' && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-center space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Từ {safeIndex + 1} / {activePracticeItems.length}
                  </span>
                  {sourceMode === 'thcs_lesson' && (
                    <span className="font-medium">
                      Toán {currentItem.grade} • Bài {currentItem.lessonNumber}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  <MathText text={currentCard.word} />
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-400">UK</span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                      {currentCard.ipaUk}
                    </span>
                    <PronounceButton text={speechWord} accent="en-GB" size="sm" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-400">US</span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                      {currentCard.ipaUs}
                    </span>
                    <PronounceButton text={speechWord} accent="en-US" size="sm" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Nghĩa: <strong className="text-emerald-700 dark:text-emerald-400"><MathText text={currentCard.primaryMeaningVi} /></strong>
                </p>

                {exampleEn && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-left flex items-start justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[10px] block mb-0.5">
                        Câu ví dụ luyện đọc trên lớp:
                      </span>
                      <p className="text-slate-800 dark:text-slate-100 italic">
                        <MathText text={exampleEn} />
                      </p>
                    </div>
                    <PronounceButton text={speechExample} accent="en-US" size="sm" />
                  </div>
                )}

                {/* Recording Button */}
                <div className="pt-2 flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={startRecording}
                    disabled={isRecording || isAnalyzing}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-lg transition-all ${
                      isRecording
                        ? 'bg-rose-600 ring-4 ring-rose-300 dark:ring-rose-900 scale-105'
                        : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                    }`}
                    title="Bấm và nói vào micro"
                  >
                    {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {isRecording
                      ? 'Đang lắng nghe... Hãy đọc to thuật ngữ tiếng Anh trên'
                      : 'Bấm micro để thu âm giọng đọc (en-US)'}
                  </span>
                </div>

                {/* Inline Notice & Manual Test Fallback */}
                {speechError && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 space-y-2.5 text-left">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{speechError}</span>
                    </div>
                    {isSpeechKeyError && (
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
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (manualInput.trim()) {
                      analyzeTranscript(manualInput);
                    }
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700"
                >
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder={`Hoặc gõ thử từ "${speechWord}" để kiểm tra AI nhận xét...`}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isAnalyzing || !manualInput.trim()}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Chấm điểm
                  </button>
                </form>

                {/* Recorded Transcript */}
                {recordedTranscript && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="text-slate-400 block mb-0.5">Nội dung ghi nhận:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      &ldquo;{recordedTranscript}&rdquo;
                    </span>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="py-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>AI đang phân tích từng âm vị và trọng âm...</span>
                  </div>
                )}

                {/* AI Pronunciation Feedback Card */}
                {speechFeedback && (
                  <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 text-left space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                        Kết quả đánh giá phát âm AI
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-emerald-600 text-white shadow-2xs">
                        Điểm số: {speechFeedback.score}/100 ({speechFeedback.rating})
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                        {speechFeedback.stressCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        <span>Trọng âm: {speechFeedback.stressCorrect ? 'Chính xác' : 'Cần sửa'}</span>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                        {speechFeedback.endingSoundsCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        <span>Âm cuối: {speechFeedback.endingSoundsCorrect ? 'Tốt' : 'Chưa rõ'}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                      <p>
                        <strong>Nhận xét âm vị:</strong> {speechFeedback.phonemeFeedbackVi}
                      </p>
                      <p className="text-emerald-800 dark:text-emerald-300">
                        <strong>Mẹo giảng dạy &amp; luyện âm:</strong> {speechFeedback.coachingTipVi}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50"
                >
                  ← Từ trước
                </button>
                <button
                  type="button"
                  onClick={() => setCardIndex((prev) => (prev + 1) % activePracticeItems.length)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Luyện từ tiếp theo →
                </button>
              </div>
            </div>
          )}

          {/* 3. Multiple Choice Quizzes (Meaning & Listening) */}
          {(activeTab === 'quiz_meaning' || activeTab === 'quiz_listening') && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  Điểm tích lũy: <strong className="text-emerald-600 font-bold">{quizScore}</strong>
                </span>
                <span>
                  Câu {safeIndex + 1} / {activePracticeItems.length}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 text-center">
                {sourceMode === 'thcs_lesson' && (
                  <div className="text-[11px] font-semibold text-slate-400">
                    Toán {currentItem.grade} • Bài {currentItem.lessonNumber}: {currentItem.lessonTitleVi}
                  </div>
                )}

                {activeTab === 'quiz_meaning' ? (
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Chọn nghĩa tiếng Việt chính xác của từ:
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                      <MathText text={currentCard.word} />
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-xs font-mono text-slate-500">{currentCard.ipaUs}</span>
                      <PronounceButton text={speechWord} accent="en-US" size="sm" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 py-2">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Nghe âm thanh và chọn nghĩa đúng:
                    </span>
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => ttsService.speak(speechWord, { accent: 'en-GB' })}
                        className="px-4 py-3 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 hover:scale-105 transition-transform cursor-pointer border border-blue-200 dark:border-blue-800 flex items-center gap-2 text-xs font-bold"
                        title="Nghe giọng Anh (UK)"
                      >
                        <Volume2 className="w-5 h-5" /> Anh (UK)
                      </button>
                      <button
                        type="button"
                        onClick={() => ttsService.speak(speechWord, { accent: 'en-US' })}
                        className="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:scale-105 transition-transform cursor-pointer border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold"
                        title="Nghe giọng Mỹ (US)"
                      >
                        <Volume2 className="w-5 h-5" /> Mỹ (US)
                      </button>
                    </div>
                  </div>
                )}

                {/* 4 Choices */}
                <div className="space-y-2 pt-2">
                  {options.map((opt, i) => {
                    const isCorrect = opt === currentCard.primaryMeaningVi;
                    const isSelected = selectedOption === opt;

                    let btnStyle =
                      'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/70';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle =
                          'bg-emerald-100 border-emerald-400 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle =
                          'bg-rose-100 border-rose-400 text-rose-800 dark:bg-rose-950 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-3.5 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                      >
                        <span>
                          <MathText text={opt} />
                        </span>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation & Next button after answering */}
                {isAnswered && (
                  <div className="pt-3 space-y-3 text-left border-t border-slate-100 dark:border-slate-700">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 text-xs space-y-1">
                      <p className="font-bold text-slate-800 dark:text-slate-100">
                        <MathText text={currentCard.word} /> ({currentCard.ipaUs})
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        <MathText text={currentItem.definitionVi} />
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextQuiz}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                      >
                        Câu tiếp theo →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lesson Vocabulary Index Drawer / Column */}
        {showLessonWordList && (
          <div className="lg:col-span-5 xl:col-span-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  Danh sách từ trong bộ ({activePracticeItems.length})
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {masteredCount}/{activePracticeItems.length} thuộc
              </span>
            </div>

            <div className="max-h-[480px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/70">
              {activePracticeItems.map((item, idx) => {
                const isActive = idx === safeIndex;
                const isDone = (progressMap[item.id]?.timesCorrect || 0) > 0;
                const cleanSpeech = cleanMathForSpeech(item.term.word);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCardIndex(idx);
                      setIsFlipped(false);
                    }}
                    className={`px-4 py-3 flex items-start justify-between gap-2 cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/50'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 w-5 shrink-0">
                          {idx + 1}.
                        </span>
                        <span
                          className={`text-sm font-bold truncate ${
                            isActive
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : 'text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          <MathText text={item.term.word} />
                        </span>
                        {isDone && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 pl-7 mt-0.5 line-clamp-1">
                        <MathText text={item.term.primaryMeaningVi} />
                      </p>
                      {sourceMode === 'thcs_lesson' && (
                        <p className="text-[10px] text-slate-400 pl-7 mt-0.5 truncate">
                          Toán {item.grade} • Bài {item.lessonNumber}
                        </p>
                      )}
                    </div>

                    <div
                      className="flex items-center gap-1 shrink-0 pt-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PronounceButton text={cleanSpeech} accent="en-GB" size="sm" />
                      <PronounceButton text={cleanSpeech} accent="en-US" size="sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
