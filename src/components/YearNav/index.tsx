import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import posts from '@site/src/data/all-posts.json';

type Post = {kind: 'blog' | 'go'; date: string | null};

const years = (() => {
  const counts = new Map<string, number>();
  for (const p of posts as Post[]) {
    if (p.kind !== 'blog' || !p.date) continue;
    const year = new Date(p.date).getFullYear().toString();
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
})();

export default function YearNav() {
  const {search} = useLocation();
  const activeYear = new URLSearchParams(search).get('year') ?? '';

  return (
    <nav className="railCard" aria-label="Posts por ano">
      <p className="railTitle">Por ano</p>
      <ul className="railNav">
        {years.map(([year, count]) => {
          const active = activeYear === year;
          return (
            <li key={year}>
              <Link
                to={active ? '/posts' : `/posts?year=${year}`}
                aria-current={active ? 'page' : undefined}>
                <span>{year}</span>
                <span className="railCount">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
