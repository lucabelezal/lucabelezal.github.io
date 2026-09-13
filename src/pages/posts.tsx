import {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import entries from '@site/src/data/all-posts.json';
import styles from './posts.module.css';

type Entry = {
  kind: 'blog' | 'go';
  slug: string;
  title: string;
  date: string | null;
  description: string;
  tags: string[];
  url: string;
};

const all = entries as Entry[];

function fmtDayMonth(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

function byYear(list: Entry[]): Map<string, Entry[]> {
  const map = new Map<string, Entry[]>();
  for (const p of list) {
    if (!p.date) continue;
    const year = new Date(p.date).getFullYear().toString();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(p);
  }
  return new Map([...map.entries()].sort((a, b) => Number(b[0]) - Number(a[0])));
}

function matchesQuery(p: Entry, q: string): boolean {
  if (!q) return true;
  const hay = `${p.title} ${p.description} ${p.slug}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

export default function AllPosts() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(
    () => new URLSearchParams(location.search).get('tag') ?? '',
  );

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of all) {
      for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(
    () =>
      all.filter(
        (p) => (!tag || p.tags.includes(tag)) && matchesQuery(p, query),
      ),
    [tag, query],
  );

  const blog = filtered.filter((p) => p.kind === 'blog');
  const go = filtered.filter((p) => p.kind === 'go');
  const grouped = byYear(blog);

  return (
    <Layout
      title="Posts"
      description="Arquivo de todo o conteúdo: posts do blog e trilha Go-by-Example, com filtro por tag">
      <main className={styles.page}>
        <h1>Posts</h1>
        <p className={styles.lead}>
          Todo o conteúdo num lugar só — blog e{' '}
          <Link to="/go">Go-by-Example</Link>. Filtre por tag
          {tag === 'go' ? (
            <>
              {' '}(vendo <strong>Go</strong>)
            </>
          ) : null}
          .
        </p>

        <input
          className={styles.search}
          type="search"
          placeholder="Buscar por título, descrição…"
          aria-label="Buscar conteúdo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.pills} role="group" aria-label="Filtrar por tag">
          <button
            type="button"
            className={tag === '' ? styles.pillActive : styles.pill}
            onClick={() => setTag('')}
            aria-pressed={tag === ''}>
            Todos ({all.length})
          </button>
          {tagCounts.map(([t, n]) => (
            <button
              type="button"
              key={t}
              className={tag === t ? styles.pillActive : styles.pill}
              onClick={() => setTag(tag === t ? '' : t)}
              aria-pressed={tag === t}>
              {t} ({n})
            </button>
          ))}
        </div>

        <p className={styles.count} aria-live="polite">
          {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
          {tag ? (
            <>
              {' '}com a tag <Link to={`/tags/${tag}`}>{tag}</Link>
            </>
          ) : null}
        </p>

        {blog.length > 0 && (
          <section aria-label="Blog">
            <h2>Blog</h2>
            {[...grouped.entries()].map(([year, items]) => (
              <section key={year} aria-label={year}>
                <h3 className={styles.year}>{year}</h3>
                <ul className={styles.list}>
                  {items.map((p) => (
                    <li key={p.url} className={styles.item}>
                      <span>
                        <Link to={p.url}>{p.title}</Link>
                        <span className={styles.tags}>
                          {p.tags.map((t) => (
                            <button
                              type="button"
                              key={t}
                              className={styles.miniTag}
                              onClick={() => setTag(t)}
                              title={`Filtrar por ${t}`}>
                              {t}
                            </button>
                          ))}
                        </span>
                      </span>
                      {p.date && (
                        <span className={styles.date}>
                          {fmtDayMonth(p.date)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </section>
        )}

        {go.length > 0 && (
          <section aria-label="Go-by-Example">
            <h2>
              Go-by-Example <span className={styles.hint}>(trilha /go)</span>
            </h2>
            <ul className={styles.list}>
              {go.map((p) => (
                <li key={p.url} className={styles.item}>
                  <Link to={p.url}>{p.title}</Link>
                  <span className={styles.date}>go</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {filtered.length === 0 && (
          <p className={styles.empty}>
            Nada por aqui. Limpe a busca ou escolha outra tag.
          </p>
        )}
      </main>
    </Layout>
  );
}
