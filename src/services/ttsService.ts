export type Accent = 'en-GB' | 'en-US';
export type VoiceName = 'Kore' | 'Puck' | 'Zephyr' | 'Fenrir' | 'Charon';

export interface TTSOptions {
  accent?: Accent;
  speed?: number; // 0.75, 1.0, 1.25, 1.5
  voiceName?: VoiceName;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  preferGeminiNeural?: boolean;
}

interface CachedAudio {
  audioBase64: string;
  mimeType: string;
}

// In-memory cache for audio base64 data to save quota and provide instant replay
const audioCache = new Map<string, CachedAudio>();

class TTSService {
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private isPaused = false;

  // Speak text using Gemini / Cloud Neural TTS with automatic Web Speech API fallback
  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    const {
      accent = 'en-US',
      speed = 1.0,
      voiceName = accent === 'en-GB' ? 'Kore' : 'Puck',
      onStart,
      onEnd,
      onError,
      preferGeminiNeural = true,
    } = options;

    this.stop();
    const cleanText = text.trim();
    if (!cleanText) return;

    const cacheKey = `${accent}_${voiceName}_${speed}_${cleanText}`;

    if (preferGeminiNeural) {
      try {
        const cached = audioCache.get(cacheKey);
        if (cached) {
          await this.playBase64Audio(cached.audioBase64, cached.mimeType, speed, onStart, onEnd, onError);
          return;
        }

        const res = await fetch('/api/gemini/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: cleanText,
            accent,
            voiceName,
            speed,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.fallbackToWebSpeech) {
            this.speakWithWebSpeech(cleanText, accent, speed, onStart, onEnd, onError);
            return;
          }

          if (typeof data.audioBase64 === 'string') {
            const mimeType = data.mimeType || 'audio/mp3';
            audioCache.set(cacheKey, { audioBase64: data.audioBase64, mimeType });
            await this.playBase64Audio(data.audioBase64, mimeType, speed, onStart, onEnd, onError);
            return;
          }
        }
      } catch (err) {
        console.warn('Neural TTS unavailable, falling back to Web Speech API:', err);
      }
    }

    // Fallback: Web Speech API
    this.speakWithWebSpeech(cleanText, accent, speed, onStart, onEnd, onError);
  }

  // Play base64 audio (MP3 or WAV)
  private playBase64Audio(
    base64Audio: string,
    mimeType: string,
    speed: number,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): Promise<void> {
    return new Promise((resolve) => {
      try {
        const audio = new Audio(`data:${mimeType || 'audio/mp3'};base64,${base64Audio}`);
        audio.playbackRate = speed;
        this.currentAudio = audio;
        this.isSpeaking = true;

        audio.onplay = () => {
          onStart?.();
        };

        audio.onended = () => {
          this.isSpeaking = false;
          this.currentAudio = null;
          onEnd?.();
          resolve();
        };

        audio.onerror = (e) => {
          this.isSpeaking = false;
          this.currentAudio = null;
          onError?.(e);
          resolve();
        };

        audio.play().catch((err) => {
          console.warn('Audio play interrupted or prevented by browser:', err);
          this.isSpeaking = false;
          this.currentAudio = null;
          resolve();
        });
      } catch (err) {
        onError?.(err);
        resolve();
      }
    });
  }

  // Web Speech API fallback
  private speakWithWebSpeech(
    text: string,
    accent: Accent,
    speed: number,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (!('speechSynthesis' in window)) {
      onError?.(new Error('Trình duyệt không hỗ trợ Web Speech API.'));
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent === 'en-GB' ? 'en-GB' : 'en-US';
    utterance.rate = speed;

    // Pick best available browser voice for the selected accent
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => {
      const vLang = v.lang.replace('_', '-');
      return accent === 'en-GB' ? vLang.includes('en-GB') || v.name.includes('UK') || v.name.includes('British') : vLang.includes('en-US') || v.name.includes('US') || v.name.includes('United States');
    });

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
  }

  // Pause playback
  pause(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isPaused = true;
    } else if (window.speechSynthesis?.speaking) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  // Resume playback
  resume(): void {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play();
      this.isPaused = false;
    } else if (window.speechSynthesis?.paused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  // Stop everything
  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
  }

  getSpeakingStatus(): { isSpeaking: boolean; isPaused: boolean } {
    return { isSpeaking: this.isSpeaking, isPaused: this.isPaused };
  }

  // Download audio as file (MP3/WAV)
  async downloadWav(
    text: string,
    accent: Accent = 'en-US',
    voiceName: VoiceName = 'Kore',
    filename = 'pronunciation.wav'
  ): Promise<boolean> {
    try {
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          accent,
          voiceName,
        }),
      });

      if (!res.ok) throw new Error('Không thể tải file âm thanh từ server');

      const data = await res.json();
      if (!data.audioBase64) {
        if (data.fallbackToWebSpeech) {
          alert('Chức năng tải file ngoại tuyến yêu cầu Google Cloud Speech API. Hiện tại hệ thống đang phát âm trực tiếp chuẩn qua trình duyệt.');
          return false;
        }
        throw new Error('Dữ liệu âm thanh rỗng');
      }

      const mimeType = data.mimeType || 'audio/mp3';
      const ext = mimeType.includes('wav') ? '.wav' : '.mp3';
      let targetFilename = filename;
      if (!targetFilename.toLowerCase().endsWith(ext)) {
        targetFilename = targetFilename.replace(/\.(wav|mp3)$/i, '') + ext;
      }

      // Convert base64 to Blob
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = targetFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    } catch (e) {
      console.warn('Download audio error:', e);
      return false;
    }
  }
}

export const ttsService = new TTSService();
