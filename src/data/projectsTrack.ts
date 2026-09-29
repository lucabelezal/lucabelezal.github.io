// Fonte única da lista de projetos. Consumida pelo ProjectsHome (cards) e pela
// navegação. Projeto novo = nova pasta em projects/ + chave em sidebarsProjects.ts
// + entrada aqui. Não conte projetos em outro lugar.
export type ProjectStatus = 'planejado' | 'em-andamento' | 'concluido';

export type Project = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  href: string;
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'url-shortener',
    title: 'Design a URL Shortener',
    description:
      'Do problema em aberto ao sistema distribuído: estimativa de capacidade, API, modelo de dados, função de hash e cache — em Go.',
    status: 'em-andamento',
    href: '/projects/url-shortener',
  },
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  planejado: 'Planejado',
  'em-andamento': 'Em andamento',
  concluido: 'Concluído',
};
