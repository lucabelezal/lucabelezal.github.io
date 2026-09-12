import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const contents = [
  {
    title: 'CAP e PACELC na prática',
    description: 'P é pré-requisito: C vs A na partição, L vs C fora dela.',
    href: '/cap-pacelc',
    date: '13 set 2026',
  },
  {
    title: 'Generics em Go',
    description: 'Constraints, type sets e um Cache[K, V] pronto para produção.',
    href: '/go-generics',
    date: '12 set 2026',
  },
  {
    title: 'Erros e logs em Go',
    description: 'Embrulhar com %w, inspecionar com Is/As e logar estruturado com slog.',
    href: '/go-erros-logs',
    date: '12 set 2026',
  },
  {
    title: 'Concorrência em Go',
    description: 'Goroutines, channels, WaitGroup e race detector com saídas reais.',
    href: '/go-concorrencia',
    date: '12 set 2026',
  },
  {
    title: 'Maps em Go',
    description: 'Swiss Tables por dentro: grupos, control bytes e o fim dos buckets.',
    href: '/go-maps',
    date: '12 set 2026',
  },
  {
    title: 'Slices em Go',
    description: 'O ponteiro que você não vê: header, backing array, append e aliasing.',
    href: '/go-slices',
    date: '12 set 2026',
  },
  {
    title: 'Interfaces em Go',
    description: 'Comportamento sem herança: method sets, nil tipado e interfaces pequenas.',
    href: '/go-interfaces',
    date: '12 set 2026',
  },
  {
    title: 'Visibilidade e packages em Go',
    description: 'Maiúscula exporta: pacotes, construtores, structs aninhadas e callbacks.',
    href: '/go-visibilidade-pacotes',
    date: '12 set 2026',
  },
  {
    title: 'Structs e methods em Go',
    description: 'Struct tem semântica de valor: receivers, method sets, layout de memória e composição.',
    href: '/go-structs-methods',
    date: '12 set 2026',
  },
  {
    title: 'Ponteiros em Go',
    description: 'Ponteiro é um valor que identifica uma variável: &, *, nil, escape analysis e quando (não) usar.',
    href: '/go-ponteiros',
    date: '12 set 2026',
  },
  {
    title: 'Error handling em Go',
    description: 'Quando o if err != nil é decisão e quando vira ruído: tratar, propagar, traduzir, acumular — e o lugar do Result[T].',
    href: '/go-error-handling',
    date: '06 set 2026',
  },
  {
    title: 'De Swift para Go',
    description: 'Para quem domina Swift: o que migra, o que não existe e o que engana ao aprender Go.',
    href: '/swift-para-go',
    date: '06 set 2026',
  },
  {
    title: 'Style Guide Go',
    description: 'Minhas decisões de estilo em português, com a razão de cada uma e quando quebro a regra.',
    href: '/go/style-guide',
    date: '06 set 2026',
  },
  {
    title: 'Guia dos guias de estilo do Go',
    description: 'Effective Go, Google e Uber: o que cobre cada guia, para quem serve e como decidir na dúvida.',
    href: '/go-style-guides',
    date: '06 set 2026',
  },
  {
    title: 'Go 1.27: novidades que importam para backend',
    description: 'Uma leitura prática das novidades da versão e do que vale adotar em serviços backend.',
    href: '/go-1-27-novidades',
    date: '05 set 2026',
  },
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
