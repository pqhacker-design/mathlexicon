import React, { useState } from 'react';
import {
  Star,
  Trash2,
  Download,
  BookOpen,
  Volume2,
  Search,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { DictionaryTerm } from '../../types/dictionary';
import { DictionaryStorage } from '../../services/dictionaryStorage';
import { PronounceButton } from '../common/PronounceButton';
import { getDisciplineById, getGradeLabel } from '../../data/mathDisciplines';

interface FavoritesViewProps {
  onSelectTerm: (term: DictionaryTerm) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ onSelectTerm }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const favItems = DictionaryStorage.getFavorites();
  const allTerms = DictionaryStorage.getAllTerms();

  const favoriteTerms: DictionaryTerm[] = favItems
    .map((f) => allTerms.find((t) => t.id === f.termId))
    .filter((t): t is DictionaryTerm => t !== undefined);

  const filteredFavorites = favoriteTerms.filter((t) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      t.word.toLowerCase().includes(q) ||
      t.primaryMeaningVi.toLowerCase().includes(q)
    );
  });

  const handleRemoveFavorite = (e: React.MouseEvent, termId: string) => {
    e.stopPropagation();
    DictionaryStorage.toggleFavorite(termId);
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleExportCsv = () => {
    if (favoriteTerms.length === 0) return;
    const headers = ['Từ tiếng Anh', 'Phiên âm', 'Nghĩa tiếng Việt', 'Môn học'];
    const rows = favoriteTerms.map((t) => [
      `"${t.word}"`,
      `"${t.ipaUs}"`,
      `"${t.primaryMeaningVi}"`,
      `"${t.primarySubjectId}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TuVungYeuThich_EduLexicon_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Từ vựng yêu thích & Đã lưu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách các thuật ngữ được đánh dấu sao để ôn tập định kỳ ({favoriteTerms.length} từ).
          </p>
        </div>

        {favoriteTerms.length > 0 && (
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <Download className="w-4 h-4" />
            Xuất danh sách (CSV)
          </button>
        )}
      </div>

      {/* Filter */}
      {favoriteTerms.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Lọc từ vựng trong danh sách yêu thích..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-hidden"
          />
        </div>
      )}

      {/* List */}
      {favoriteTerms.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <Star className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            Chưa có từ vựng nào trong danh sách yêu thích
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Khi tra cứu từ điển, hãy bấm vào biểu tượng ngôi sao để lưu lại các thuật ngữ cần học.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFavorites.map((term) => {
            const disc = getDisciplineById(term.discipline || 'algebra');
            return (
              <div
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {term.word}
                      </h3>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {term.primaryMeaningVi}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleRemoveFavorite(e, term.id)}
                      className="p-1.5 text-amber-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Bỏ khỏi yêu thích"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {term.simpleDefinitionEn}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <div className="flex items-center gap-1.5">
                    <PronounceButton text={term.word} accent="en-US" size="sm" />
                    <span className="text-mono text-slate-400 text-[11px]">
                      {term.ipaUs}
                    </span>
                  </div>

                  {disc && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: disc.bgLight, color: disc.color }}
                    >
                      {disc.nameVi}
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
