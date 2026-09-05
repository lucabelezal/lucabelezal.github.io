import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

const STORAGE_KEY = 'go-by-example-progress-v1';

type Progress = Record<string, true>;

function readProgress(): Progress {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Progress) : {};
  } catch {
    return {};
  }
}

function isGoRoute(pathname: string) {
  return /^\/(?:en\/|es\/)?go(?:\/|$)/.test(pathname);
}

export default function CompletionTracker() {
  const {pathname} = useLocation();
  const [progress, setProgress] = useState<Progress>({});

  const isGoPage = isGoRoute(pathname);
  const routeKey = pathname.replace(/\/+$/, '') || '/';
  const isIndex = /^\/(?:en\/|es\/)?go$/.test(routeKey);

  useEffect(() => {
    if (isGoPage) {
      setProgress(readProgress());
    }
  }, [isGoPage, pathname]);

  if (!isGoPage) {
    return null;
  }

  const completed = Object.keys(progress).filter((key) => isGoRoute(key)).length;
  const checked = progress[routeKey] === true;

  function toggleCompleted() {
    const next = {...progress};
    if (next[routeKey]) {
      delete next[routeKey];
    } else {
      next[routeKey] = true;
    }
    setProgress(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function resetProgress() {
    if (!window.confirm('Reiniciar todo o progresso da trilha Go by Example?')) {
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }

  return (
    <aside className={styles.container} aria-label="Progresso da trilha Go by Example">
      <label className={styles.checkLabel}>
        <input type="checkbox" checked={checked} onChange={toggleCompleted} />
        <span>Marcar como concluído</span>
      </label>
      {isIndex && (
        <div className={styles.summary}>
          <span>{completed} páginas concluídas</span>
          {completed > 0 && (
            <button type="button" className={styles.reset} onClick={resetProgress}>
              Reiniciar progresso
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
