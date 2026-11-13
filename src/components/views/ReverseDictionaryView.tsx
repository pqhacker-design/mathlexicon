import React, { useState } from 'react';
import {
  Languages,
  Search,
  X,
  GraduationCap,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { DictionaryTerm } from '../../types/dictionary';
import { MATH_DISCIPLINES, getDisciplineById, getGradeLabel } from '../../data/mathDisciplines';
import { PronounceButton } from '../common/PronounceButton';
import { DictionaryStorage } from '../../services/dictionaryStorage';

interface ReverseDictionaryViewProps {
  onSelectTerm: (term: DictionaryTerm) => void;
}

export const ReverseDictionaryView: React.FC<ReverseDictionaryViewProps> = ({
  onSelectTerm,
}) => {
  const [viQuery, setViQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');

  const terms = DictionaryStorage.searchVietnamese(
    viQuery,
    selectedDiscipline !== 'all' ? selectedDiscipline : undefined
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Search Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Languages className="w-6 h-6 text-teal-600" />
            Từ điển Toán học Việt – Anh Chuyên sâu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tra cứu từ khái niệm toán học tiếng Việt để tìm thuật ngữ tiếng Anh học thuật chuẩn xác tương ứng trong từ điển KH&KT và Oxford.
          </p>
        </div>

        {/* Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={viQuery}
            onChange={(e) => setViQuery(e.target.value)}
            placeholder="Nhập khái niệm tiếng Việt (đạo hàm, tích phân, ma trận, giá trị riêng, phân số, định lý Pytago, tiệm cận)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
          {viQuery && (
            <button
              onClick={() => setViQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Discipline Filter & Quick tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Lọc theo ngành:
            </span>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả ngành toán</option>
              {MATH_DISCIPLINES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nameVi} ({d.abbrevVi})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span>Gợi ý:</span>
            {['đạo hàm', 'tích phân', 'ma trận', 'giá trị riêng', 'phân số', 'tiệm cận', 'tôpô'].map((tag) => (
              <button
                key={tag}
                onClick={() => setViQuery(tag)}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 hover:text-teal-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Tìm thấy <strong>{terms.length}</strong> thuật ngữ đối ứng tiếng Anh
        </span>
      </div>

      {/* Terms Grid */}
      {terms.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <BookOpen className="w-10 h-10 mx-auto opacity-40" />
          <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
            Không tìm thấy thuật ngữ nào
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy thử tìm bằng từ tiếng Việt có dấu hoặc không dấu (ví dụ: "dao ham", "tich phan", "ma tran").
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((term) => {
            const disc = getDisciplineById(term.discipline || 'algebra');

            return (
              <div
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                        Khái niệm tiếng Việt:
                      </span>
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-0.5">
                        {term.primaryMeaningVi}
                      </h3>
                    </div>

                    {disc && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
                        {disc.abbrevVi}
                      </span>
                    )}
                  </div>

                  {/* English Equivalent Box */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Thuật ngữ tiếng Anh tương ứng:
                      </span>
                      <span className="font-extrabold text-base text-blue-600 dark:text-blue-400 group-hover:underline">
                        {term.word}
                      </span>
                      <span className="text-xs font-mono text-slate-500 ml-2">
                        {term.ipaUk}
                      </span>
                    </div>

                    <PronounceButton text={term.word} accent="en-GB" size="sm" />
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {term.oxfordDefEn || term.simpleDefinitionEn}
                  </p>

                  {/* LaTeX preview */}
                  {term.formulaLatex && (
                    <div className="p-2 rounded-lg bg-slate-900 text-yellow-300 font-mono text-xs overflow-x-auto">
                      <code>{term.formulaLatex}</code>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {getGradeLabel(term.applicableGrades[0])}
                  </span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Chi tiết & Sách 1976
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
