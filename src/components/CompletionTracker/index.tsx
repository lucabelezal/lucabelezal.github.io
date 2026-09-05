import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';
import {isGoRoute, useProgress} from './progress';

export default function CompletionTracker() {
  const {pathname} = useLocation();
  const {progress, toggle, reset} = useProgress();

  const isGoPage = isGoRoute(pathname);
  const routeKey = pathname.replace(/\/+$/, '') || '/';
  const isIndex = /^\/(?:en\/|es\/)?go$/.test(routeKey);

  if (!isGoPage) {
    return null;
  }

  const completed = Object.keys(progress).filter((key) => isGoRoute(key)).length;
  const checked = progress[routeKey] === true;

  function resetProgress() {
    if (!window.confirm('Reiniciar todo o progresso da trilha Go by Example?')) {
      return;
    }
    reset();
  }

  return (
    <aside className={styles.container} aria-label="Progresso da trilha Go by Example">
      <label className={styles.checkLabel}>
        <input type="checkbox" checked={checked} onChange={() => toggle(routeKey)} />
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
