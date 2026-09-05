export const STORAGE_KEY = 'go-by-example-progress-v1';
export const PROGRESS_EVENT = 'go-by-example-progress-updated';

export type Progress = Record<string, true>;

export function readProgress(): Progress {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Progress) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: Progress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function isGoRoute(pathname: string) {
  return /^\/(?:en\/|es\/)?go(?:\/|$)/.test(pathname);
}
