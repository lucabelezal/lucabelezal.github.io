import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import type {Props} from '@theme/BlogListPage';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';
import PageShell from '@site/src/components/PageShell';
import YearNav from '@site/src/components/YearNav';
import GoTrack from '@site/src/components/GoTrack';
import Tag from '@site/src/components/Tag';
import posts from '@site/src/data/all-posts.json';
import styles from './styles.module.css';

type Post = {
  kind: 'blog' | 'go';
  slug: string;
  title: string;
  date: string | null;
  description: string;
  tags: string[];
  url: string;
};

const all = posts as Post[];
const blog = all.filter((p) => p.kind === 'blog');

const CURATED = ['go-slices', 'go-socket-ao-handler', 'cap-pacelc'];

function toItem(p: Post): ContentItem {
  return {
    href: p.url,
    title: p.title,
    description: p.description,
    date: p.date,
    tags: p.tags,
  };
}

const curated = CURATED.map((slug) => all.find((p) => p.slug === slug)).filter(
  (p): p is Post => Boolean(p),
);

const recentes = blog.slice(0, 6).map(toItem);

const tagCounts = (() => {
  const counts = new Map<string, number>();
  for (const p of all) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

function TagCloud() {
  return (
    <section className="railCard" aria-label="Explorar por tag">
      <p className="railTitle">Explorar por tag</p>
      <div className="railTags">
        {tagCounts.map(([t, n]) => (
          <Tag key={t} tag={t} count={n} href={`/tags/${t}`} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <Layout
      title="Aprendizados em engenharia de software"
      description="Go, backend e arquitetura — notas, exemplos e projetos de Lucas Nascimento.">
      <PageShell left={<YearNav />} right={<><GoTrack /><TagCloud /></>}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Aprendizados em engenharia de software</p>
          <h1 className={styles.heroTitle}>Posts</h1>
          <p className={styles.heroLead}>
            Documento o que aprendo em Go, backend e arquitetura — e mantenho aqui
            como material de consulta, com código que roda.
          </p>
        </header>

        <section aria-label="Comece por aqui">
          <div className="sectionHeading">
            <h2>Comece por aqui</h2>
          </div>
          <ContentList items={curated.map(toItem)} />
        </section>

        <section aria-label="Recentes">
          <div className="sectionHeading">
            <h2>Recentes</h2>
            <Link className="sectionHint" to="/posts">
              todos os posts
            </Link>
          </div>
          <ContentList items={recentes} />
        </section>

        <Link className="cta" to="/posts">
          Ver todos os posts -&gt;
        </Link>
      </PageShell>
    </Layout>
  );
}

export default function BlogListPage(props: Props): React.JSX.Element {
  const page = props.metadata?.page ?? 1;
  if (page !== 1) {
    return <OriginalBlogListPage {...props} />;
  }
  return <Home />;
}
