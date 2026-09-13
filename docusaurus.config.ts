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
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es'],
  },

  plugins: [
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
