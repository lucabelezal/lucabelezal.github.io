import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Um sidebar da área /projects. Cada projeto é uma página; projeto novo =
// novo .mdx em projects/ + entrada aqui. A home (index.mdx) usa
// displayed_sidebar: null e não entra no sidebar.
const sidebars: SidebarsConfig = {
  projectsSidebar: ['url-shortener'],
};

export default sidebars;
