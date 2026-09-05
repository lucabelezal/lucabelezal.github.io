# AGENTS.md — lucabelezal.github.io

Blog de aprendizados em engenharia de software, feito com Docusaurus.

## Comandos

- Dev local: `npm run start`
- Build de produção (todas as locales): `npm run build`
- Checar tipos: `npm run typecheck`
- Preview do build: `npm run serve`

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
