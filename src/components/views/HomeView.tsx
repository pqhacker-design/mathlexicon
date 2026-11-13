import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  BookOpen,
  Headphones,
  Mic,
  ArrowRight,
  Clock,
  GraduationCap,
  Calculator,
  FileText,
  Boxes,
  Code,
  Compass
} from 'lucide-react';
import { DictionaryTerm } from '../../types/dictionary';
import { MATH_DISCIPLINES, getDisciplineById, getGradeLabel } from '../../data/mathDisciplines';
import { PronounceButton } from '../common/PronounceButton';
import { DictionaryStorage } from '../../services/dictionaryStorage';
import { ActiveView } from '../layout/Sidebar';

interface HomeViewProps {
  onSelectTerm: (term: DictionaryTerm) => void;
  onNavigate: (view: ActiveView, extra?: any) => void;
  currentGrade: number | 'all';
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTerm,
  onNavigate,
  currentGrade,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const allTerms = DictionaryStorage.getAllTerms();
  const history = DictionaryStorage.getHistory().slice(0, 5);

  // Featured math terms
  const featuredTerms = allTerms.slice(0, 6);
  const termOfTheDay = allTerms.find(t => t.word.toLowerCase() === 'derivative') || allTerms[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('dict_en_vi', { query: searchQuery.trim() });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-indigo-700 to-sky-700 text-white p-6 sm:p-10 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Giáo trình Toán THCS Song ngữ (BGD&ĐT 2026) • KH&KT 1976 • Oxford Mathematics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            MATH LEXICON AI
          </h1>
          <p className="text-base sm:text-lg text-blue-100 font-medium leading-relaxed">
            Học thuật ngữ – Đọc chuẩn ký hiệu – Mẫu câu giảng dạy – Ví dụ minh họa song ngữ Anh Việt.
          </p>

          {/* Big Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-1.5 border border-white/30">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tra thuật ngữ toán (ví dụ: matrix, discriminant, Thales, congruent, rationalise)..."
                className="w-full px-3 py-2.5 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                Tra cứu
              </button>
            </div>
          </form>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-blue-100">
            <span className="opacity-80">Gợi ý nhanh:</span>
            {[
              'rational number',
              'similar triangles',
              'discriminant',
              'Pythagorean theorem',
              'tangent',
              'derivative',
              'eigenvalue',
            ].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onNavigate('dict_en_vi', { query: w })}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-colors"
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative background vectors */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </section>

      {/* THCS Grades 6-9 Teaching Hub Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Giảng dạy Toán THCS bằng Tiếng Anh (Lớp 6 – Lớp 9)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tra cứu từ vựng, cách đọc ký hiệu toán học thành tiếng, mẫu câu giảng bài trên lớp và ví dụ minh họa có giải thích Anh – Việt.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('thcs_curriculum', { thcsGrade: 6 })}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            Mở không gian giảng dạy
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              grade: 6 as const,
              title: 'Toán Lớp 6',
              chapters: '9 Chương • 43 Bài',
              topics: 'Số tự nhiên, ƯCLN/BCNN, Số nguyên, Phân số, Hình học phẳng, Thống kê.',
            },
            {
              grade: 7 as const,
              title: 'Toán Lớp 7',
              chapters: '10 Chương • 37 Bài',
              topics: 'Số hữu tỉ, Số thực, Đường thẳng song song, Tam giác bằng nhau, Đa thức 1 biến.',
            },
            {
              grade: 8 as const,
              title: 'Toán Lớp 8',
              chapters: '10 Chương • 39 Bài',
              topics: 'Hằng đẳng thức, Tứ giác, Thalès, Hàm số bậc nhất, Tam giác đồng dạng, Hình chóp.',
            },
            {
              grade: 9 as const,
              title: 'Toán Lớp 9',
              chapters: '10 Chương • 32 Bài',
              topics: 'Hệ phương trình, Căn thức, Lượng giác, Đường tròn, Định lí Viète, Xác suất.',
            },
          ].map((item) => (
            <button
              key={item.grade}
              type="button"
              onClick={() => onNavigate('thcs_curriculum', { thcsGrade: item.grade })}
              className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-slate-800 transition-all cursor-pointer space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.title}
                </span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                  {item.chapters}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.topics}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <div
          onClick={() => onNavigate('dict_en_vi')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Tra cứu Song song
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Đối chiếu tức thời giữa Từ điển Toán học (KH&KT 1976) và Oxford Mathematics.
          </p>
        </div>

        {/* Pillar 2 */}
        <div
          onClick={() => onNavigate('pdf_archive')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Kho PDF Gốc (1976 & 2026)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Đọc trực tiếp Từ điển 1976 (451 trang) và 4 bộ giáo trình Toán THCS Lớp 6–9.
          </p>
        </div>

        {/* Pillar 3 */}
        <div
          onClick={() => onNavigate('translator')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Dịch Đề & Tài liệu Toán
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Dịch song ngữ tài liệu học thuật toán, bảo toàn công thức LaTeX ($ ... $).
          </p>
        </div>

        {/* Pillar 4 */}
        <div
          onClick={() => onNavigate('practice')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Luyện Phát âm & Từ vựng
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Học thuật ngữ toán học qua Flashcards Leitner và AI chấm điểm phát âm.
          </p>
        </div>
      </section>

      {/* Featured Math Term of the Day Card */}
      {termOfTheDay && (
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800/80 border border-blue-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Thuật ngữ Toán học tiêu biểu
            </span>
            <button
              onClick={() => onSelectTerm(termOfTheDay)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Xem chi tiết đối chiếu
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {termOfTheDay.word}
                </h2>
                <span className="text-xs font-mono text-slate-500">
                  {termOfTheDay.ipaUk}
                </span>
                <PronounceButton text={termOfTheDay.word} accent="en-GB" size="sm" />
              </div>
              <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
                {termOfTheDay.primaryMeaningVi}
              </p>
            </div>

            {termOfTheDay.formulaLatex && (
              <div className="p-3 rounded-xl bg-slate-900 text-yellow-300 font-mono text-xs sm:text-sm border border-slate-700 shadow-inner">
                <code>{termOfTheDay.formulaLatex}</code>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Từ điển KH&KT (1976):
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                {termOfTheDay.khktDefVi || termOfTheDay.primaryMeaningVi}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                Oxford Mathematics:
              </span>
              <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                {termOfTheDay.oxfordDefEn || termOfTheDay.simpleDefinitionEn}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Explore Math Branches Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Các Chuyên ngành Toán học
            </h2>
            <p className="text-xs text-slate-500">
              Khám phá hệ thống thuật ngữ chuyên biệt theo từng nhánh nghiên cứu
            </p>
          </div>
          <button
            onClick={() => onNavigate('disciplines')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Xem tất cả 9 ngành
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {MATH_DISCIPLINES.slice(0, 8).map((disc) => (
            <div
              key={disc.id}
              onClick={() => onNavigate('disciplines', { disciplineId: disc.id })}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: disc.color }}
                />
                <span className="text-[10px] font-bold text-slate-400 font-mono">
                  {disc.abbrevVi}
                </span>
              </div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                {disc.nameVi}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {disc.descriptionVi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Lookups */}
      {history.length > 0 && (
        <section className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Lịch sử tra cứu gần đây:
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate('dict_en_vi', { query: item.query })}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {item.query}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
