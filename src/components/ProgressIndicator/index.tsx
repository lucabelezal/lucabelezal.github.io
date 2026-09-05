import {useLocation} from '@docusaurus/router';
import {isGoHome, isGoRoute, useProgress} from '../CompletionTracker/progress';
import styles from './styles.module.css';

export default function ProgressIndicator() {
  const {pathname} = useLocation();
  const {progress, reset} = useProgress();

  if (!isGoRoute(pathname) || isGoHome(pathname)) return null;

  const total = 87;
  const completed = Object.keys(progress).filter(isGoRoute).length;
  const percentage = Math.min(100, Math.round((completed / total) * 100));

  function resetProgress() {
    if (!window.confirm('Reiniciar todo o progresso da trilha Go by Example?')) return;
    reset();
  }

  return (
    <div className={styles.container} aria-label={`Progresso: ${completed} de ${total} páginas concluídas`}>
      <div className={styles.label}>
        <span>Progresso</span>
        <span>{completed}/{total}</span>
      </div>
      <div className={styles.track} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={completed}>
        <div className={styles.fill} style={{width: `${percentage}%`}} />
      </div>
      {completed > 0 && (
        <button type="button" className={styles.reset} onClick={resetProgress}>
          Reiniciar progresso
        </button>
      )}
    </div>
  );
}
