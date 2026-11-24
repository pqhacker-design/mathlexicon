import React from 'react';
import {
  Home,
  BookOpen,
  Languages,
  Sparkles,
  Headphones,
  Mic,
  Star,
  Clock,
  Database,
  X,
  Calculator,
  FileText,
  Boxes,
  GraduationCap,
  Sun,
  Moon,
  PanelLeftClose,
  KeyRound
} from 'lucide-react';

export type ActiveView =
  | 'home'
  | 'thcs_curriculum'
  | 'dict_en_vi'
  | 'dict_vi_en'
  | 'disciplines'
  | 'pdf_archive'
  | 'translator'
  | 'tts_reader'
  | 'practice'
  | 'favorites'
  | 'history'
  | 'data_admin';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isDesktopHidden?: boolean;
  onToggleDesktopHidden?: () => void;
  favoritesCount: number;
  historyCount: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  hasApiKey?: boolean;
  onOpenApiKeyModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  isDesktopHidden = false,
  onToggleDesktopHidden,
  favoritesCount,
  historyCount,
  isDarkMode,
  onToggleDarkMode,
  hasApiKey = false,
  onOpenApiKeyModal,
}) => {
  const menuItems = [
    {
      id: 'home' as ActiveView,
      label: 'Trang chủ',
      icon: Home,
      badge: null,
      color: 'text-blue-600',
    },
    {
      id: 'thcs_curriculum' as ActiveView,
      label: 'Toán THCS Song ngữ (6–9)',
      icon: GraduationCap,
      badge: 'Lớp 6-9',
      color: 'text-sky-600',
    },
    {
      id: 'dict_en_vi' as ActiveView,
      label: 'Từ điển Toán Anh – Việt',
      icon: BookOpen,
      badge: 'Oxford & 1976',
      color: 'text-indigo-600',
    },
    {
      id: 'dict_vi_en' as ActiveView,
      label: 'Từ điển Toán Việt – Anh',
      icon: Languages,
      badge: null,
      color: 'text-teal-600',
    },
    {
      id: 'disciplines' as ActiveView,
      label: 'Chuyên ngành Toán học',
      icon: Boxes,
      badge: '9 Ngành',
      color: 'text-cyan-600',
    },
    {
      id: 'pdf_archive' as ActiveView,
      label: 'Kho PDF Sách & Giáo trình',
      icon: FileText,
      badge: '5 Tài liệu',
      color: 'text-emerald-600',
    },
    {
      id: 'translator' as ActiveView,
      label: 'Dịch đề bài & Tài liệu Toán',
      icon: Sparkles,
      badge: 'LaTeX AI',
      color: 'text-purple-600',
    },
    {
      id: 'tts_reader' as ActiveView,
      label: 'Đọc công thức & Văn bản',
      icon: Headphones,
      badge: 'UK / US',
      color: 'text-rose-600',
    },
    {
      id: 'practice' as ActiveView,
      label: 'Luyện thuật ngữ & Phát âm',
      icon: Mic,
      badge: 'Flashcard',
      color: 'text-amber-600',
    },
    {
      id: 'favorites' as ActiveView,
      label: 'Thuật ngữ yêu thích',
      icon: Star,
      badge: favoritesCount > 0 ? favoritesCount : null,
      color: 'text-amber-500',
    },
    {
      id: 'history' as ActiveView,
      label: 'Lịch sử tra cứu',
      icon: Clock,
      badge: historyCount > 0 ? historyCount : null,
      color: 'text-slate-500',
    },
    {
      id: 'data_admin' as ActiveView,
      label: 'Quản lý & Xuất dữ liệu',
      icon: Database,
      badge: 'JSON/Excel',
      color: 'text-slate-600',
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
              MATH LEXICON AI
            </h2>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              Toán học Song ngữ THCS & Oxford
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onToggleDarkMode && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              aria-label={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {onToggleDesktopHidden && (
            <button
              type="button"
              onClick={onToggleDesktopHidden}
              className="hidden lg:inline-flex items-center justify-center p-1.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Ẩn menu bên trái để mở rộng nội dung"
              aria-label="Ẩn menu bên trái"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}

          {/* Mobile close */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 lg:hidden text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Citation Header */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
        MOET THCS (6–9) • KH&KT 1976 • Oxford
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectView(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : item.color
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User API Key Configuration & Quick Access to PDF book */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
        {onOpenApiKeyModal && (
          <button
            type="button"
            onClick={() => {
              onOpenApiKeyModal();
              onCloseMobile();
            }}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer text-left space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                <KeyRound className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>API Key AI cá nhân</span>
              </span>
              <span
                className={`text-[11px] font-semibold whitespace-nowrap ${
                  hasApiKey
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-amber-700 dark:text-amber-400'
                }`}
              >
                {hasApiKey ? 'Đã lưu' : 'Chưa nhập'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {hasApiKey
                ? 'Đang dùng Gemini API Key của bạn. Bấm để đổi hoặc xóa.'
                : 'Nhập Gemini API Key của bạn để bật các tính năng AI.'}
            </p>
          </button>
        )}

        <div
          onClick={() => {
            onSelectView('pdf_archive');
            onCloseMobile();
          }}
          className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200/80 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition-all space-y-1"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <FileText className="w-3.5 h-3.5" />
            <span>Kho tài liệu PDF gốc</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
            Từ điển KH&amp;KT 1976 (451 trang) &amp; Giáo trình Toán THCS Lớp 6–9 (2026).
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isDesktopHidden && (
        <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
          {content}
        </aside>
      )}

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
