import Link from '@docusaurus/Link';
import PageHeader from '@site/src/components/PageHeader';
import PageShell from '@site/src/components/PageShell';
import ContentList from '@site/src/components/ContentList';
import {AWS_GUIDE_PAGES, AWS_GUIDE_STAGES} from '@site/src/data/awsTrack';

// Cards e rail saem da fonte única em src/data/awsTrack.ts.
const stages = AWS_GUIDE_STAGES.map((stage) => ({
  ...stage,
  items: AWS_GUIDE_PAGES.filter((page) => page.stage === stage.id).map((page) => ({
    title: page.title,
    description: page.description,
    href: `/aws/${page.id}`,
  })),
}));

const nav = (
  <nav className="railCard" aria-label="Guia AWS">
    <p className="railTitle">Guia</p>
    <ul className="railNav">
      {AWS_GUIDE_PAGES.map((page) => (
        <li key={page.id}>
          <Link to={`/aws/${page.id}`}>{page.title}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

const side = (
  <section className="railCard" aria-label="Domínios do exame CLF-C02">
    <p className="railTitle">CLF-C02</p>
    <ul className="railNav">
      <li>Cloud Concepts — 24%</li>
      <li>Security and Compliance — 30%</li>
      <li>Cloud Technology and Services — 34%</li>
      <li>Billing, Pricing, and Support — 12%</li>
    </ul>
    <p className="railNote">
      Nota de corte 700/1000 · 65 questões (50 contam).
    </p>
  </section>
);

export default function AwsHome() {
  return (
    <PageShell as="div" left={nav} right={side}>
      <PageHeader
        kicker="Guia de consulta"
        title="AWS"
        lead="Uma escada de aprendizado em cinco degraus: entender o modelo, rodar código, guardar dados, conectar as peças e operar com segurança. Cada capítulo responde o que o serviço faz, que problema resolve e onde ele falha."
      />

      <section aria-labelledby="aws-pages-title">
        <div className="sectionHeading">
          <h2 id="aws-pages-title">Trilha de aprendizado</h2>
          <span className="sectionHint">
            {AWS_GUIDE_PAGES.length} capítulos · {AWS_GUIDE_STAGES.length} degraus
          </span>
        </div>
        <ol className="awsTimeline">
          {stages.map((stage) => (
            <li className="awsStage" key={stage.id}>
              <span className="awsStageNum" aria-hidden="true">
                {stage.id}
              </span>
              <div className="awsStageHead">
                <h3 className="awsStageTitle">{stage.title}</h3>
                <p className="awsStageHint">{stage.hint}</p>
              </div>
              <ContentList items={stage.items} />
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
