import React, { useState } from 'react';
import {
  Clock,
  Trash2,
  Search,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { DictionaryStorage } from '../../services/dictionaryStorage';
import { UserHistoryItem, DictionaryTerm } from '../../types/dictionary';

interface HistoryViewProps {
  onSelectTerm: (term: DictionaryTerm) => void;
  onNavigateSearch: (query: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onSelectTerm,
  onNavigateSearch,
}) => {
  const [historyItems, setHistoryItems] = useState<UserHistoryItem[]>(
    DictionaryStorage.getHistory()
  );
  const [filterType, setFilterType] = useState<'all' | 'search' | 'translation'>('all');

  const handleClearAll = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử tra cứu?')) {
      DictionaryStorage.clearHistory();
      setHistoryItems([]);
    }
  };

  const filtered = historyItems.filter((h) => {
    if (filterType === 'all') return true;
    return h.type === filterType;
  });

  const handleClickItem = (item: UserHistoryItem) => {
    if (item.termId) {
      const term = DictionaryStorage.getTermById(item.termId);
      if (term) {
        onSelectTerm(term);
        return;
      }
    }
    onNavigateSearch(item.query);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-slate-500" />
            Lịch sử tra cứu & Dịch thuật
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ghi nhận các truy vấn tra từ điển và bản dịch gần đây trên thiết bị của bạn.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Xóa lịch sử
          </button>
        )}
      </div>

      {/* Tabs */}
      {historyItems.length > 0 && (
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: `Tất cả (${historyItems.length})` },
            { id: 'search', label: 'Tra từ điển' },
            { id: 'translation', label: 'Bản dịch AI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* History Items List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <Clock className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Chưa có mục lịch sử nào được ghi nhận.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden shadow-xs">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClickItem(item)}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {item.type === 'search' ? (
                    <Search className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {item.query}
                  </h4>
                  {item.details && (
                    <p className="text-xs text-slate-500 line-clamp-1">{item.details}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-slate-400">
                  {new Date(item.timestamp).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
