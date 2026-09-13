import Link from '@docusaurus/Link';
import {useProgress} from '@site/src/components/CompletionTracker/progress';
import {GO_TRACK_TOTAL, isGoTrackPath} from '@site/src/data/goTrack';
import styles from './styles.module.css';

export default function GoTrack() {
  const {progress} = useProgress();
  const total = GO_TRACK_TOTAL;
  const completed = Object.keys(progress).filter(isGoTrackPath).length;
  const pct = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  return (
    <section className={styles.goTrack} aria-label="Trilha Go">
      <p className={styles.kicker}>Trilha Go</p>
      <h2 className={styles.title}>Do fundamento ao backend em produção</h2>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-label={`${completed} de ${total} páginas concluídas`}>
        <div className={styles.fill} style={{width: `${pct}%`}} />
      </div>
      <p className={styles.meta}>
        {completed} de {total} páginas
      </p>
      <Link className={styles.cta} to="/go">
        Abrir trilha -&gt;
      </Link>
    </section>
  );
}
