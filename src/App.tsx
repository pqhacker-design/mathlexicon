/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, User, School, Phone } from 'lucide-react';
import { Sidebar, ActiveView } from './components/layout/Sidebar';
import { HomeView } from './components/views/HomeView';
import { DictionaryView } from './components/views/DictionaryView';
import { ReverseDictionaryView } from './components/views/ReverseDictionaryView';
import { MathDisciplinesView } from './components/views/MathDisciplinesView';
import { PdfDictionaryView, PdfDocId } from './components/views/PdfDictionaryView';
import { ThcsCurriculumView } from './components/views/ThcsCurriculumView';
import { TranslatorView } from './components/views/TranslatorView';
import { TextReaderView } from './components/views/TextReaderView';
import { PracticeView } from './components/views/PracticeView';
import { FavoritesView } from './components/views/FavoritesView';
import { HistoryView } from './components/views/HistoryView';
import { DataManagementView } from './components/views/DataManagementView';
import { TermDetailModal } from './components/modals/TermDetailModal';
import { DictionaryTerm } from './types/dictionary';
import { ThcsGradeNumber } from './types/thcsCurriculum';
import { DictionaryStorage } from './services/dictionaryStorage';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(null);
  const currentGrade: number | 'all' = 'all';
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return (
      localStorage.getItem('edulexicon_dark_mode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extra parameters passed when navigating between views
  const [navParams, setNavParams] = useState<{
    query?: string;
    disciplineId?: string;
    pdfPage?: number;
    pdfDocId?: PdfDocId;
    thcsGrade?: ThcsGradeNumber;
    thcsLessonId?: string;
  }>({});

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('edulexicon_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('edulexicon_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Global Ctrl+K / Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveView('dict_en_vi');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (
    view: ActiveView,
    extra?: {
      query?: string;
      disciplineId?: string;
      pdfPage?: number;
      pdfDocId?: PdfDocId;
      thcsGrade?: ThcsGradeNumber;
      thcsLessonId?: string;
    }
  ) => {
    setActiveView(view);
    if (extra) {
      setNavParams(extra);
    }
  };

  const handleSelectWord = (word: string) => {
    // Try to find exact term
    const matched = DictionaryStorage.getTermByWord(word);
    if (matched) {
      setSelectedTerm(matched);
    } else {
      // Navigate to dictionary search
      setActiveView('dict_en_vi');
      setNavParams({ query: word });
      setSelectedTerm(null);
    }
  };

  const handleOpenPdfPage = (page: number, docId: PdfDocId = 'khkt_1976') => {
    handleNavigate('pdf_archive', { pdfPage: page, pdfDocId: docId });
  };

  const handleOpenThcsPdf = (grade: ThcsGradeNumber, page = 1) => {
    const docId = `toan_${grade}` as PdfDocId;
    handleNavigate('pdf_archive', { pdfPage: page, pdfDocId: docId });
  };

  const handleOpenThcsLesson = (grade: ThcsGradeNumber, lessonId: string) => {
    setSelectedTerm(null);
    handleNavigate('thcs_curriculum', { thcsGrade: grade, thcsLessonId: lessonId });
  };

  const favCount = DictionaryStorage.getFavorites().length;
  const historyCount = DictionaryStorage.getHistory().length;

  const derivedThcsGrade: ThcsGradeNumber =
    navParams.thcsGrade ||
    (typeof currentGrade === 'number' && currentGrade >= 6 && currentGrade <= 9
      ? (currentGrade as ThcsGradeNumber)
      : 6);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors flex flex-col">
      {/* Main Body with Sidebar + View Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeView={activeView}
          onSelectView={(v) => handleNavigate(v)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          favoritesCount={favCount}
          historyCount={historyCount}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto flex flex-col">
          <div className="flex-1">
          {/* Mobile menu button (only visible on screens smaller than lg) */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
          </div>
          {activeView === 'home' && (
            <HomeView
              onSelectTerm={setSelectedTerm}
              onNavigate={handleNavigate}
              currentGrade={currentGrade}
            />
          )}

          {activeView === 'thcs_curriculum' && (
            <ThcsCurriculumView
              initialGrade={derivedThcsGrade}
              initialLessonId={navParams.thcsLessonId}
              onSelectWord={handleSelectWord}
              onOpenThcsPdf={handleOpenThcsPdf}
            />
          )}

          {activeView === 'dict_en_vi' && (
            <DictionaryView
              initialQuery={navParams.query || ''}
              initialDisciplineId={navParams.disciplineId || 'all'}
              currentGrade={currentGrade}
              onSelectTerm={setSelectedTerm}
              onSelectWord={handleSelectWord}
              onOpenPdfPage={(p) => handleOpenPdfPage(p, 'khkt_1976')}
            />
          )}

          {activeView === 'dict_vi_en' && (
            <ReverseDictionaryView onSelectTerm={setSelectedTerm} />
          )}

          {activeView === 'disciplines' && (
            <MathDisciplinesView
              initialDisciplineId={navParams.disciplineId || 'algebra'}
              onSelectTerm={setSelectedTerm}
              currentGrade={currentGrade}
            />
          )}

          {activeView === 'pdf_archive' && (
            <PdfDictionaryView
              initialPage={navParams.pdfPage || 2}
              initialDocId={navParams.pdfDocId || 'khkt_1976'}
            />
          )}

          {activeView === 'translator' && <TranslatorView />}

          {activeView === 'tts_reader' && <TextReaderView />}

          {activeView === 'practice' && <PracticeView currentGrade={currentGrade} />}

          {activeView === 'favorites' && (
            <FavoritesView onSelectTerm={setSelectedTerm} />
          )}

          {activeView === 'history' && (
            <HistoryView
              onSelectTerm={setSelectedTerm}
              onNavigateSearch={(q) => {
                setActiveView('dict_en_vi');
                setNavParams({ query: q });
              }}
            />
          )}

          {activeView === 'data_admin' && (
            <DataManagementView onSelectTerm={setSelectedTerm} />
          )}
          </div>

          {/* Author Footer */}
          <footer className="mt-10 pt-5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Tác giả: Thầy Ngô Thanh Hùng</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <School className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Giáo viên trường THCS Bình San - Mỹ Đức, Hà Tiên, An Giang</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:justify-end">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>ĐT, Zalo:</span>
                <a
                  href="tel:0913117321"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  0913117321
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Term Detail Modal (Dual Source: KH&KT 1976 + Oxford Mathematics + THCS Links) */}
      <TermDetailModal
        term={selectedTerm}
        onClose={() => setSelectedTerm(null)}
        onSelectWord={handleSelectWord}
        onOpenPdfPage={(p) => handleOpenPdfPage(p, 'khkt_1976')}
        onOpenThcsLesson={handleOpenThcsLesson}
      />
    </div>
  );
}
