import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import posts from '@site/src/data/all-posts.json';
import styles from './posts.module.css';

type Post = {slug: string; title: string; date: string};

function fmtDayMonth(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

function byYear(list: Post[]): Map<string, Post[]> {
  const map = new Map<string, Post[]>();
  for (const p of list) {
    const year = new Date(p.date).getFullYear().toString();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(p);
  }
  return new Map([...map.entries()].sort((a, b) => Number(b[0]) - Number(a[0])));
}

export default function AllPosts() {
  const grouped = byYear(posts as Post[]);
  return (
    <Layout title="All Posts" description="Arquivo de todos os posts, por ano">
      <main className={styles.page}>
        <h1>All Posts</h1>
        {[...grouped.entries()].map(([year, items]) => (
          <section key={year} aria-label={year}>
            <h2 className={styles.year}>{year}</h2>
            <ul className={styles.list}>
              {items.map((p) => (
                <li key={p.slug} className={styles.item}>
                  <Link to={`/${p.slug}`}>{p.title}</Link>
                  <span className={styles.date}>{fmtDayMonth(p.date)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
}
