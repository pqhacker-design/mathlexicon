import React, { useState } from 'react';
import { Volume2, VolumeX, Download, Loader2 } from 'lucide-react';
import { ttsService, Accent } from '../../services/ttsService';

interface PronounceButtonProps {
  text: string;
  accent?: Accent;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showDownload?: boolean;
  className?: string;
}

export const PronounceButton: React.FC<PronounceButtonProps> = ({
  text,
  accent = 'en-US',
  size = 'md',
  label,
  showDownload = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      await ttsService.speak(text, {
        accent,
        speed,
        onStart: () => {
          setIsLoading(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
        onError: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
      });
    } catch {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanName = text.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20) + `_${accent}.wav`;
    await ttsService.downloadWav(text, accent, accent === 'en-GB' ? 'Kore' : 'Puck', cleanName);
  };

  const isUk = accent === 'en-GB';
  const badgeColor = isUk
    ? 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900'
    : 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900';

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-2.5 py-1.5 gap-1.5',
    lg: 'text-base px-3.5 py-2 gap-2',
  }[size];

  return (
    <div className={`inline-flex items-center gap-1 ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={handlePlay}
        disabled={isLoading}
        className={`inline-flex items-center font-medium rounded-lg border transition-all duration-150 active:scale-95 cursor-pointer shadow-xs ${badgeColor} ${sizeClasses}`}
        title={`Nghe phát âm chuẩn ${isUk ? 'Anh - Anh (UK)' : 'Anh - Mỹ (US)'} - ${speed}x`}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isPlaying ? (
          <span className="flex items-center gap-1">
            <VolumeX className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            <span className="flex items-center gap-0.5">
              <span className="w-1 h-2.5 bg-current animate-bounce rounded-full" />
              <span className="w-1 h-3.5 bg-current animate-bounce rounded-full delay-75" />
              <span className="w-1 h-2 bg-current animate-bounce rounded-full delay-150" />
            </span>
          </span>
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
        <span className="font-semibold">{label || (isUk ? 'UK' : 'US')}</span>
      </button>

      {/* Speed Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
          className="text-[11px] font-mono px-1.5 py-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          title="Tốc độ đọc"
        >
          {speed}x
        </button>

        {showSpeedMenu && (
          <div className="absolute right-0 bottom-full mb-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30 flex flex-col w-20 text-xs">
            {[0.75, 1.0, 1.25, 1.5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSpeed(s);
                  setShowSpeedMenu(false);
                }}
                className={`px-3 py-1 text-left hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer ${
                  speed === s ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {s}x {s === 1.0 && '(Chuẩn)'}
              </button>
            ))}
          </div>
        )}
      </div>

      {showDownload && (
        <button
          type="button"
          onClick={handleDownload}
          className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          title="Tải file âm thanh WAV"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
