import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';
import {isGoHome, isGoRoute, useProgress} from './progress';

export default function CompletionTracker() {
  const {pathname} = useLocation();
  const {progress, toggle} = useProgress();

  const isGoPage = isGoRoute(pathname);
  const routeKey = pathname.replace(/\/+$/, '') || '/';
  const isIndex = isGoHome(routeKey);

  if (!isGoPage || isIndex) {
    return null;
  }

  const completed = Object.keys(progress).filter((key) => isGoRoute(key)).length;
  const checked = progress[routeKey] === true;

  return (
    <aside className={styles.container} aria-label="Progresso da trilha Go by Example">
      <label className={styles.checkLabel}>
        <input type="checkbox" checked={checked} onChange={() => toggle(routeKey)} />
        <span>Marcar como concluído</span>
      </label>
      {isIndex && (
        <div className={styles.summary}>
          <span>{completed} páginas concluídas</span>
        </div>
      )}
    </aside>
  );
}
