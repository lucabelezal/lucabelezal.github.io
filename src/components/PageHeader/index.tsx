import type {ReactNode} from 'react';
import styles from './styles.module.css';

type Props = {
  kicker: string;
  title: string;
  lead?: ReactNode;
};

export default function PageHeader({kicker, title, lead}: Props) {
  return (
    <header className={styles.header}>
      <p className={styles.kicker}>{kicker}</p>
      <h1 className={styles.title}>{title}</h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}
