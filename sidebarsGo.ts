import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  goSidebar: [
    {type: 'doc', id: 'index', label: 'Início'},
    {
      type: 'category',
      label: '2026',
      collapsible: false,
      items: ['roadmap'],
    },
  ],
};

export default sidebars;
