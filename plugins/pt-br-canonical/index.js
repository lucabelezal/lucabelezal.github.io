// Áreas pt-BR only (aws, projects): nas locales en/es o Docusaurus gera a
// página com fallback pt-BR, mas com canonical apontando para a URL traduzida.
// Este plugin reescreve o canonical para a URL pt-BR, sinalizando que a versão
// canônica é a portuguesa. (Os hreflang alternates o Docusaurus já emite.)
const fs = require('node:fs');
const path = require('node:path');

// Fonte única das áreas pt-BR only (compartilhada com src/utils/areas.ts).
const AREAS = require('../../src/data/areas.json');

function walkHtml(dir, cb) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, cb);
    else if (entry.name.endsWith('.html')) cb(full);
  }
}

module.exports = function ptBrCanonical() {
  return {
    name: 'pt-br-canonical',
    async postBuild({outDir, siteConfig}) {
      const {i18n, url, baseUrl} = siteConfig;
      const defaultLocale = i18n.defaultLocale;
      const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || defaultLocale;
      if (locale === defaultLocale) return;

      // Em locales não-default, siteConfig.baseUrl já inclui o prefixo da
      // locale (ex.: /en/). O canonical deve apontar para a base do default.
      const localePath = i18n.localeConfigs?.[locale]?.path ?? locale;
      const localeBase = `/${localePath}/`;
      const defaultBase = baseUrl.endsWith(localeBase)
        ? `${baseUrl.slice(0, -localeBase.length)}/`
        : '/';

      const origin = url.replace(/\/$/, '');

      for (const area of AREAS) {
        const areaDir = path.join(outDir, area);
        if (!fs.existsSync(areaDir)) continue;

        walkHtml(areaDir, (file) => {
          const rel = path
            .relative(outDir, file)
            .replace(/\\/g, '/')
            .replace(/\/index\.html$/, '')
            .replace(/\.html$/, '');
          const ptUrl = `${origin}${defaultBase}${rel}/`.replace(
            /([^:])\/{2,}/g,
            '$1/',
          );

          const html = fs.readFileSync(file, 'utf8');
          const canonical = /<link[^>]*rel=(?:"canonical"|canonical)[^>]*>/i;
          if (!canonical.test(html)) return;

          fs.writeFileSync(
            file,
            html.replace(canonical, `<link rel="canonical" href="${ptUrl}">`),
          );
        });
      }
    },
  };
};
