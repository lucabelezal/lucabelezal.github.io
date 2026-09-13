import Link from '@docusaurus/Link';
import allPosts from '@site/src/data/all-posts.json';
import styles from './styles.module.css';

type Post = {slug: string; title: string; date: string; description: string; tags: string[]};

// Páginas docs (fora do blog) que também pertencem à área Go.
const docsExtras = [
  {
    title: 'Go Backend Roadmap',
    description: 'A sequência de estudo para sair dos fundamentos e chegar a serviços confiáveis em produção.',
    href: '/go/roadmap',
    date: '05 set 2026',
  },
  {
    title: 'Style Guide Go',
    description: 'Decisões de estilo com a razão de cada uma e quando quebrar a regra.',
    href: '/go/style-guide',
    date: '06 set 2026',
  },
  {
    title: 'Go by Example',
    description: 'Exemplos pequenos para consultar a sintaxe, a biblioteca padrão e os recursos da linguagem.',
    href: '/go/hello-world',
    date: '05 set 2026',
  },
];

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function fmtData(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

const contents = [
  ...(allPosts as Post[])
    .filter((p) => p.tags.includes('go'))
    .map((p) => ({
      title: p.title,
      description: p.description,
      href: `/${p.slug}`,
      date: fmtData(p.date),
    })),
  ...docsExtras,
];

export default function GoHome() {
  return (
    <div className={styles.home}>
      <p className={styles.kicker}>Aprendizados em Go</p>
      <p className={styles.lead}>
        Notas, exemplos e projetos sobre a jornada de Go até o backend.
      </p>

      <section aria-labelledby="go-contents-title">
        <div className={styles.sectionHeading}>
          <h2 id="go-contents-title">Conteúdos</h2>
          <span>mais novos primeiro</span>
        </div>
        <div className={styles.contentList}>
          {contents.map((entry) => (
            <Link className={styles.content} to={entry.href} key={entry.href}>
              <span className={styles.contentDate}>{entry.date}</span>
              <span className={styles.contentBody}>
                <strong>{entry.title}</strong>
                <span>{entry.description}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">-&gt;</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
