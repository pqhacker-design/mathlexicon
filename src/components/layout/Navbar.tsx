import React, { useState } from 'react';
import {
  Search,
  Moon,
  Sun,
  Menu,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentGrade: number | 'all';
  onChangeGrade: (grade: number | 'all') => void;
  onQuickSearchTrigger: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileMenu,
  isDarkMode,
  onToggleDarkMode,
  currentGrade,
  onChangeGrade,
  onQuickSearchTrigger,
}) => {
  const [showGradeMenu, setShowGradeMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Mở menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  MATH LEXICON
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  AI
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                Từ điển Toán học Anh – Việt (KH&KT 1976 & Oxford)
              </p>
            </div>
          </div>
        </div>

        {/* Center: Quick Search Trigger Button */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={onQuickSearchTrigger}
            className="w-full h-10 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-slate-400 text-sm transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Tra từ tiếng Anh, thuật ngữ, công thức...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-slate-500 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right actions: Grade selector, Role Switcher, Dark mode */}
        <div className="flex items-center gap-2">
          {/* Grade Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowGradeMenu(!showGradeMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {currentGrade === 'all' ? 'Tất cả lớp 1-12' : `Lớp ${currentGrade}`}
              </span>
              <span className="sm:hidden">
                {currentGrade === 'all' ? 'K-12' : `L.${currentGrade}`}
              </span>
            </button>

            {showGradeMenu && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-40 text-xs">
                <button
                  onClick={() => {
                    onChangeGrade('all');
                    setShowGradeMenu(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer ${
                    currentGrade === 'all' ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Tất cả các lớp (1 – 12)
                </button>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">
                  Tiểu học (Lớp 1-5)
                </div>
                {[1, 2, 3, 4, 5].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      onChangeGrade(g);
                      setShowGradeMenu(false);
                    }}
                    className={`w-full px-4 py-1 text-left hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer ${
                      currentGrade === g ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">
                  THCS (Lớp 6-9)
                </div>
                {[6, 7, 8, 9].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      onChangeGrade(g);
                      setShowGradeMenu(false);
                    }}
                    className={`w-full px-4 py-1 text-left hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer ${
                      currentGrade === g ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">
                  THPT (Lớp 10-12)
                </div>
                {[10, 11, 12].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      onChangeGrade(g);
                      setShowGradeMenu(false);
                    }}
                    className={`w-full px-4 py-1 text-left hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer ${
                      currentGrade === g ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
