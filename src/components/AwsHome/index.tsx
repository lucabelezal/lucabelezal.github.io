import Link from '@docusaurus/Link';
import PageHeader from '@site/src/components/PageHeader';
import PageShell from '@site/src/components/PageShell';
import ContentList, {type ContentItem} from '@site/src/components/ContentList';

// Páginas do guia de consulta AWS (docs, sem data de publicação).
const pages: ContentItem[] = [
  {
    title: 'Mapa mental',
    description:
      'Os 3 grupos de serviços, o espectro de responsabilidade e por que os nomes são siglas.',
    href: '/aws/mapa-mental',
  },
  {
    title: 'Computação',
    description: 'EC2, ECS, Fargate, Lambda e EKS: onde o código executa e quanto você delega.',
    href: '/aws/computacao',
  },
  {
    title: 'Dados e objetos',
    description: 'RDS, Aurora, DynamoDB e S3: onde a informação mora.',
    href: '/aws/dados',
  },
  {
    title: 'Comunicação',
    description: 'API Gateway, SQS, SNS, EventBridge e ELB: como as peças conversam.',
    href: '/aws/comunicacao',
  },
  {
    title: 'Segurança e custo',
    description: 'IAM, responsabilidade compartilhada, free tier, preços e suporte.',
    href: '/aws/seguranca-e-custo',
  },
  {
    title: 'Cloud Practitioner (CLF-C02)',
    description: 'Os 4 domínios da prova com pesos e o que estudar em cada um.',
    href: '/aws/cloud-practitioner',
  },
];

const nav = (
  <nav className="railCard" aria-label="Guia AWS">
    <p className="railTitle">Guia</p>
    <ul className="railNav">
      <li>
        <Link to="/aws/mapa-mental">Mapa mental</Link>
      </li>
      <li>
        <Link to="/aws/computacao">Computação</Link>
      </li>
      <li>
        <Link to="/aws/dados">Dados e objetos</Link>
      </li>
      <li>
        <Link to="/aws/comunicacao">Comunicação</Link>
      </li>
      <li>
        <Link to="/aws/seguranca-e-custo">Segurança e custo</Link>
      </li>
      <li>
        <Link to="/aws/cloud-practitioner">Cloud Practitioner</Link>
      </li>
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
        lead="Um mapa mental da AWS para consultar: o que cada serviço faz, quando usar e o que cai no Cloud Practitioner."
      />

      <section aria-labelledby="aws-pages-title">
        <div className="sectionHeading">
          <h2 id="aws-pages-title">Comece por aqui</h2>
        </div>
        <ContentList items={pages} />
      </section>
    </PageShell>
  );
}
