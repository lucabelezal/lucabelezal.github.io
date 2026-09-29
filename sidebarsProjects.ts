import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Um sidebar da área /projects. Projeto com vários capítulos = categoria com o
// index + capítulos; projeto de uma página só = a própria página.
// A home (index.mdx) usa displayed_sidebar: null e não entra no sidebar.
const sidebars: SidebarsConfig = {
  projectsSidebar: [
    {
      type: 'category',
      label: 'URL Shortener',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'url-shortener/index'},
      items: [
        'url-shortener/o-problema',
        'url-shortener/estimativa',
        'url-shortener/design-alto-nivel',
        'url-shortener/deep-dive',
        'url-shortener/fechamento',
      ],
    },
  ],
};

export default sidebars;
