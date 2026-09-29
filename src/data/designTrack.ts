// Fonte única da lista de design de software. Consumida pelo DesignHome (cards)
// e pela navegação. Página nova = novo .mdx em design/ + chave em
// sidebarsDesign.ts + entrada aqui. Não conte design em outro lugar.
export type DesignChapter = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const DESIGN_CHAPTERS: DesignChapter[] = [
  {
    id: 'dip-adapter',
    title: 'Inversão de Dependências (DIP) + Adapter',
    description:
      'A base das arquiteturas em camadas: por que depender de concreto dói, como a interface inverte a seta e como o padrão Adapter conecta um SDK de terceiros sem poluir a regra.',
    href: '/design/dip-adapter',
  },
];

export const DESIGN_ROADMAP = [
  'SRP — Responsabilidade única',
  'OCP — Aberto/fechado',
  'LSP — Substituição de Liskov',
  'ISP — Segregação de interfaces',
  'Padrões GoF — Strategy, Decorator, Facade',
];
