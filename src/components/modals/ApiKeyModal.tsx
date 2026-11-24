import React, { useState, useEffect } from 'react';
import {
  X,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Loader2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  ApiKeyStorageMode,
  clearUserApiKey,
  getApiKeyStorageMode,
  getMaskedApiKey,
  getUserApiKey,
  setUserApiKey,
} from '../../services/userApiKeyStorage';
import { ApiService } from '../../services/apiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [storageMode, setStorageMode] = useState<ApiKeyStorageMode>('local');
  const [maskedExisting, setMaskedExisting] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const existing = getUserApiKey();
      setInputKey(existing);
      setMaskedExisting(getMaskedApiKey());
      setStorageMode(getApiKeyStorageMode());
      setShowKey(false);
      setStatusMessage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVerifyAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputKey.trim();
    if (!trimmed) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng dán Gemini API Key của bạn vào ô nhập.',
      });
      return;
    }

    setIsVerifying(true);
    setStatusMessage(null);
    try {
      const result = await ApiService.verifyApiKey(trimmed);
      setUserApiKey(trimmed, storageMode);
      setMaskedExisting(getMaskedApiKey());
      setStatusMessage({
        type: 'success',
        text: `Kết nối thành công${result.model ? ` (${result.model})` : ''}. Đã lưu API Key cá nhân.`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text:
          err?.message ||
          'Không thể xác thực API Key. Vui lòng kiểm tra lại key trong Google AI Studio.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveDirectly = () => {
    const trimmed = inputKey.trim();
    if (!trimmed) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng dán Gemini API Key trước khi lưu.',
      });
      return;
    }
    setUserApiKey(trimmed, storageMode);
    setMaskedExisting(getMaskedApiKey());
    setStatusMessage({
      type: 'success',
      text: 'Đã lưu API Key cá nhân trên trình duyệt.',
    });
  };

  const handleClear = () => {
    clearUserApiKey();
    setInputKey('');
    setMaskedExisting('');
    setStatusMessage({
      type: 'success',
      text: 'Đã xóa API Key khỏi trình duyệt.',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apikey-modal-title"
    >
      <form
        onSubmit={handleVerifyAndSave}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[88vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Compact Fixed Header */}
        <div className="shrink-0 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/80 dark:bg-slate-800/40">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
            <h2
              id="apikey-modal-title"
              className="text-sm font-bold text-slate-900 dark:text-white tracking-tight truncate"
            >
              Gemini API Key cá nhân
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Đóng cửa sổ cấu hình API Key"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {/* Inline Status Row */}
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs">
            <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-500 dark:text-slate-400">Trạng thái:</span>
              <span
                className={`font-semibold ${
                  maskedExisting
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-amber-700 dark:text-amber-400'
                }`}
              >
                {maskedExisting ? 'Đã lưu' : 'Chưa nhập'}
              </span>
              {maskedExisting && (
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  · {maskedExisting}
                </span>
              )}
            </div>
            {maskedExisting && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Trash2 className="w-3 h-3" />
                Xóa
              </button>
            )}
          </div>

          {/* Input Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="gemini-user-api-key"
                className="text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                Nhập Google Gemini API Key
              </label>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
              >
                Lấy key miễn phí
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <input
                id="gemini-user-api-key"
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setStatusMessage(null);
                }}
                placeholder="AIza..."
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-3 pr-9 py-2 text-sm font-mono rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowKey((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md cursor-pointer"
                aria-label={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
                title={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Compact Segmented Storage Mode */}
          <div className="space-y-1">
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Chế độ lưu trên thiết bị
            </span>
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setStorageMode('local')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  storageMode === 'local'
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Lưu trình duyệt
              </button>
              <button
                type="button"
                onClick={() => setStorageMode('session')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  storageMode === 'session'
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Chỉ phiên này
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {storageMode === 'local'
                ? 'Tiện cho máy cá nhân, tự giữ lại khi tải lại trang.'
                : 'An toàn cho máy công cộng, tự động xóa khi đóng tab.'}
            </p>
          </div>

          {/* Feedback Message */}
          {statusMessage && (
            <div
              className={`px-3 py-2 rounded-xl border text-xs flex items-start gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              )}
              <span className="leading-snug">{statusMessage.text}</span>
            </div>
          )}

          {/* Short Privacy Note */}
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2 leading-snug">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              Key chỉ lưu cục bộ trên máy bạn để bật AI (Dịch LaTeX, Phân tích từ, Soạn giảng, Chấm phát âm). Từ điển, Toán THCS 6–9, PDF &amp; phát âm vẫn dùng bình thường không cần key.
            </span>
          </div>
        </div>

        {/* Compact Fixed Footer */}
        <div className="shrink-0 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleSaveDirectly}
            disabled={isVerifying || !inputKey.trim()}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Lưu nhanh
          </button>
          <button
            type="submit"
            disabled={isVerifying || !inputKey.trim()}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Đang kiểm tra...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Kiểm tra &amp; Lưu
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
