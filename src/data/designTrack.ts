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
    id: 'lsp',
    title: 'Substituição de Liskov (LSP)',
    description:
      'O princípio mais crítico do SOLID: pré-condições, pós-condições e invariantes. Por que a assinatura não basta quando o comportamento mente e como corrigir a abstração em Go.',
    href: '/design/lsp',
  },
  {
    id: 'isp',
    title: 'Segregação de Interfaces (ISP)',
    description:
      'Contratos coesos por capacidade: por que métodos mortos quebram SRP, OCP e LSP, e como separar interface gorda usando a satisfação implícita de Go.',
    href: '/design/isp',
  },
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
  'Padrões GoF — Strategy, Decorator, Facade',
];
