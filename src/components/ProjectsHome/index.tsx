import Link from '@docusaurus/Link';
import PageHeader from '@site/src/components/PageHeader';
import PageShell from '@site/src/components/PageShell';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';
import {PROJECTS, STATUS_LABEL} from '@site/src/data/projectsTrack';

// Páginas de projeto (docs vivas, sem data de publicação).
const items: ContentItem[] = PROJECTS.map((p) => ({
  href: p.href,
  title: p.title,
  description: p.description,
  tags: [STATUS_LABEL[p.status]],
}));

const nav = (
  <nav className="railCard" aria-label="Projetos">
    <p className="railTitle">Projetos</p>
    <ul className="railNav">
      {PROJECTS.map((p) => (
        <li key={p.id}>
          <Link to={p.href}>{p.title}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

const side = (
  <section className="railCard" aria-label="Sobre esta área">
    <p className="railTitle">Como ler</p>
    <ul className="railNav">
      <li>Problema antes da solução</li>
      <li>Estimativa antes da arquitetura</li>
      <li>Trade-offs explícitos</li>
    </ul>
    <p className="railNote">
      Cada projeto é uma doc viva: cresce por capítulos, na ordem em que a
      decisão aparece.
    </p>
  </section>
);

export default function ProjectsHome() {
  return (
    <PageShell as="div" left={nav} right={side}>
      <PageHeader
        kicker="System design na prática"
        title="Projetos"
        lead="Problemas clássicos de system design resolvidos de ponta a ponta: do escopo em aberto ao código em Go, com as contas e os trade-offs à mostra."
      />

      <section aria-labelledby="projects-title">
        <div className="sectionHeading">
          <h2 id="projects-title">Comece por aqui</h2>
        </div>
        <ContentList items={items} />
      </section>
    </PageShell>
  );
}
