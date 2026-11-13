import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones,
  Play,
  Pause,
  Square,
  RotateCcw,
  Download,
  Upload,
  Volume2,
  VolumeX,
  FileText,
  AlertTriangle,
  Sparkles,
  Check,
  Loader2
} from 'lucide-react';
import { ttsService, Accent, VoiceName } from '../../services/ttsService';

export const TextReaderView: React.FC = () => {
  const [text, setText] = useState(
    `In calculus, the derivative measures the instantaneous rate of change of a function with respect to one of its variables. For a quadratic function f(x) = ax^2 + bx + c, the first derivative f'(x) = 2ax + b represents the slope of the tangent line at any point x. Furthermore, by the Fundamental Theorem of Calculus, the definite integral of velocity over a closed interval equals the total displacement. In linear algebra, eigenvalues and eigenvectors characterize the invariant directions of a matrix transformation.`
  );
  const [accent, setAccent] = useState<Accent>('en-US');
  const [voiceName, setVoiceName] = useState<VoiceName>('Kore');
  const [speed, setSpeed] = useState<number>(1.0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(-1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [nonEnglishWarning, setNonEnglishWarning] = useState(false);

  // Split text into sentences for sentence-by-sentence reading and highlight
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const isReadingRef = useRef(isReading);
  isReadingRef.current = isReading;

  // Check for non-English Vietnamese characters
  useEffect(() => {
    const hasVietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
      text
    );
    setNonEnglishWarning(hasVietnameseChars);
  }, [text]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setText(content);
      }
    };
    reader.readAsText(file);
  };

  const stopReading = () => {
    ttsService.stop();
    setIsReading(false);
    setIsPaused(false);
    setCurrentSentenceIndex(-1);
  };

  const readSentence = (index: number): Promise<void> => {
    if (index >= sentences.length || !isReadingRef.current) {
      setIsReading(false);
      setCurrentSentenceIndex(-1);
      return Promise.resolve();
    }

    setCurrentSentenceIndex(index);
    const sentenceText = sentences[index];

    return new Promise((resolve) => {
      ttsService.speak(sentenceText, {
        accent,
        voiceName,
        speed,
        onEnd: () => {
          if (isReadingRef.current) {
            // Read next sentence after small pause
            setTimeout(() => {
              readSentence(index + 1).then(resolve);
            }, 300);
          } else {
            resolve();
          }
        },
        onError: () => {
          setIsReading(false);
          resolve();
        },
      });
    });
  };

  const startReading = async () => {
    if (isPaused) {
      ttsService.resume();
      setIsPaused(false);
      setIsReading(true);
      return;
    }

    stopReading();
    if (sentences.length === 0) return;

    setIsReading(true);
    isReadingRef.current = true;
    const startIndex = currentSentenceIndex >= 0 ? currentSentenceIndex : 0;
    await readSentence(startIndex);
  };

  const pauseReading = () => {
    ttsService.pause();
    setIsPaused(true);
    setIsReading(false);
  };

  const replayCurrentSentence = () => {
    if (currentSentenceIndex >= 0 && currentSentenceIndex < sentences.length) {
      ttsService.stop();
      ttsService.speak(sentences[currentSentenceIndex], {
        accent,
        voiceName,
        speed,
      });
    }
  };

  const handleDownloadFullAudio = async () => {
    setIsDownloading(true);
    try {
      const success = await ttsService.downloadWav(
        text,
        accent,
        voiceName,
        `EduLexicon_Audio_${accent}.wav`
      );
      if (!success) {
        alert('Không thể tạo file âm thanh lúc này, vui lòng thử lại.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Headphones className="w-6 h-6 text-rose-600" />
            Đọc văn bản tiếng Anh – Text to Speech (TTS)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hệ thống phát âm tự nhiên chất lượng cao, đồng bộ câu đọc karaoke, hỗ trợ văn bản dài, chuẩn giọng Anh (UK) và Mỹ (US).
          </p>
        </div>

        {/* Toolbar Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          {/* Accent Selector */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Chất giọng & Vùng miền
            </label>
            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value as Accent)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden"
            >
              <option value="en-US">Anh – Mỹ (American en-US)</option>
              <option value="en-GB">Anh – Anh (British en-GB)</option>
            </select>
          </div>

          {/* Voice Personality */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Giọng đọc (Studio Voice)
            </label>
            <select
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value as VoiceName)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden"
            >
              <option value="Kore">Kore (Giọng nữ ấm áp, chuẩn học thuật)</option>
              <option value="Puck">Puck (Giọng nam trầm, rõ ràng, dứt khoát)</option>
              <option value="Zephyr">Zephyr (Giọng nữ nhẹ nhàng, truyền cảm)</option>
              <option value="Fenrir">Fenrir (Giọng nam mạnh mẽ, bài giảng)</option>
            </select>
          </div>

          {/* Speed Selector */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Tốc độ đọc
            </label>
            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-semibold focus:outline-hidden"
            >
              <option value={0.75}>0.75x (Chế độ đọc chậm cho học sinh)</option>
              <option value={1.0}>1.0x (Tốc độ chuẩn tự nhiên)</option>
              <option value={1.25}>1.25x (Tốc độ nâng cao)</option>
              <option value={1.5}>1.5x (Luyện nghe nhanh)</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Nhập từ tệp văn bản
            </label>
            <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer font-medium">
              <Upload className="w-3.5 h-3.5" />
              <span>Tải file TXT / DOC</span>
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Warning if Vietnamese text detected */}
        {nonEnglishWarning && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Phát hiện ký tự tiếng Việt trong văn bản. Bộ đọc tiếng Anh có thể phát âm không chính xác đối với các từ tiếng Việt.
            </span>
          </div>
        )}
      </div>

      {/* Editor & Synchronized Karaoke Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor Box */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Khung nhập văn bản tiếng Anh
            </span>
            <button
              onClick={() => setText('')}
              className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              Xóa hết
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Dán hoặc nhập đoạn văn tiếng Anh vào đây..."
            className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden text-sm sm:text-base resize-y leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
            <span>{sentences.length} câu • {text.split(/\s+/).filter(Boolean).length} từ</span>
            <button
              onClick={() =>
                setText(
                  'Mathematics is an area of knowledge that includes the topics of numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes. Most mathematical activity involves the discovery of properties of abstract objects.'
                )
              }
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Dùng văn bản mẫu Toán học
            </button>
          </div>
        </div>

        {/* Synchronized Karaoke Reader Display */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
            <span className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" />
              Đồng bộ câu đọc (Karaoke Highlighting)
            </span>

            {currentSentenceIndex >= 0 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                Câu {currentSentenceIndex + 1} / {sentences.length}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto max-h-[300px] p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 text-sm leading-relaxed space-y-2">
            {sentences.length === 0 ? (
              <p className="text-slate-400 text-xs italic text-center py-10">
                Chưa có văn bản để đọc. Hãy nhập nội dung ở khung bên trái.
              </p>
            ) : (
              sentences.map((sent, idx) => {
                const isCurrent = currentSentenceIndex === idx;
                return (
                  <span
                    key={idx}
                    onClick={() => {
                      setCurrentSentenceIndex(idx);
                      ttsService.stop();
                      ttsService.speak(sent, { accent, voiceName, speed });
                    }}
                    className={`inline px-1 py-0.5 rounded transition-colors cursor-pointer mr-1.5 ${
                      isCurrent
                        ? 'bg-rose-200 text-rose-950 dark:bg-rose-900 dark:text-white font-semibold shadow-xs'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                    title="Bấm để nghe câu này"
                  >
                    {sent}{' '}
                  </span>
                );
              })
            )}
          </div>

          {/* Audio Controls Bar */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {!isReading ? (
                <button
                  type="button"
                  onClick={startReading}
                  disabled={!text.trim()}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPaused ? 'Tiếp tục đọc' : 'Bắt đầu đọc'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseReading}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Tạm dừng</span>
                </button>
              )}

              <button
                type="button"
                onClick={stopReading}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Dừng hẳn"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={replayCurrentSentence}
                disabled={currentSentenceIndex < 0}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 disabled:opacity-40 text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Nghe lại câu hiện tại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Download audio */}
            <button
              type="button"
              onClick={handleDownloadFullAudio}
              disabled={isDownloading || !text.trim()}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang tải audio...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải âm thanh WAV</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
