# lucabelezal.github.io

Blog de aprendizados em engenharia de software.

**Live:** https://lucabelezal.github.io

> Docusaurus 3 · blog na `/` · tema GitHub Dark · i18n pt-BR (canônico) → en/es sob demanda

## Stack

- [Docusaurus 3.10](https://docusaurus.io/) (`classic`, `docs: false`)
- Tema custom em `src/css/custom.css` — Inter + JetBrains Mono, paleta GitHub (`#0d1117`)
- 3 locales: `pt-BR` (default), `en`, `es`

## Estrutura

```
blog/                          # posts canônicos em pt-BR (.mdx)
i18n/<locale>/docusaurus-plugin-content-blog/  # traduções en/es
src/components/blog/           # WhatYouWillLearn, Prerequisites, Summary, ...
src/css/custom.css             # tema
.ai/writing-guide.md           # guia editorial
.ai/templates/blog-post.mdx    # template de post
```

## Desenvolvimento

```bash
npm install
npm run start   # http://localhost:3000  (blog já na /)
npm run build   # build 3 locales
npm run serve   # preview do build
```

## Escrevendo

1. Copie o template:
   ```bash
   cp .ai/templates/blog-post.mdx blog/2026-09-06-meu-post.mdx
   ```
2. Siga o esqueleto `Contexto → Problema → Modelo mental → Implementação → Falhas → Resumo → Próximo` — ver `.ai/writing-guide.md`
3. Use os componentes de `src/components/blog/` e finalize com `Summary → NextSteps → SkillsGained → SeriesNav`
4. Tradução só sob demanda — ver `AGENTS.md`

## Deploy

`git push` na `main` → GitHub Actions (`.github/workflows/deploy.yml`) builda e publica via `actions/deploy-pages@v4`.

Requer **Settings → Pages → Source: GitHub Actions**.
