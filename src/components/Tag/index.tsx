import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export const TAG_LABELS: Record<string, string> = {
  'engenharia-de-software': 'Engenharia de Software',
  backend: 'Backend',
  ios: 'iOS',
  go: 'Go',
  arquitetura: 'Arquitetura',
  'banco-de-dados': 'Banco de dados',
  'sistemas-distribuidos': 'Sistemas distribuídos',
};

export function tagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag;
}

type TagProps = {
  tag: string;
  active?: boolean;
  count?: number;
  onClick?: (tag: string) => void;
  href?: string;
  title?: string;
};

export default function Tag({tag, active, count, onClick, href, title}: TagProps) {
  const label = typeof count === 'number' ? `${tagLabel(tag)} (${count})` : tagLabel(tag);
  const className = clsx(styles.tag, active && styles.tagActive);
  const content = (
    <>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </>
  );

  if (href) {
    return (
      <Link className={className} data-tag={tag} to={href} title={title ?? tagLabel(tag)}>
        {content}
      </Link>
    );
  }

  if (!onClick) {
    return (
      <span className={className} data-tag={tag} title={title ?? tagLabel(tag)}>
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={className}
      data-tag={tag}
      onClick={() => onClick(tag)}
      aria-pressed={active}
      title={title ?? `Filtrar por ${tagLabel(tag)}`}>
      {content}
    </button>
  );
}

type TagListProps = {
  tags: string[];
  activeTag?: string;
  onSelect?: (tag: string) => void;
};

export function TagList({tags, activeTag, onSelect}: TagListProps) {
  if (tags.length === 0) return null;
  return (
    <span className={styles.list} aria-label="Tags">
      {tags.map((t) => (
        <Tag key={t} tag={t} active={activeTag === t} onClick={onSelect} />
      ))}
    </span>
  );
}
