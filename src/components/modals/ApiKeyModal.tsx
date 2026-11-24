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
        text: `Kết nối thành công${result.model ? ` (${result.model})` : ''}. API Key cá nhân của bạn đã được lưu an toàn trên thiết bị này.`,
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
      text: 'Đã lưu API Key cá nhân trên trình duyệt của bạn.',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apikey-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="apikey-modal-title"
                className="text-base font-bold text-slate-900 dark:text-white tracking-tight"
              >
                Cấu hình Gemini API Key cá nhân
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ứng dụng không dùng key chung — mỗi người dùng sử dụng key riêng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ cấu hình API Key"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleVerifyAndSave} className="p-6 space-y-5">
          {/* Current Status */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 min-w-0">
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                Trạng thái hiện tại:{' '}
                <span
                  className={
                    maskedExisting
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-amber-700 dark:text-amber-400'
                  }
                >
                  {maskedExisting ? 'Đã cấu hình API Key cá nhân' : 'Chưa nhập API Key'}
                </span>
              </div>
              {maskedExisting && (
                <div className="font-mono text-slate-500 dark:text-slate-400 truncate">
                  {maskedExisting} ·{' '}
                  {storageMode === 'session' ? 'Chỉ lưu phiên hiện tại' : 'Lưu trên trình duyệt'}
                </div>
              )}
            </div>
            {maskedExisting && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa key
              </button>
            )}
          </div>

          {/* Input Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="gemini-user-api-key"
              className="block text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              Google Gemini API Key của bạn
            </label>
            <div className="relative">
              <input
                id="gemini-user-api-key"
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setStatusMessage(null);
                }}
                placeholder="Dán API Key bắt đầu bằng AIza..."
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-3.5 pr-10 py-2.5 text-sm font-mono rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowKey((prev) => !prev)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg cursor-pointer"
                aria-label={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
                title={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              <span>Chưa có key? Tạo miễn phí tại Google AI Studio:</span>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
              >
                Lấy API Key
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Storage Scope Choice */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Chế độ lưu trữ trên thiết bị
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStorageMode('local')}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                  storageMode === 'local'
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold">Lưu trên trình duyệt</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Tiện cho máy cá nhân, giữ lại khi tải lại trang.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStorageMode('session')}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                  storageMode === 'session'
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold">Chỉ lưu phiên hiện tại</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  An toàn cho máy công cộng, tự xóa khi đóng tab.
                </div>
              </button>
            </div>
          </div>

          {/* Feedback Message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Privacy & Feature Scope Note */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Quyền riêng tư & Phạm vi sử dụng</span>
            </div>
            <p>
              API Key chỉ lưu cục bộ trên trình duyệt của bạn, không lưu vào cơ sở dữ liệu máy chủ và chỉ được gửi kèm khi bạn gọi các tính năng AI (Dịch đề bài LaTeX, AI Thẩm định thuật ngữ, AI Soạn giảng THCS, AI Chấm phát âm).
            </p>
            <p>
              Các mục <strong>Từ điển Toán KH&amp;KT &amp; Oxford, Chương trình Toán THCS Lớp 6–9, Kho PDF gốc, Flashcard và Đọc phát âm chuẩn</strong> vẫn hoạt động bình thường mà không cần API Key.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleSaveDirectly}
              disabled={isVerifying || !inputKey.trim()}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Lưu không kiểm tra
            </button>
            <button
              type="submit"
              disabled={isVerifying || !inputKey.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Đang kiểm tra...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Kiểm tra &amp; Lưu API Key
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
