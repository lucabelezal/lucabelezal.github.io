import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';
import {PROGRESS_EVENT, readProgress, saveProgress, isGoRoute, type Progress, STORAGE_KEY} from './progress';

export default function CompletionTracker() {
  const {pathname} = useLocation();
  const [progress, setProgress] = useState<Progress>({});

  const isGoPage = isGoRoute(pathname);
  const routeKey = pathname.replace(/\/+$/, '') || '/';
  const isIndex = /^\/(?:en\/|es\/)?go$/.test(routeKey);

  useEffect(() => {
    if (isGoPage) {
      setProgress(readProgress());
      const update = () => setProgress(readProgress());
      window.addEventListener(PROGRESS_EVENT, update);
      return () => window.removeEventListener(PROGRESS_EVENT, update);
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
    saveProgress(next);
  }

  function resetProgress() {
    if (!window.confirm('Reiniciar todo o progresso da trilha Go by Example?')) {
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(PROGRESS_EVENT));
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
