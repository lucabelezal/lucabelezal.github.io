# Regras de arquitetura — lucabelezal.github.io

Invariantes do site. Leia antes de criar página, área de conteúdo ou componente.
Se algo aqui contradiz o código, o código vence — atualize este arquivo.

## Shells de página

- **Posts** (`/`, `/posts`): shell custom `.pageGrid` (`src/css/custom.css`),
  via `PageShell` (`src/components/PageShell`). 3 colunas (190 | 1fr | 260) em
  ≥1100px; rails sticky (esquerda = contexto, direita = ferramentas).
- **Áreas editoriais** (`/aws`, `/projects`, `/fundamentals`, `/design`): mesmo
  shell do Posts — `PageShell` com rail esquerda = nav da área e rail direita =
  TOC. Sem chrome de docs (sem breadcrumbs, sem paginador, sem sidebar de docs).
- **Go by Example** (`/go/*`): shell de docs do Docusaurus (sidebar + TOC).
  Exceção: a home `/go` não usa sidebar (`displayed_sidebar: null`).
- **Nunca aninhe** `PageShell` dentro de `PageShell`.

## Áreas de docs — como funcionam

- Áreas editoriais são instâncias de `plugin-content-docs` em
  `docusaurus.config.ts` (`aws`, `projects`, `fundamentals`, `design`), com
  `routeBasePath` próprio.
- O shell de docs do Docusaurus é substituído por `PageShell` em
  `src/theme/DocItem/Layout/index.tsx` (e `src/theme/DocRoot/Layout/index.tsx`)
  para as áreas listadas em **`src/data/areas.json`** (fonte única; consumida
  também por `plugins/pt-br-canonical`).
- **Área nova:**
  1. registrar o plugin em `docusaurus.config.ts`;
  2. adicionar a área em `src/data/areas.json` — senão a home herda
     breadcrumbs/paginador/aside de docs;
  3. a home usa `displayed_sidebar: null` + componente `<XHome/>` com `PageShell`;
  4. navbar: `{to: '/<area>', label: '...'}`.
- A home de uma área renderiza o próprio `PageShell` (o `DocItem/Layout` a
  isenta). Páginas internas recebem o `PageShell` do `DocItem/Layout`.

## i18n

- **Regra base (sempre):** toda coisa criada nasce em **pt-BR**. O idioma padrão
  é sempre o português e o **seletor de idioma mostra Português** por padrão.
  Nunca criar página, área, componente ou conteúdo cujo default seja en/es.
- Canônico: **pt-BR**. `en`/`es` são traduções, sob demanda.
- `blog/` e `go-by-example/` têm traduções em `i18n/<locale>/...`.
- **`aws`, `projects`, `fundamentals` e `design` são pt-BR only** — nas locales
  en/es o Docusaurus serve fallback pt-BR. O canonical dessas páginas aponta
  para o pt-BR via `plugins/pt-br-canonical`.
- Área/conteúdo novo: declarar o escopo de locale (traduzido ou pt-BR only).
  Não deixar área meio-traduzida.
- Tradução nunca é automática — só quando o usuário pede.
- `/` é sempre pt-BR; **não existe redirect automático** por idioma do navegador.
  `/en/` e `/es/` só se alcançam escolhendo no seletor.
- Rótulos do seletor em `docusaurus.config.ts` → `i18n.localeConfigs`.

## Estrutura de conteúdo

- Espelhe a estrutura existente da área; não invente hierarquia nova.
  - AWS: arquivos flat em `aws-guide/` + `sidebarsAws.ts`.
  - Projects: uma página por projeto em `projects/<slug>.mdx` + `sidebarsProjects.ts`.
  - Fundamentals: um capítulo por arquivo em `fundamentals/<slug>.mdx` + `sidebarsFundamentals.ts`.
  - Design: um capítulo por arquivo em `design/<slug>.mdx` + `sidebarsDesign.ts`.
- Categoria de docs (`_category_.yml` + `index.mdx` + filhos) só quando o
  projeto realmente tem capítulos. Para uma página só, não crie categoria.
- Fonte única de listas: `src/data/*Track.ts` (cards) e `all-posts.json` (posts).
- Nunca linkar página inexistente (`onBrokenLinks: 'throw'`). Capítulo futuro
  fica como texto no roadmap, sem link.

## Diagramas

- SVGs theme-aware em `static/img/diagramas/`, prefixo da área (ex.: `us-`).
- Gerados por script determinístico (`scripts/*-diagrams.mjs`), não editados à mão.
- Tabelas simples e blocos de código não viram imagem.

## Referências a arquivos (skills e docs)

- **Nunca cite número de linha** (`arquivo.ts:42`) — driftam a cada edição.
  Use âncora simbólica: `docusaurus.config.ts → themeConfig.prism`,
  `custom.css → .blogSection`, `CodeExplanation/index.tsx`.
- Ao editar arquivo muito citado, confira se as skills ainda descrevem o real.

## Verificação antes de entregar

- `npm run build` (3 locales; broken links quebram o build).
- `npm run typecheck`.
- `/` serve pt-BR (não `/es/`) e o seletor mostra **Português**. Só se chega a
  `/en/`/`/es/` pelo seletor; não há redirect automático por idioma do navegador.
- Conferir dark/light e responsivo nas páginas tocadas.

## App Next.js (`web/`)

- App separado do Docusaurus: `package.json`, build e deploy próprios. Não
  entra no build do blog; está no `exclude` do `tsconfig` raiz.
- Comandos: `cd web && npm run dev|build|typecheck`.
- Encurtador em mock local (base 62 + `localStorage`); redirect em `/r/<code>`.
