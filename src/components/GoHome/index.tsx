import Link from '@docusaurus/Link';
import allPosts from '@site/src/data/all-posts.json';
import PageHeader from '@site/src/components/PageHeader';
import PageShell from '@site/src/components/PageShell';
import GoTrack from '@site/src/components/GoTrack';
import Tag from '@site/src/components/Tag';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';

type Post = {
  kind: 'blog' | 'go';
  slug: string;
  title: string;
  date: string | null;
  description: string;
  tags: string[];
  url: string;
};

// Páginas de referência da área Go (docs, sem data de publicação).
const reference: ContentItem[] = [
  {
    title: 'Go by Example',
    description:
      'Exemplos pequenos para consultar a sintaxe, a biblioteca padrão e os recursos da linguagem.',
    href: '/go/hello-world',
  },
  {
    title: 'Go Backend Roadmap',
    description:
      'A sequência de estudo para sair dos fundamentos e chegar a serviços confiáveis em produção.',
    href: '/go/roadmap',
  },
  {
    title: 'Style Guide Go',
    description: 'Decisões de estilo com a razão de cada uma e quando quebrar a regra.',
    href: '/go/style-guide',
  },
];

const posts: ContentItem[] = (allPosts as Post[])
  .filter((p) => p.kind === 'blog' && p.tags.includes('go') && p.date)
  .map((p) => ({
    href: p.url,
    title: p.title,
    description: p.description,
    date: p.date,
  }));

const goTags = (() => {
  const counts = new Map<string, number>();
  for (const p of (allPosts as Post[]).filter(
    (x) => x.kind === 'blog' && x.tags.includes('go'),
  )) {
    for (const t of p.tags) {
      if (t === 'go') continue;
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

const nav = (
  <nav className="railCard" aria-label="Referência Go">
    <p className="railTitle">Referência</p>
    <ul className="railNav">
      <li>
        <Link to="/go/hello-world">Go by Example</Link>
      </li>
      <li>
        <Link to="/go/roadmap">Roadmap</Link>
      </li>
      <li>
        <Link to="/go/style-guide">Style Guide</Link>
      </li>
      <li>
        <Link to="/posts?tag=go">Posts de Go</Link>
      </li>
    </ul>
  </nav>
);

const side = (
  <>
    <GoTrack />
    {goTags.length > 0 && (
      <section className="railCard" aria-label="Tags de Go">
        <p className="railTitle">Tags</p>
        <div className="railTags">
          {goTags.map(([t, n]) => (
            <Tag key={t} tag={t} count={n} href={`/tags/${t}`} />
          ))}
        </div>
      </section>
    )}
  </>
);

export default function GoHome() {
  return (
    <PageShell as="div" left={nav} right={side}>
      <PageHeader
        kicker="Aprendizados em Go"
        title="Go"
        lead="Notas, exemplos e projetos sobre a jornada de Go até o backend."
      />

      <section aria-labelledby="go-reference-title">
        <div className="sectionHeading">
          <h2 id="go-reference-title">Referência</h2>
        </div>
        <ContentList items={reference} />
      </section>

      <section aria-labelledby="go-posts-title">
        <div className="sectionHeading">
          <h2 id="go-posts-title">Posts sobre Go</h2>
        </div>
        <ContentList items={posts} />
      </section>
    </PageShell>
  );
}
