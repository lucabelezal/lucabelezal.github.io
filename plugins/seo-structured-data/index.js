// Injeta JSON-LD (TechArticle + BreadcrumbList) e og:type nas páginas das
// áreas de docs (aws, projects, fundamentals, design e go), que não recebem
// structured data do tema. O blog já emite BlogPosting pelo próprio tema.
//
// Roda só na locale default: em en/es o conteúdo é fallback pt-BR e o
// canonical já aponta para o pt-BR (plugins/pt-br-canonical).
const fs = require('node:fs');
const path = require('node:path');

const AREAS = [...require('../../src/data/areas.json'), 'go'];

const AREA_LABELS = {
  aws: 'AWS',
  projects: 'Projetos',
  fundamentals: 'Fundamentos',
  design: 'Design',
  go: 'Go by Example',
};

const SITE_NAME = 'Lucas Nascimento';
const AUTHOR = {
  '@type': 'Person',
  name: 'Lucas Nascimento',
  url: 'https://github.com/lucabelezal',
};

function walkHtml(dir, cb) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, cb);
    else if (entry.name.endsWith('.html')) cb(full);
  }
}

function first(re, html) {
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

function cleanTitle(title) {
  return title.replace(/\s*\|\s*Lucas Nascimento\s*$/, '').trim();
}

function absolute(origin, base, rel) {
  return `${origin}${base}${rel}`.replace(/([^:])\/{2,}/g, '$1/');
}

module.exports = function seoStructuredData() {
  return {
    name: 'seo-structured-data',
    async postBuild({outDir, siteConfig}) {
      const {i18n, url, baseUrl} = siteConfig;
      const defaultLocale = i18n.defaultLocale;
      const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || defaultLocale;
      if (locale !== defaultLocale) return;

      const origin = url.replace(/\/$/, '');
      const defaultBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

      for (const area of AREAS) {
        const areaDir = path.join(outDir, area);
        if (!fs.existsSync(areaDir)) continue;

        walkHtml(areaDir, (file) => {
          const html = fs.readFileSync(file, 'utf8');
          if (html.includes('data-seo-structured')) return;

          const rel = path
            .relative(outDir, file)
            .replace(/\\/g, '/')
            .replace(/\/index\.html$/, '')
            .replace(/\.html$/, '');

          const title = cleanTitle(
            first(/<title[^>]*>([\s\S]*?)<\/title>/i, html),
          );
          const description = first(
            /<meta[^>]*name=["']?description["']?[^>]*content=["']([^"']*)["'][^>]*>/i,
            html,
          );
          const canonical = first(
            /<link[^>]*rel=["']?canonical["']?[^>]*href=["']([^"']+)["'][^>]*>/i,
            html,
          );
          const lang =
            first(/<html[^>]*lang=["']?([^"'\s>]+)/i, html) || defaultLocale;
          const image = first(
            /<meta[^>]*property=["']?og:image["']?[^>]*content=["']([^"']*)["'][^>]*>/i,
            html,
          );

          const pageUrl = canonical || absolute(origin, defaultBase, rel);
          const areaUrl = absolute(origin, defaultBase, area);

          const crumbs = [
            {
              '@type': 'ListItem',
              position: 1,
              name: AREA_LABELS[area] || area,
              item: areaUrl,
            },
          ];
          if (rel !== area) {
            crumbs.push({
              '@type': 'ListItem',
              position: 2,
              name: title || rel,
              item: pageUrl,
            });
          }

          const data = {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TechArticle',
                headline: title,
                description,
                url: pageUrl,
                image: image || undefined,
                inLanguage: lang,
                author: AUTHOR,
                isPartOf: {'@type': 'WebSite', name: SITE_NAME, url: origin},
              },
              {'@type': 'BreadcrumbList', itemListElement: crumbs},
            ],
          };

          const json = JSON.stringify(data).replace(/</g, '\\u003c');
          const script = `<script type="application/ld+json" data-seo-structured="1">${json}</script>`;
          const ogType = /property=["']?og:type["']?/i.test(html)
            ? ''
            : '<meta property="og:type" content="article">';

          fs.writeFileSync(
            file,
            html.replace('</head>', `${ogType}${script}</head>`),
          );
        });
      }
    },
  };
};
