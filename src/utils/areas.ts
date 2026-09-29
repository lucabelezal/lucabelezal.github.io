// Áreas de docs que seguem o shell do Posts (pageGrid) em vez do shell de
// docs do Docusaurus. Fonte única: src/data/areas.json (consumida também por
// plugins/pt-br-canonical). Prefixo de locale opcional (`/en/`, `/es/`).
import areas from '@site/src/data/areas.json';

export type DocsArea = string;

export const DOCS_AREAS: DocsArea[] = areas;

const PREFIX = '(?:en\\/|es\\/)?';

export function isArea(pathname: string, area: DocsArea): boolean {
  return new RegExp(`^\\/${PREFIX}${area}(?:\\/|$)`).test(pathname);
}

export function isAreaHome(pathname: string, area: DocsArea): boolean {
  return new RegExp(`^\\/${PREFIX}${area}\\/?$`).test(pathname);
}

export function isDocsArea(pathname: string): boolean {
  return DOCS_AREAS.some((area) => isArea(pathname, area));
}

export function isDocsAreaHome(pathname: string): boolean {
  return DOCS_AREAS.some((area) => isAreaHome(pathname, area));
}

export function currentArea(pathname: string): DocsArea | undefined {
  return DOCS_AREAS.find((area) => isArea(pathname, area));
}

// Home da área atual, preservando o prefixo de locale (`/en/`, `/es/`).
// Ex.: `/en/design/dip-adapter` → `/en/design`; `/design/dip-adapter` → `/design`.
export function areaHomeHref(pathname: string): string | undefined {
  const area = currentArea(pathname);
  if (!area) return undefined;
  const locale = pathname.match(/^\/(en|es)(?:\/|$)/);
  return `${locale ? `/${locale[1]}` : ''}/${area}`;
}
