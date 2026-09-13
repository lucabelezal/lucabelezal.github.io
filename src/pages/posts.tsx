import {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import PageShell from '@site/src/components/PageShell';
import YearNav from '@site/src/components/YearNav';
import PageHeader from '@site/src/components/PageHeader';
import Pager from '@site/src/components/Pager';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';
import Tag, {tagLabel} from '@site/src/components/Tag';
import entries from '@site/src/data/all-posts.json';

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

const BLOG_PER_PAGE = 10;
const GO_PER_PAGE = 25;

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

function toItem(p: Entry): ContentItem {
  return {
    href: p.url,
    title: p.title,
    description: p.description,
    date: p.date,
    tags: p.tags,
  };
}

export default function AllPosts() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(
    () => new URLSearchParams(location.search).get('tag') ?? '',
  );
  const [year, setYear] = useState(
    () => new URLSearchParams(location.search).get('year') ?? '',
  );
  const [blogPage, setBlogPage] = useState(1);
  const [goPage, setGoPage] = useState(1);

  // Qualquer mudança de filtro volta para a primeira página.
  useEffect(() => {
    setBlogPage(1);
    setGoPage(1);
  }, [tag, year, query]);

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
        (p) =>
          (!tag || p.tags.includes(tag)) &&
          (!year || (p.date && new Date(p.date).getFullYear().toString() === year)) &&
          matchesQuery(p, query),
      ),
    [tag, year, query],
  );

  const blog = filtered.filter((p) => p.kind === 'blog');
  const go = filtered.filter((p) => p.kind === 'go');

  const blogTotalPages = Math.max(1, Math.ceil(blog.length / BLOG_PER_PAGE));
  const safeBlogPage = Math.min(blogPage, blogTotalPages);
  const blogSlice = blog.slice(
    (safeBlogPage - 1) * BLOG_PER_PAGE,
    safeBlogPage * BLOG_PER_PAGE,
  );
  const grouped = byYear(blogSlice);

  const goTotalPages = Math.max(1, Math.ceil(go.length / GO_PER_PAGE));
  const safeGoPage = Math.min(goPage, goTotalPages);
  const goSlice = go.slice((safeGoPage - 1) * GO_PER_PAGE, safeGoPage * GO_PER_PAGE);

  const filters = (
    <section className="railCard" aria-label="Filtrar">
      <p className="railTitle">Filtrar</p>
      <input
        className="searchInput"
        type="search"
        placeholder="Buscar por título, descrição…"
        aria-label="Buscar conteúdo"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="filterRow" role="group" aria-label="Filtrar por tag">
        <button
          type="button"
          className={tag === '' && year === '' ? 'tagPill tagPill--active' : 'tagPill'}
          onClick={() => {
            setTag('');
            setYear('');
          }}
          aria-pressed={tag === '' && year === ''}>
          Todos ({all.length})
        </button>
        {tagCounts.map(([t, n]) => (
          <Tag
            key={t}
            tag={t}
            count={n}
            active={tag === t}
            onClick={() => setTag(tag === t ? '' : t)}
          />
        ))}
      </div>
      <p className="filterCount" aria-live="polite">
        {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
        {year ? (
          <>
            {' '}em <strong>{year}</strong>{' '}
            <button type="button" className="filterClear" onClick={() => setYear('')}>
              limpar
            </button>
          </>
        ) : null}
        {tag ? (
          <>
            {' '}com a tag <Link to={`/tags/${tag}`}>{tagLabel(tag)}</Link>
          </>
        ) : null}
      </p>
    </section>
  );

  return (
    <Layout
      title="Posts"
      description="Arquivo de todo o conteúdo: posts do blog e trilha Go-by-Example, com filtro por tag">
      <PageShell left={<YearNav />} right={filters}>
        <PageHeader
          kicker="Arquivo"
          title="Posts"
          lead={
            <>
              Todo o conteúdo num lugar só — blog e{' '}
              <Link to="/go">Go-by-Example</Link>. Filtre por tag à direita.
            </>
          }
        />

        {blog.length > 0 && (
          <section aria-label="Blog">
            <div className="sectionHeading">
              <h2>Blog</h2>
              <span className="sectionHint">{blog.length} posts</span>
            </div>
            {[...grouped.entries()].map(([year, items]) => (
              <section key={year} aria-label={year}>
                <h3 className="yearHeading" id={`ano-${year}`}>
                  {year}
                </h3>
                <ContentList
                  items={items.map(toItem)}
                  activeTag={tag}
                  onTagSelect={(t) => setTag(t)}
                />
              </section>
            ))}
            <Pager
              page={safeBlogPage}
              totalPages={blogTotalPages}
              onChange={setBlogPage}
              label="Paginação dos posts do blog"
            />
          </section>
        )}

        {go.length > 0 && (
          <section aria-label="Go-by-Example">
            <div className="sectionHeading">
              <h2>Go-by-Example</h2>
              <span className="sectionHint">trilha /go</span>
            </div>
            <ContentList
              items={goSlice.map((p) => ({href: p.url, title: p.title}))}
            />
            <Pager
              page={safeGoPage}
              totalPages={goTotalPages}
              onChange={setGoPage}
              label="Paginação do Go-by-Example"
            />
          </section>
        )}

        {filtered.length === 0 && (
          <p className="filterCount">
            Nada por aqui. Limpe a busca ou escolha outra tag.
          </p>
        )}
      </PageShell>
    </Layout>
  );
}
