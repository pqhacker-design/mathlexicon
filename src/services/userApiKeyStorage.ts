export const USER_API_KEY_HEADER = 'X-Gemini-Api-Key';

const LOCAL_STORAGE_KEY = 'mathlexicon_user_gemini_api_key';
const SESSION_STORAGE_KEY = 'mathlexicon_user_gemini_api_key_session';

const API_KEY_CHANGED_EVENT = 'mathlexicon_apikey_changed';
const OPEN_API_KEY_MODAL_EVENT = 'mathlexicon_open_apikey_modal';

export type ApiKeyStorageMode = 'local' | 'session';

export function getUserApiKey(): string {
  try {
    const sessionKey = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionKey && sessionKey.trim()) {
      return sessionKey.trim();
    }
    const localKey = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localKey && localKey.trim()) {
      return localKey.trim();
    }
  } catch {
    // Ignore storage access restrictions
  }
  return '';
}

export function getApiKeyStorageMode(): ApiKeyStorageMode {
  try {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
      return 'session';
    }
  } catch {
    // Ignore
  }
  return 'local';
}

export function hasUserApiKey(): boolean {
  return getUserApiKey().length > 0;
}

export function getMaskedApiKey(): string {
  const key = getUserApiKey();
  if (!key) return '';
  if (key.length <= 10) return '••••••••';
  return `${key.slice(0, 6)}••••••••${key.slice(-4)}`;
}

export function setUserApiKey(rawKey: string, mode: ApiKeyStorageMode = 'local'): void {
  const trimmed = rawKey.trim();
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    if (trimmed) {
      if (mode === 'session') {
        sessionStorage.setItem(SESSION_STORAGE_KEY, trimmed);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
      }
    }
  } catch {
    // Ignore storage access restrictions
  }
  window.dispatchEvent(new CustomEvent(API_KEY_CHANGED_EVENT));
}

export function clearUserApiKey(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Ignore
  }
  window.dispatchEvent(new CustomEvent(API_KEY_CHANGED_EVENT));
}

export function subscribeApiKeyChange(listener: () => void): () => void {
  window.addEventListener(API_KEY_CHANGED_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(API_KEY_CHANGED_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

export function requestOpenApiKeyModal(): void {
  window.dispatchEvent(new CustomEvent(OPEN_API_KEY_MODAL_EVENT));
}

export function subscribeOpenApiKeyModal(listener: () => void): () => void {
  window.addEventListener(OPEN_API_KEY_MODAL_EVENT, listener);
  return () => {
    window.removeEventListener(OPEN_API_KEY_MODAL_EVENT, listener);
  };
}
