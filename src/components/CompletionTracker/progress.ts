import {createContext, createElement, useContext, useEffect, useState, type ReactNode} from 'react';

export const STORAGE_KEY = 'go-by-example-progress-v1';

export type Progress = Record<string, true>;

type ProgressContextValue = {
  progress: Progress;
  toggle: (route: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function readProgress(): Progress {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Progress) : {};
  } catch {
    return {};
  }
}

export function isGoRoute(pathname: string) {
  return /^\/(?:en\/|es\/)?go(?:\/|$)/.test(pathname);
}

export function ProgressProvider({children}: {children: ReactNode}) {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  function update(next: Progress) {
    setProgress(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function toggle(route: string) {
    const next = {...progress};
    if (next[route]) delete next[route];
    else next[route] = true;
    update(next);
  }

  function reset() {
    update({});
  }

  return createElement(ProgressContext.Provider, {value: {progress, toggle, reset}}, children);
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
