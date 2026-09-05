import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const contents = [
  {
    title: 'Go Backend Roadmap',
    description: 'A sequência de estudo para sair dos fundamentos e chegar a serviços confiáveis em produção.',
    href: '/go/roadmap',
    date: '05 set 2026',
  },
  {
    title: 'Go by Example',
    description: 'Exemplos pequenos para consultar a sintaxe, a biblioteca padrão e os recursos da linguagem.',
    href: '/go/hello-world',
    date: '05 set 2026',
  },
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
            <Link className={styles.content} to={entry.href} key={entry.title}>
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
