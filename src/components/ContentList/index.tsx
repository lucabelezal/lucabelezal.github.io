import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {TagList} from '@site/src/components/Tag';
import {formatDate} from '@site/src/utils/formatDate';
import styles from './styles.module.css';

export type ContentItem = {
  href: string;
  title: string;
  description?: string;
  date?: string | null;
  tags?: string[];
};

type Props = {
  items: ContentItem[];
  onTagSelect?: (tag: string) => void;
  activeTag?: string;
};

export default function ContentList({items, onTagSelect, activeTag}: Props) {
  const showDates = items.some((item) => item.date);

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div
          className={clsx(styles.row, !showDates && styles.rowNoDate)}
          key={item.href}>
          {showDates ? (
            <span className={styles.date}>{formatDate(item.date ?? null)}</span>
          ) : null}
          <span className={styles.body}>
            <Link className={styles.title} to={item.href}>
              {item.title}
            </Link>
            {item.tags && item.tags.length > 0 ? (
              <TagList tags={item.tags} activeTag={activeTag} onSelect={onTagSelect} />
            ) : null}
            {item.description ? (
              <span className={styles.desc}>{item.description}</span>
            ) : null}
          </span>
          <span className={styles.arrow} aria-hidden="true">
            -&gt;
          </span>
        </div>
      ))}
    </div>
  );
}
