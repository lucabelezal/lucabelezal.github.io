import Link from '@docusaurus/Link';
import PageHeader from '@site/src/components/PageHeader';
import PageShell from '@site/src/components/PageShell';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';
import {DESIGN_CHAPTERS, DESIGN_ROADMAP} from '@site/src/data/designTrack';

const items: ContentItem[] = DESIGN_CHAPTERS.map((c) => ({
  href: c.href,
  title: c.title,
  description: c.description,
}));

const nav = (
  <nav className="railCard" aria-label="Nesta área">
    <p className="railTitle">Nesta área</p>
    <ul className="railNav">
      {DESIGN_CHAPTERS.map((c, i) => (
        <li key={c.id}>
          <Link to={c.href}>
            {c.title}
            <span className="railCount">{String(i + 1).padStart(2, '0')}</span>
          </Link>
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
      <li>Princípio, depois padrão</li>
      <li>Código Go executável</li>
    </ul>
    <p className="railTitle">Roadmap</p>
    <ul className="railNav">
      {DESIGN_ROADMAP.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <p className="railNote">
      Cada princípio sai do papel com o padrão de projeto que o torna
      aplicável.
    </p>
  </section>
);

export default function DesignHome() {
  return (
    <PageShell as="div" left={nav} right={side}>
      <PageHeader
        kicker="Design de software"
        title="Design"
        lead="Os princípios que mantêm o código flexível e testável ao longo do tempo — SOLID e os padrões de projeto que os colocam em prática, com código Go que roda."
      />

      <section aria-labelledby="design-title">
        <div className="sectionHeading">
          <h2 id="design-title">Comece por aqui</h2>
        </div>
        <ContentList items={items} />
      </section>
    </PageShell>
  );
}
