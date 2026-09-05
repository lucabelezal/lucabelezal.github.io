import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {isGoRoute, PROGRESS_EVENT, readProgress} from '../CompletionTracker/progress';
import styles from './styles.module.css';

export default function ProgressIndicator() {
  const {pathname} = useLocation();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (!isGoRoute(pathname)) return;
    const update = () => {
      setCompleted(Object.keys(readProgress()).filter(isGoRoute).length);
    };
    update();
    window.addEventListener(PROGRESS_EVENT, update);
    return () => window.removeEventListener(PROGRESS_EVENT, update);
  }, [pathname]);

  if (!isGoRoute(pathname)) return null;

  const total = 87;
  const percentage = Math.min(100, Math.round((completed / total) * 100));

  return (
    <div className={styles.container} aria-label={`Progresso: ${completed} de ${total} páginas concluídas`}>
      <div className={styles.label}>
        <span>Progresso</span>
        <span>{completed}/{total}</span>
      </div>
      <div className={styles.track} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={completed}>
        <div className={styles.fill} style={{width: `${percentage}%`}} />
      </div>
    </div>
  );
}
