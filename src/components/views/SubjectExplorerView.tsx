import React, { useState, useEffect } from 'react';
import {
  Layers,
  GraduationCap,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Atom,
  Binary,
  Calculator,
  Zap,
  FlaskConical,
  Dna
} from 'lucide-react';
import { DictionaryTerm } from '../../types/dictionary';
import { SUBJECTS, getSubjectById, getGradeLabel } from '../../data/subjects';
import { PronounceButton } from '../common/PronounceButton';
import { DictionaryStorage } from '../../services/dictionaryStorage';

interface SubjectExplorerViewProps {
  initialSubjectId?: string;
  onSelectTerm: (term: DictionaryTerm) => void;
  currentGrade: number | 'all';
}

export const SubjectExplorerView: React.FC<SubjectExplorerViewProps> = ({
  initialSubjectId = 'math',
  onSelectTerm,
  currentGrade,
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<string>(initialSubjectId);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'natural' | 'social' | 'arts_physical' | 'cross_discipline'>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(currentGrade);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (initialSubjectId) {
      setActiveSubjectId(initialSubjectId);
    }
  }, [initialSubjectId]);

  const activeSubject = getSubjectById(activeSubjectId) || SUBJECTS[0];

  const filteredSubjects = SUBJECTS.filter((s) => {
    if (categoryFilter === 'all') return true;
    return s.category === categoryFilter;
  });

  const allTerms = DictionaryStorage.getAllTerms();

  // Filter terms by the active subject
  const subjectTerms = allTerms.filter((term) => {
    const belongsToSubject =
      term.primarySubjectId === activeSubjectId ||
      term.senses.some((s) => s.subjectId === activeSubjectId);

    if (!belongsToSubject) return false;

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
      return inWord || inMeaning;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div
        className="p-6 sm:p-8 rounded-3xl border text-white shadow-lg space-y-3 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${activeSubject.color} 0%, #1E293B 100%)`,
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md">
            Chuyên ngành: {activeSubject.nameEn}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Từ điển {activeSubject.nameVi}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeSubject.descriptionVi}. Tổng hợp các định nghĩa thuật ngữ, công thức, ký hiệu khoa học và chuẩn phát âm.
          </p>
        </div>
      </div>

      {/* Category Pills & Subject Buttons */}
      <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Nhóm môn học:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'Tất cả 19 môn' },
              { id: 'natural', label: 'Khoa học tự nhiên' },
              { id: 'social', label: 'Khoa học xã hội' },
              { id: 'arts_physical', label: 'Nghệ thuật & Thể chất' },
              { id: 'cross_discipline', label: 'Liên môn & Hoạt động' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  categoryFilter === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal scrollable subjects bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {filteredSubjects.map((sub) => {
            const isSelected = sub.id === activeSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubjectId(sub.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: sub.color }}
                />
                <span>{sub.nameVi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and In-Subject Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Tìm kiếm thuật ngữ trong môn ${activeSubject.nameVi}...`}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Lớp:</span>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-hidden"
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

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectTerms.map((term) => {
          // Find sense corresponding to this subject
          const matchedSense =
            term.senses.find((s) => s.subjectId === activeSubjectId) || term.senses[0];

          return (
            <div
              key={term.id}
              onClick={() => onSelectTerm(term)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {term.word}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {matchedSense.meaningVi}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <PronounceButton text={term.word} accent="en-US" size="sm" />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                    Định nghĩa chuyên ngành:
                  </span>
                  <p className="line-clamp-2">{matchedSense.disciplineExplanationVi}</p>
                </div>

                {matchedSense.formulaLatex && (
                  <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-xs font-mono text-blue-700 dark:text-blue-300">
                    <code>{matchedSense.formulaLatex}</code>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Lớp {matchedSense.grades.join(', ')}
                </span>
                <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Chi tiết thuật ngữ →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
