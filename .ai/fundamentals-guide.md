# Fundamentals Guide — lucabelezal.github.io

Guia da área **/fundamentals**: capítulos-base de system design que os projetos
reutilizam. Invariantes gerais em `rules/architecture.md`.

## O que é (e o que não é)

- **É** doc de referência sobre uma técnica ou jornada de system design
  (escalar, estimar, hashing, KV store) — conceito antes de código.
- **Não é** post datado (vai em `blog/`) nem projeto (vai em `projects/`).
- **Não** entra em `all-posts.json` nem na home. pt-BR only.
- **Shell:** padrão Posts (`PageShell`/`.pageGrid`), via `src/data/areas.json`.

## Estrutura

```
fundamentals/
  index.mdx            # home (FundamentalsHome) — cards vêm de fundamentalsTrack.ts
  <slug>.mdx           # uma página por capítulo
```

Nav: `sidebarsFundamentals.ts` (sidebar único, ordem de leitura). Cada página usa
`displayed_sidebar: fundamentalsSidebar`.

## Esqueleto de um capítulo

1. **Contexto** — o problema que a técnica resolve, em uma frase.
2. **O conceito** — a ideia central, com exemplo concreto.
3. **Como funciona** — passo a passo, tabelas e diagramas.
4. **Trade-offs** — o que resolve, o que cria, quando não usar.
5. **Aplicação** — link para o projeto que usa a técnica (`/projects`).
6. **Referências** — citação do material base.

## Diagramas

SVGs **theme-aware** em `static/img/diagramas/`, prefixo `sd-`, gerados por
`scripts/fundamentals-diagrams.mjs`. Tabelas simples não viram imagem.

## Material externo (regra)

Reescrito em pt-BR, na voz do autor, com **diagramas próprios** e **citação** —
nunca tradução integral. Fatos e técnicas não são protegidos; redação e
diagramas sim.

## Capítulo novo — checklist

1. Criar `fundamentals/<slug>.mdx` (`displayed_sidebar: fundamentalsSidebar`).
2. Adicionar `<slug>` em `sidebarsFundamentals.ts`.
3. Adicionar entrada em `src/data/fundamentalsTrack.ts`.
4. Se houver diagrama, adicionar a cena em `scripts/fundamentals-diagrams.mjs` e
   rodar `node scripts/fundamentals-diagrams.mjs`.
5. Rodar `npm run build` antes de abrir PR.
