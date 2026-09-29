// Fonte única da lista de fundamentos. Consumida pelo FundamentalsHome (cards)
// e pela navegação. Página nova = novo .mdx em fundamentals/ + chave em
// sidebarsFundamentals.ts + entrada aqui. Não conte fundamentos em outro lugar.
export type Fundamental = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const FUNDAMENTALS: Fundamental[] = [
  {
    id: 'scale-from-zero',
    title: 'Escala de zero a milhões',
    description:
      'A jornada canônica: servidor único, load balancer, replicação, cache, CDN, web tier sem estado, data centers, message queue e sharding.',
    href: '/fundamentals/scale-from-zero',
  },
  {
    id: 'estimativa',
    title: 'Estimativa back-of-the-envelope',
    description:
      'Potências de 2, números de latência, disponibilidade em nines e como estimar QPS e storage sem calculadora.',
    href: '/fundamentals/estimativa',
  },
  {
    id: 'framework',
    title: 'Framework de entrevista',
    description:
      'O processo de 4 passos para atacar um problema de system design em aberto — e os erros que reprovam.',
    href: '/fundamentals/framework',
  },
  {
    id: 'consistent-hashing',
    title: 'Consistent hashing',
    description:
      'Por que hash % N quebra ao adicionar ou remover servidores e como o anel com virtual nodes redistribui só uma fração das chaves.',
    href: '/fundamentals/consistent-hashing',
  },
  {
    id: 'key-value-store',
    title: 'Key-value store',
    description:
      'Um KV store distribuído de ponta a ponta: CAP, quorum, vector clocks, gossip, Merkle tree e write/read path.',
    href: '/fundamentals/key-value-store',
  },
];
