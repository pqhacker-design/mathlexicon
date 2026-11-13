import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  GraduationCap,
  Sparkles,
  AlertCircle,
  FileText,
  Compass,
  Code
} from 'lucide-react';
import { DictionaryTerm, WordType } from '../../types/dictionary';
import { MATH_DISCIPLINES, getDisciplineById, getGradeLabel } from '../../data/mathDisciplines';
import { PronounceButton } from '../common/PronounceButton';
import { DictionaryStorage } from '../../services/dictionaryStorage';

interface DictionaryViewProps {
  initialQuery?: string;
  initialDisciplineId?: string;
  currentGrade: number | 'all';
  onSelectTerm: (term: DictionaryTerm) => void;
  onSelectWord?: (word: string) => void;
  onOpenPdfPage?: (page: number) => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  initialQuery = '',
  initialDisciplineId = 'all',
  currentGrade,
  onSelectTerm,
  onOpenPdfPage,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedDiscipline, setSelectedDiscipline] = useState(initialDisciplineId);
  const [selectedWordType, setSelectedWordType] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(currentGrade);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialDisciplineId) {
      setSelectedDiscipline(initialDisciplineId);
    }
  }, [initialDisciplineId]);

  useEffect(() => {
    setSelectedGrade(currentGrade);
  }, [currentGrade]);

  const searchResult = DictionaryStorage.search(query, {
    disciplineId: selectedDiscipline !== 'all' ? selectedDiscipline : undefined,
    grade: selectedGrade !== 'all' ? (selectedGrade as number) : undefined,
    wordType: selectedWordType !== 'all' ? (selectedWordType as WordType) : undefined,
  });

  const terms = searchResult.terms;
  const isFuzzy = searchResult.isFuzzy;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Search Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Song song 2 nguồn học thuật
            </span>
            <span className="text-xs text-slate-500">
              KH&KT (1976) • Oxford Mathematics
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" />
            Từ điển Toán học Anh – Việt Chuyên sâu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tra cứu thuật ngữ toán học từ lớp 1 đến lớp 12 và toán đại học, chuẩn phát âm UK/US, công thức LaTeX và đối chiếu từ điển kinh điển 1976.
          </p>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập thuật ngữ toán (derivative, integral, matrix, eigenvalue, fraction, vector)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Discipline selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Phân ngành Toán học:
            </label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả các ngành toán</option>
              {MATH_DISCIPLINES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nameVi} ({d.abbrevVi})
                </option>
              ))}
            </select>
          </div>

          {/* Grade level selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Cấp học / Trình độ:
            </label>
            <select
              value={selectedGrade}
              onChange={(e) =>
                setSelectedGrade(
                  e.target.value === 'all' ? 'all' : Number(e.target.value)
                )
              }
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả các cấp lớp</option>
              <option value="1">Tiểu học • Lớp 1-3</option>
              <option value="4">Tiểu học • Lớp 4-5</option>
              <option value="6">THCS • Lớp 6-7</option>
              <option value="8">THCS • Lớp 8-9</option>
              <option value="10">THPT • Lớp 10</option>
              <option value="11">THPT • Lớp 11</option>
              <option value="12">THPT • Lớp 12</option>
              <option value="13">Toán Đại học / Chuyên sâu</option>
            </select>
          </div>

          {/* Word type filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Từ loại:
            </label>
            <select
              value={selectedWordType}
              onChange={(e) => setSelectedWordType(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả từ loại</option>
              <option value="noun">Danh từ (Noun)</option>
              <option value="verb">Động từ (Verb)</option>
              <option value="adjective">Tính từ (Adjective)</option>
              <option value="phrase">Cụm từ (Phrase)</option>
              <option value="symbol">Ký hiệu (Symbol)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fuzzy search notice */}
      {isFuzzy && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            Không tìm thấy từ chính xác cho "<strong>{query}</strong>". Đang hiển thị các thuật ngữ toán học có chính tả gần giống nhất:
          </span>
        </div>
      )}

      {/* Result counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Hiển thị <strong>{terms.length}</strong> thuật ngữ phù hợp
        </span>
      </div>

      {/* Terms Grid */}
      {terms.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <Search className="w-10 h-10 mx-auto opacity-40" />
          <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
            Không tìm thấy thuật ngữ nào phù hợp
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Thử tìm kiếm với từ tiếng Anh, từ tiếng Việt không dấu, hoặc chọn "Tất cả các ngành toán".
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
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2.5">
                  {/* Top line: Word, IPA, badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {term.word}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-slate-500">
                          {term.ipaUk}
                        </span>
                        <PronounceButton text={term.word} accent="en-GB" size="sm" />
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        {term.wordType}
                      </span>
                      {disc && (
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          {disc.abbrevVi}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Meaning */}
                  <p className="text-base font-bold text-blue-600 dark:text-blue-400">
                    {term.primaryMeaningVi}
                  </p>

                  {/* Dual citation snippets */}
                  <div className="space-y-1.5 text-xs">
                    {/* KH&KT snippet */}
                    <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 shrink-0">
                        KH&KT 1976
                      </span>
                      <span className="line-clamp-1">
                        {term.khktDefVi || term.primaryMeaningVi}
                      </span>
                    </div>

                    {/* Oxford definition */}
                    <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 shrink-0">
                        Oxford
                      </span>
                      <span className="line-clamp-2">
                        {term.oxfordDefEn || term.simpleDefinitionEn}
                      </span>
                    </div>
                  </div>

                  {/* LaTeX preview if present */}
                  {term.formulaLatex && (
                    <div className="p-2 rounded-lg bg-slate-900 text-yellow-300 font-mono text-xs overflow-x-auto">
                      <code>{term.formulaLatex}</code>
                    </div>
                  )}
                </div>

                {/* Footer metadata */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {getGradeLabel(term.applicableGrades[0])}
                  </span>

                  {term.khktPage && (
                    <span className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      Xem trang scan {term.khktPage} (1976) →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
