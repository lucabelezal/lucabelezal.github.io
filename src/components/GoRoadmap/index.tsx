import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type RoadmapItem = {
  label: string;
  href?: string;
};

type RoadmapPhase = {
  number: string;
  title: string;
  description: string;
  practice: string;
  checkpoint: string;
  items: RoadmapItem[];
};

const phases: RoadmapPhase[] = [
  {
    number: '01',
    title: 'Fundamentos de Go',
    description: 'Aprender a linguagem o suficiente para escrever código claro sem traduzir outra linguagem linha a linha.',
    practice: 'Prática: uma CLI pequena que lê, transforma e grava dados.',
    checkpoint: 'Você avança quando consegue explicar por que escolheu um slice, um map, um ponteiro ou uma interface.',
    items: [
      {label: 'Tipos, funções, slices e maps', href: '/go/values'},
      {label: 'Structs, métodos, ponteiros e interfaces', href: '/go/structs'},
      {label: 'Erros e packages', href: '/go/errors'},
      {label: 'Módulos e comandos básicos do Go'},
    ],
  },
  {
    number: '02',
    title: 'Ferramentas e biblioteca padrão',
    description: 'Ganhar autonomia para procurar primeiro na biblioteca padrão antes de adicionar uma dependência.',
    practice: 'Prática: um conversor de arquivos com JSON, CSV, logs e argumentos de linha de comando.',
    checkpoint: 'Você avança quando consegue iniciar, formatar, testar e depurar um projeto sem depender de um tutorial passo a passo.',
    items: [
      {label: 'Strings, bytes, tempo e arquivos', href: '/go/reading-files'},
      {label: 'JSON, URLs e serialização', href: '/go/json'},
      {label: 'Erros e logs estruturados', href: '/go/logging'},
      {label: 'Configuração e argumentos de CLI', href: '/go/environment-variables'},
    ],
  },
  {
    number: '03',
    title: 'Internet, HTTP e APIs',
    description: 'Entender o caminho de uma requisição e criar um serviço que um app mobile consegue consumir.',
    practice: 'Prática: uma API REST de links curtos, primeiro em memória.',
    checkpoint: 'Você avança quando consegue desenhar um endpoint, definir seus erros e testá-lo sem abrir o app mobile.',
    items: [
      {label: 'DNS, TCP, HTTP e TLS em nível prático'},
      {label: 'Handlers, roteamento e middleware', href: '/go/http-server'},
      {label: 'JSON, validação e códigos HTTP', href: '/go/json'},
      {label: 'HTTP client e integração externa', href: '/go/http-client'},
    ],
  },
  {
    number: '04',
    title: 'Dados e persistência',
    description: 'Tirar o serviço da memória e aprender a preservar dados com consistência.',
    practice: 'Prática: migrar o serviço para PostgreSQL com queries, transações e paginação.',
    checkpoint: 'Você avança quando consegue justificar o schema, os índices e os limites de uma transação.',
    items: [
      {label: 'SQL, modelagem relacional e índices'},
      {label: 'Queries parametrizadas e transações'},
      {label: 'Migrations, paginação e cache'},
      {label: 'Pool de conexões e prevenção de N+1'},
    ],
  },
  {
    number: '05',
    title: 'Segurança e autenticação',
    description: 'Tratar identidade, permissões e dados como parte do design da API, não como acabamento.',
    practice: 'Prática: proteger a API com usuários, tokens e autorização por recurso.',
    checkpoint: 'Você avança quando consegue descrever quem pode fazer cada operação e o que acontece quando a credencial falha.',
    items: [
      {label: 'Hashing de senhas e secrets'},
      {label: 'Sessões, tokens e JWT'},
      {label: 'Autenticação versus autorização'},
      {label: 'HTTPS, CORS e riscos comuns de API'},
    ],
  },
  {
    number: '06',
    title: 'Testes e qualidade',
    description: 'Criar uma rede de segurança para mudar o serviço sem depender de testes manuais no cliente.',
    practice: 'Prática: testar regras, handlers HTTP e integração com um banco de dados.',
    checkpoint: 'Você avança quando consegue mudar uma regra e saber rapidamente o que quebrou.',
    items: [
      {label: 'Testes unitários e table-driven tests'},
      {label: 'Mocks, stubs e testes de integração'},
      {label: 'Cobertura, benchmarks e profiling'},
      {label: '`httptest` e detector de race', href: '/go/testing-and-benchmarking'},
    ],
  },
  {
    number: '07',
    title: 'Concorrência e confiabilidade',
    description: 'Processar trabalho em paralelo sem perder controle sobre estado, erros, timeout e encerramento.',
    practice: 'Prática: um worker pool que processa tarefas com limite e cancelamento.',
    checkpoint: 'Você avança quando consegue apontar quem cancela uma goroutine, quem fecha um channel e como um erro chega ao chamador.',
    items: [
      {label: 'Goroutines e channels', href: '/go/goroutines'},
      {label: 'Select, timeouts e `context`', href: '/go/context'},
      {label: 'Worker pools e rate limiting', href: '/go/worker-pools'},
      {label: 'Mutexes, race detector e graceful shutdown'},
    ],
  },
  {
    number: '08',
    title: 'Observabilidade, deploy e escala',
    description: 'Fechar o ciclo: descobrir o que aconteceu, publicar com segurança e preparar o serviço para crescer.',
    practice: 'Prática: colocar a API no ar com testes, métricas, logs, health checks e deploy automatizado.',
    checkpoint: 'Você conclui o núcleo quando consegue responder como o serviço está, publicar uma mudança e investigar uma falha.',
    items: [
      {label: 'Logs, métricas, tracing e profiling'},
      {label: 'Segurança, secrets e graceful shutdown'},
      {label: 'Docker, CI/CD, cloud e DNS'},
      {label: 'Cache, filas, backpressure e escala'},
    ],
  },
];

export default function GoRoadmap() {
  return (
    <section className={styles.roadmap} aria-label="Fases do roadmap Go Backend">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Como eu estudaria</span>
        <h2>Aprenda uma camada. Construa. Só então avance.</h2>
        <p>
          O objetivo não é terminar um mapa. É conseguir explicar as decisões do seu
          serviço e evoluí-lo sem se perder quando ele começa a falhar.
        </p>
      </div>
      <div className={styles.timeline}>
        {phases.map((phase) => (
          <article className={styles.phase} key={phase.number}>
            <div className={styles.marker} aria-hidden="true">{phase.number}</div>
            <div className={styles.phaseContent}>
              <div className={styles.phaseHeader}>
                <h3>{phase.title}</h3>
              </div>
              <p>{phase.description}</p>
              <p className={styles.practice}>{phase.practice}</p>
              <p className={styles.checkpoint}><strong>Hora de avançar:</strong> {phase.checkpoint}</p>
              <ul>
                {phase.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? <Link to={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
