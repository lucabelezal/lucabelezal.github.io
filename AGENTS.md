# AGENTS.md — lucabelezal.github.io

Blog de aprendizados em engenharia de software, feito com Docusaurus.

## Comandos

- Dev local: `npm run start`
- Build de produção (todas as locales): `npm run build`
- Checar tipos: `npm run typecheck`
- Preview do build: `npm run serve`

## Skills — roteamento

Carregue a skill certa antes de agir. Skills do projeto: canônicas em `skills/`, sincronizadas por `npm run skills:sync` para `.claude/skills`, `.agents/skills`, `.cursor/skills`, `.windsurf/skills` — edite só `skills/`, nunca as cópias. Skills externas são geridas pelos lock files (`skills-lock.json`, `.agents/.skill-lock.json`); não editar.

| Intenção do usuário | Skill | Onde |
|---|---|---|
| Analisar screenshot/Figma/URL e transformar em spec implementável | `code-blog-ui` | `skills/code-blog-ui/SKILL.md` |
| Criar/editar post técnico, aplicar esqueleto editorial, revisar estrutura | `code-blog-content` | `skills/code-blog-content/SKILL.md` |
| Gerar gráfico SVG de dados do post (benchmark, latência, antes/depois) | `code-blog-chart` | `skills/code-blog-chart/SKILL.md` |
| Escrever conteúdo didático estilo professor/Elemar (formato aula, capítulo técnico, texto corrido → aula, qualquer tema) | `didactic-writing` | `skills/didactic-writing/SKILL.md` |
| Implementar spec em Docusaurus/React/TS (tokens, layout, componente) | `code-blog-docusaurus` | `skills/code-blog-docusaurus/SKILL.md` |
| Frontend genérico (design system, blueprint, audit) | `frontend-design`, `frontend-blueprint`, `web-design-guidelines`, `web-quality-audit`, `perf-web-optimization` | `.claude/skills/` |
| SEO/docs | `seo`, `ai-seo`, `docs-writer` | `.claude/skills/` |
| Go / backend (trilhas `go-by-example/`) | `golang-*` (50 skills: code-style, concurrency, testing, etc) | `.agents/skills/` |
| Documentar projeto de system design em `/projects` | `code-blog-content`, `code-blog-chart`, `code-blog-docusaurus` | `skills/` |
| Escrever capítulo de fundamentos de system design em `/fundamentals` | `code-blog-content`, `code-blog-chart`, `code-blog-docusaurus` | `skills/` |
| Escrever capítulo de princípio/padrão de design de software em `/design` | `code-blog-content`, `code-blog-docusaurus`, `didactic-writing` | `skills/` |

Fluxo blog: `referência visual → code-blog-ui (spec) → code-blog-content (estrutura) → code-blog-docusaurus (código) → npm run build`.

Harness: muitas skills no projeto (~67). AGENTS.md é roteador leve; detalhes ficam nas skills. Avalie harness com `harness-eval` (`.claude/skills/harness-eval/SKILL.md`) — Track A sempre, B/C sob demanda.

**Invariantes de arquitetura** (shells de página, áreas de docs, i18n, estrutura): `rules/architecture.md`. Leia antes de criar página, área de conteúdo ou componente.

## Estrutura

- `blog/` — posts canônicos em **pt-BR** (frontmatter + `.mdx`).
- `i18n/<locale>/docusaurus-plugin-content-blog/` — traduções (en/es).
- `src/pages/` — páginas React; `src/css/custom.css` — tema (Infima).
- `projects/` — docs vivas de system design em `/projects` (guia:
  `.ai/projects-guide.md`).
- `fundamentals/` — fundamentos de system design em `/fundamentals` (guia:
  `.ai/fundamentals-guide.md`).
- `design/` — princípios SOLID e padrões de projeto em `/design` (guia:
  `.ai/design-guide.md`).
- `src/data/areas.json` — fonte única das áreas no shell Posts (aws, projects,
  fundamentals, design); consumida por `src/utils/areas.ts` e
  `plugins/pt-br-canonical`.
- `rules/architecture.md` — invariantes (shells, áreas de docs, i18n, estrutura).
- `plugins/pt-br-canonical/` — canonical pt-BR de `/aws`, `/projects`,
  `/fundamentals` e `/design` em en/es.
- `skills/` — skills canônicas do projeto; `npm run skills:sync` propaga.
- `web/` — app Next.js (encurtador de URL). Independente do Docusaurus: tem
  `package.json`, build e deploy próprios (`web/README.md`). Excluído do
  `tsconfig` raiz.

## Área Go

- `/go` é a home editorial da área: cards em ordem cronológica, sem sidebar
  (`displayed_sidebar: null` nas páginas editoriais; `goByExampleSidebar`
  vive só no catálogo de referência).
- Fonte única: `src/data/all-posts.json` (gerado por `scripts/all-posts.mjs`
  com `slug/title/date/description/tags`) alimenta `/posts`, os cards de
  `GoHome` (filtro `tags: go`) e a vitrine da home. `sidebarsGo.ts` contém
  só o catálogo Go by Example.
- Go by Example permanece como referência acessível por link, fora da navegação editorial principal.
- Ao publicar post novo: nada manual nas listas — `npm run build` regenera
  o índice via `prebuild`. Só garanta `tag: go` no frontmatter se o post
  pertence à área Go.

## Área Projetos

- `/projects` é docs de referência (3ª instância de `plugin-content-docs`),
  **fora** de `all-posts.json` e da home — como o guia AWS.
- Shell: padrão **Posts** (`PageShell`/`.pageGrid`, rails de nav + TOC), não o
  shell de docs do Docusaurus. Ver `rules/architecture.md`.
- Projeto de uma página só: `projects/<slug>.mdx`. Projeto com capítulos: pasta
  `projects/<slug>/` com `index.mdx` (visão geral) + um `.mdx` por capítulo.
  Sempre `displayed_sidebar: projectsSidebar`. Projeto novo = `.mdx`/pasta +
  entrada em `sidebarsProjects.ts` + entrada em `projectsTrack.ts`. Checklist em
  `.ai/projects-guide.md`.
- Capítulos inacabados usam `draft: true`; publicar = remover `draft` + atualizar
  o roadmap. Nunca linkar página inexistente (`onBrokenLinks: 'throw'`).
- Material externo entra reescrito em pt-BR, com diagramas próprios e citação —
  nunca tradução integral. Diagramas: SVGs theme-aware gerados por script em
  `static/img/diagramas/` (prefixo do projeto, ex.: `us-`).
- Áreas `aws` e `projects` são **pt-BR only** (en/es servem fallback com
  canonical pt-BR).

## Área Fundamentos

- `/fundamentals` é docs de referência (4ª instância de `plugin-content-docs`):
  os capítulos-base de system design que os projetos reutilizam. **Fora** de
  `all-posts.json` e da home. pt-BR only.
- Shell: padrão **Posts**, igual a `aws`/`projects` (ver `rules/architecture.md`).
- Uma página por capítulo: `fundamentals/<slug>.mdx` com
  `displayed_sidebar: fundamentalsSidebar`. Capítulo novo = `.mdx` + entrada em
  `sidebarsFundamentals.ts` + entrada em `fundamentalsTrack.ts`. Guia:
  `.ai/fundamentals-guide.md`.
- Diagramas: `scripts/fundamentals-diagrams.mjs`, prefixo `sd-`.

## Área Design

- `/design` é docs de referência (5ª instância de `plugin-content-docs`):
  princípios SOLID e padrões de projeto (GoF) com código Go. **Fora** de
  `all-posts.json` e da home. pt-BR only.
- Shell: padrão **Posts**, igual a `aws`/`projects`/`fundamentals` (ver
  `rules/architecture.md`).
- Uma página por capítulo: `design/<slug>.mdx` com `displayed_sidebar:
  designSidebar`. Capítulo novo = `.mdx` + entrada em `sidebarsDesign.ts` +
  entrada em `src/data/designTrack.ts`. Guia: `.ai/design-guide.md`.
- Citação de livro: original em inglês (verbatim) + tradução livre marcada.
- Diagramas: `scripts/design-diagrams.mjs`, prefixo `design-`.

## Regras de escrita

- Idioma canônico: **pt-BR**. Posts novos nascem em `blog/`.
- Voz do autor: perfil medido + regras em `.ai/voice.md` (revise contra ele).
- Voz: engenheiro sênior explicando algo de que gosta — técnico, direto,
  específico. Sem floreios, sem "prosa roxa", sem jargão de marketing.
- Sempre adicione `{/* truncate */}` após a introdução (arquivos `.mdx`).
- Frontmatter mínimo: `slug`, `title`, `authors: [lucabelezal]`, `tags`.
- Autores ficam centralizados em `blog/authors.yml`; tags em `blog/tags.yml`.
- Estrutura editorial completa e template: `.ai/writing-guide.md` e
  `.ai/templates/blog-post.mdx`.
- Use os componentes de `src/components/blog/` para consistência:
  `WhatYouWillLearn`, `Prerequisites`, `Summary`, `NextSteps`,
  `SkillsGained`, `SeriesNav`.
- Todo post termina com **Resumo → Próximo → Skills → SeriesNav** (se em trilha).
  Ver `.ai/writing-guide.md` para o esqueleto
  Contexto → Problema → Modelo mental → Implementação → Falhas → Resumo → Próximo.

## Tradução (en/es) — só sob demanda

**Idioma padrão é sempre pt-BR.** Toda página, área, componente ou conteúdo novo
nasce em pt-BR, e o seletor de idioma mostra **Português** por padrão. Nunca
criar algo cujo default seja en/es. Rótulos do seletor: `i18n.localeConfigs` em
`docusaurus.config.ts`. Invariantes completos: `rules/architecture.md`.

`/` é sempre pt-BR e **não existe redirect automático** por idioma do navegador
— só se chega a `/en/` ou `/es/` escolhendo no seletor. Se uma página aparecer em
espanhol, a URL está em `/es/` (seleção manual ou dev server iniciado com
`npm run start:es`), não é o default.

Áreas **pt-BR only** (`aws`, `projects`, `fundamentals`, `design`) **não** têm
pasta em `i18n/`. Em en/es o Docusaurus serve o pt-BR como **fallback** e o
`plugins/pt-br-canonical` aponta o canonical para a URL pt-BR. Ver o conteúdo
pt-BR aparecendo em `/es/design/...` é o fallback esperado — a fonte é pt-BR.

Tradução NUNCA é automática. O usuário pede explicitamente (ex.: "traduz esse
post"). Então:

1. Copie o post canônico para
   `i18n/<locale>/docusaurus-plugin-content-blog/<mesmo-nome-do-arquivo>`.
2. Mantenha `slug`, `authors` e `tags` do original.
3. Traduza `title`, `description`/frontmatter textual e TODO o conteúdo.
4. Repita por locale pedido (en, es, ou ambos).
5. NUNCA edite o canônico em `blog/` para "refletir" traduções — o canônico é
   a fonte da verdade; só muda se o usuário editar o conteúdo.

## Verificação antes de entregar

- `npm run build` passa sem erro (broken links quebram o build).
- `/` serve pt-BR (não `/es/`) e o seletor mostra **Português**.
- Traduções revisadas por humano antes do push.
