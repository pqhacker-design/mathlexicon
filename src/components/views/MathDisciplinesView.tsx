import React, { useState, useEffect } from 'react';
import {
  Boxes,
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle2,
  Variable,
  Shapes,
  TrendingUp,
  BarChart2,
  Network,
  Binary,
  Cpu
} from 'lucide-react';
import { DictionaryTerm, MathDisciplineId } from '../../types/dictionary';
import { MATH_DISCIPLINES, getDisciplineById, getGradeLabel } from '../../data/mathDisciplines';
import { PronounceButton } from '../common/PronounceButton';
import { DictionaryStorage } from '../../services/dictionaryStorage';

interface MathDisciplinesViewProps {
  initialDisciplineId?: string;
  onSelectTerm: (term: DictionaryTerm) => void;
  currentGrade: number | 'all';
}

// Icon mapping helper
function renderDisciplineIcon(iconName: string) {
  switch (iconName) {
    case 'Variable': return <Variable className="w-5 h-5" />;
    case 'Shapes': return <Shapes className="w-5 h-5" />;
    case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
    case 'BarChart2': return <BarChart2 className="w-5 h-5" />;
    case 'Network': return <Network className="w-5 h-5" />;
    case 'Boxes': return <Boxes className="w-5 h-5" />;
    case 'Binary': return <Binary className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    default: return <GraduationCap className="w-5 h-5" />;
  }
}

export const MathDisciplinesView: React.FC<MathDisciplinesViewProps> = ({
  initialDisciplineId = 'algebra',
  onSelectTerm,
  currentGrade,
}) => {
  const [activeDisciplineId, setActiveDisciplineId] = useState<string>(initialDisciplineId);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(currentGrade);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (initialDisciplineId) {
      setActiveDisciplineId(initialDisciplineId);
    }
  }, [initialDisciplineId]);

  const activeDiscipline = getDisciplineById(activeDisciplineId) || MATH_DISCIPLINES[0];

  const allTerms = DictionaryStorage.getAllTerms();

  // Filter terms by active discipline
  const disciplineTerms = allTerms.filter((term) => {
    const belongsToDiscipline =
      term.discipline === activeDisciplineId ||
      term.senses.some((s) => s.disciplineId === activeDisciplineId);

    if (!belongsToDiscipline) return false;

    if (selectedGrade !== 'all') {
      const g = Number(selectedGrade);
      const inGrade =
        term.applicableGrades.includes(g) ||
        term.senses.some((s) => s.grades.includes(g));
      if (!inGrade) return false;
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      const inWord = term.word.toLowerCase().includes(q);
      const inMeaning = term.primaryMeaningVi.toLowerCase().includes(q);
      const inKhkt = (term.khktDefVi || '').toLowerCase().includes(q);
      return inWord || inMeaning || inKhkt;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/20 backdrop-blur-xs text-white">
              Phân loại 9 Chuyên ngành
            </span>
            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-500/40 text-blue-100">
              K-12 & Toán Cao Cấp Đại học
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Chuyên ngành Toán học
          </h1>
          <p className="text-blue-100 text-sm max-w-2xl">
            Khám phá thuật ngữ theo từng nhánh: Đại số, Giải tích, Hình học, Xác suất - Thống kê, Tôpô, Toán rời rạc, Toán Tin và Toán ứng dụng.
          </p>
        </div>
      </div>

      {/* Disciplines Horizontal Scroll / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {MATH_DISCIPLINES.map((disc) => {
          const isSelected = disc.id === activeDisciplineId;
          const count = allTerms.filter(
            (t) =>
              t.discipline === disc.id ||
              t.senses.some((s) => s.disciplineId === disc.id)
          ).length;

          return (
            <button
              key={disc.id}
              onClick={() => setActiveDisciplineId(disc.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="p-1.5 rounded-lg text-white"
                  style={{ backgroundColor: disc.color }}
                >
                  {renderDisciplineIcon(disc.icon)}
                </div>
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  {disc.abbrevVi}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 mt-2">
                  {disc.nameVi}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {count} thuật ngữ
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Discipline Content Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Active Discipline Description & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: activeDiscipline.color }}
              />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeDiscipline.nameVi} ({activeDiscipline.nameEn})
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {activeDiscipline.descriptionVi}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search within discipline */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Lọc trong ngành..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Grade level filter */}
            <select
              value={selectedGrade}
              onChange={(e) =>
                setSelectedGrade(
                  e.target.value === 'all' ? 'all' : Number(e.target.value)
                )
              }
              className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả các lớp</option>
              <option value="1">Lớp 1</option>
              <option value="2">Lớp 2</option>
              <option value="3">Lớp 3</option>
              <option value="4">Lớp 4</option>
              <option value="5">Lớp 5</option>
              <option value="6">Lớp 6</option>
              <option value="7">Lớp 7</option>
              <option value="8">Lớp 8</option>
              <option value="9">Lớp 9</option>
              <option value="10">Lớp 10</option>
              <option value="11">Lớp 11</option>
              <option value="12">Lớp 12</option>
              <option value="13">Đại học / Chuyên sâu</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Tìm thấy <strong>{disciplineTerms.length}</strong> thuật ngữ thuộc chuyên ngành này
          </span>
        </div>

        {/* Terms List Grid */}
        {disciplineTerms.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto opacity-50" />
            <p className="text-sm">Không tìm thấy thuật ngữ nào phù hợp với bộ lọc.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {disciplineTerms.map((term) => (
              <div
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-2"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {term.word}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-mono text-slate-500">
                          {term.ipaUk}
                        </span>
                        <PronounceButton text={term.word} accent="en-GB" size="sm" />
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                      {term.wordType}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
                    {term.primaryMeaningVi}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {term.oxfordDefEn || term.simpleDefinitionEn}
                  </p>

                  {/* LaTeX preview if present */}
                  {term.formulaLatex && (
                    <div className="mt-2 p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-blue-700 dark:text-blue-300 truncate">
                      {term.formulaLatex}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{getGradeLabel(term.applicableGrades[0])}</span>
                  {term.khktPage && (
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      Trang {term.khktPage} (1976)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
