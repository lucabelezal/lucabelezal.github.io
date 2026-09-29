import Link from '@docusaurus/Link';
import PageHeader from '@site/src/components/PageHeader';
import PageShell from '@site/src/components/PageShell';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';
import {FUNDAMENTALS} from '@site/src/data/fundamentalsTrack';

const items: ContentItem[] = FUNDAMENTALS.map((f) => ({
  href: f.href,
  title: f.title,
  description: f.description,
}));

const nav = (
  <nav className="railCard" aria-label="Fundamentos">
    <p className="railTitle">Fundamentos</p>
    <ul className="railNav">
      {FUNDAMENTALS.map((f) => (
        <li key={f.id}>
          <Link to={f.href}>{f.title}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

const side = (
  <section className="railCard" aria-label="Sobre esta área">
    <p className="railTitle">Como ler</p>
    <ul className="railNav">
      <li>Conceito antes do código</li>
      <li>Trade-off explícito</li>
      <li>Número antes da decisão</li>
    </ul>
    <p className="railNote">
      Os fundamentos alimentam os projetos: cada técnica aqui reaparece em
      `/projects`.
    </p>
  </section>
);

export default function FundamentalsHome() {
  return (
    <PageShell as="div" left={nav} right={side}>
      <PageHeader
        kicker="System design"
        title="Fundamentos"
        lead="As bases que sustentam qualquer sistema em escala: como escalar de zero a milhões, como estimar capacidade e como atacar um problema em aberto."
      />

      <section aria-labelledby="fundamentals-title">
        <div className="sectionHeading">
          <h2 id="fundamentals-title">Comece por aqui</h2>
        </div>
        <ContentList items={items} />
      </section>
    </PageShell>
  );
}
