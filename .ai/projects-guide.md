# Projects Guide — lucabelezal.github.io

Guia da área **/projects**: projetos de system design documentados como docs
vivas (sem data de publicação), não como posts de blog. Invariantes gerais em
`rules/architecture.md`.

## O que é (e o que não é)

- **É** doc de referência que cresce por capítulos: problema → estimativa →
  arquitetura → implementação → trade-offs.
- **Não é** post datado. Post datado vai em `blog/`; projeto vai em `projects/`.
- **Não** entra em `src/data/all-posts.json` nem na home. É referência, como o
  guia AWS.
- **Shell:** padrão Posts (`PageShell`/`.pageGrid`, rail de nav + TOC), não o
  shell de docs do Docusaurus. Aplicado automaticamente via
  `src/theme/DocItem/Layout` (áreas de `src/utils/areas.ts`).

## Estrutura

```
projects/
  index.mdx                      # vitrine (ProjectsHome) — cards vêm de projectsTrack.ts
  <slug>.mdx                     # uma página por projeto
```

Uma página por projeto. Só crie pasta + `_category_.yml` quando o projeto
realmente tiver vários capítulos.

Nav da área: `sidebarsProjects.ts` (sidebar único da área).

```ts
const sidebars: SidebarsConfig = {
  projectsSidebar: ['url-shortener'],
};
```

Cada página usa `displayed_sidebar: projectsSidebar`. A home usa
`displayed_sidebar: null`.

## Esqueleto de um capítulo de projeto

Ordem recomendada (adapte ao problema):

1. **Contexto** — o problema em aberto, em uma frase.
2. **Escopo** — perguntas de clarificação e casos de uso.
3. **Estimativa** — premissas explícitas + contas destrinchadas + tabela-resumo.
   Sempre ligue cada número a uma decisão (cache, sharding, headroom).
4. **Modelo de dados / dimensionamento** — chave, índices, partição.
5. **API / interfaces** — endpoints, contratos, semântica.
6. **Implementação** — código em Go, executável, seguido de explicação.
7. **Trade-offs** — "X resolve A, mas cria B".
8. **Fechamento** — o que ficou de fora e por quê.

Use os componentes editoriais de `src/components/blog/` (`WhatYouWillLearn`,
`Summary`, `NextSteps`, `SeriesNav`) quando o capítulo se beneficia deles.

## Diagramas

SVGs **theme-aware** em `static/img/diagramas/`, prefixo do projeto
(ex.: `us-` para url-shortener). Padrão: JetBrains Mono, `<style>` com
`@media (prefers-color-scheme: dark)`, `role="img"` + `<title>`/`<desc>`.

Gere por script determinístico (`scripts/url-shortener-diagrams.mjs`) em vez de
editar SVG à mão. Tabelas simples e blocos de código não viram imagem.

## Material externo (regra)

Material de terceiros (cursos, livros, artigos) entra **reescrito em pt-BR**, na
voz do autor, com **diagramas próprios** e **citação da fonte** — nunca tradução
integral nem cópia de figuras. Fatos e técnicas não são protegidos; redação e
diagramas sim.

## Fluxo de publicação

- Páginas inacabadas nascem com `draft: true` (fora do build de produção).
- Publicar = remover `draft` + atualizar o roadmap no `index.mdx` do projeto.
- Nunca linkar para uma página que ainda não existe (`onBrokenLinks: 'throw'`
  quebra o build). No roadmap, capítulo futuro fica como texto, sem link.

## Projeto novo — checklist

1. Criar `projects/<slug>.mdx` (`displayed_sidebar: projectsSidebar`).
2. Adicionar `<slug>` em `sidebarsProjects.ts`.
3. Adicionar entrada em `src/data/projectsTrack.ts` (a home lê daí).
4. Rodar `npm run build` antes de abrir PR.
