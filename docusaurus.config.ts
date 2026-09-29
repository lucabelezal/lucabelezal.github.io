import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Lucas Nascimento',
  tagline: 'Aprendizados em engenharia de software',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://lucabelezal.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'lucabelezal',
  projectName: 'lucabelezal.github.io',

  onBrokenLinks: 'throw',

  // Blog canônico em pt-BR; traduções em en/es geradas sob demanda.
  // Idioma padrão sempre pt-BR; o seletor mostra Português por padrão.
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es'],
    localeConfigs: {
      'pt-BR': {label: 'Português', htmlLang: 'pt-BR'},
      en: {label: 'English', htmlLang: 'en'},
      es: {label: 'Español', htmlLang: 'es'},
    },
  },

  plugins: [
    // Corrige canonical/hreflang de /aws e /projects nas locales en/es
    // (áreas pt-BR only, servidas com fallback pt-BR).
    './plugins/pt-br-canonical',
    // Segunda instância de docs: guia de consulta AWS em /aws.
    // Não conta em all-posts.json (é referência, como o Go by Example).
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'aws',
        path: 'aws-guide',
        routeBasePath: 'aws',
        sidebarPath: './sidebarsAws.ts',
        editUrl:
          'https://github.com/lucabelezal/lucabelezal.github.io/tree/main/aws-guide/',
      },
    ],
    // Terceira instância de docs: projetos de system design em /projects.
    // Um sidebar por projeto; não conta em all-posts.json (é referência).
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'projects',
        path: 'projects',
        routeBasePath: 'projects',
        sidebarPath: './sidebarsProjects.ts',
        editUrl:
          'https://github.com/lucabelezal/lucabelezal.github.io/tree/main/projects/',
      },
    ],
    // Quarta instância de docs: fundamentos de system design em /fundamentals.
    // Referência (fora de all-posts.json), pt-BR only.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'fundamentals',
        path: 'fundamentals',
        routeBasePath: 'fundamentals',
        sidebarPath: './sidebarsFundamentals.ts',
        editUrl:
          'https://github.com/lucabelezal/lucabelezal.github.io/tree/main/fundamentals/',
      },
    ],
    // Quinta instância de docs: design de software em /design (SOLID + padrões).
    // Referência (fora de all-posts.json), pt-BR only.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'design',
        path: 'design',
        routeBasePath: 'design',
        sidebarPath: './sidebarsDesign.ts',
        editUrl:
          'https://github.com/lucabelezal/lucabelezal.github.io/tree/main/design/',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'go-by-example',
          routeBasePath: 'go',
          sidebarPath: './sidebarsGo.ts',
          editUrl:
            'https://github.com/lucabelezal/lucabelezal.github.io/tree/main/go-by-example/',
        },
        blog: {
          routeBasePath: '/',
          // Páginas de tag em /tags/<tag>; nunca colide com a rota /go dos docs.
          tagsBasePath: 'tags',
          showReadingTime: true,
          blogSidebarCount: 0,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/lucabelezal/lucabelezal.github.io/tree/main/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Posts',
      items: [
        {
          to: '/go',
          position: 'left',
          label: 'Go',
        },
        {
          to: '/aws',
          position: 'left',
          label: 'AWS',
        },
        {
          to: '/projects',
          position: 'left',
          label: 'Projetos',
        },
        {
          to: '/fundamentals',
          position: 'left',
          label: 'Fundamentos',
        },
        {
          to: '/design',
          position: 'left',
          label: 'Design',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/lucabelezal',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['swift'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
