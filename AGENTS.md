# AGENTS.md — lucabelezal.github.io

Blog de aprendizados em engenharia de software, feito com Docusaurus.

## Comandos

- Dev local: `npm run start`
- Build de produção (todas as locales): `npm run build`
- Checar tipos: `npm run typecheck`
- Preview do build: `npm run serve`

## Skills — roteamento

Carregue a skill certa antes de agir. Fonte canônica: `skills/` → sync para `.claude/skills/` e `.agents/skills/`.

| Intenção do usuário | Skill | Onde |
|---|---|---|
| Analisar screenshot/Figma/URL e transformar em spec implementável | `code-blog-ui` | `skills/code-blog-ui/SKILL.md` |
| Criar/editar post técnico, aplicar esqueleto editorial, revisar estrutura | `code-blog-content` | `skills/code-blog-content/SKILL.md` |
| Implementar spec em Docusaurus/React/TS (tokens, layout, componente) | `code-blog-docusaurus` | `skills/code-blog-docusaurus/SKILL.md` |
| Frontend genérico (design system, blueprint, audit) | `frontend-design`, `frontend-blueprint`, `web-design-guidelines`, `web-quality-audit`, `perf-web-optimization` | `.claude/skills/` |
| SEO/docs | `seo`, `ai-seo`, `docs-writer` | `.claude/skills/` |
| Go / backend (trilhas `go-by-example/`) | `golang-*` (50 skills: code-style, concurrency, testing, etc) | `.agents/skills/` |

Fluxo blog: `referência visual → code-blog-ui (spec) → code-blog-content (estrutura) → code-blog-docusaurus (código) → npm run build`.

Harness: muitas skills no projeto (~67). AGENTS.md é roteador leve; detalhes ficam nas skills. Avalie harness com `harness-eval` (`.claude/skills/harness-eval/SKILL.md`) — Track A sempre, B/C sob demanda.

## Estrutura

- `blog/` — posts canônicos em **pt-BR** (frontmatter + `.mdx`).
- `i18n/<locale>/docusaurus-plugin-content-blog/` — traduções (en/es).
- `src/pages/` — páginas React; `src/css/custom.css` — tema (Infima).

## Regras de escrita

- Idioma canônico: **pt-BR**. Posts novos nascem em `blog/`.
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
- Traduções revisadas por humano antes do push.
