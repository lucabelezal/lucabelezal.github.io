import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar da área /fundamentals. Só liste páginas que existem
// (onBrokenLinks: 'throw'). Ordem = ordem de leitura.
const sidebars: SidebarsConfig = {
  fundamentalsSidebar: [
    'scale-from-zero',
    'estimativa',
    'framework',
    'consistent-hashing',
    'key-value-store',
  ],
};

export default sidebars;
