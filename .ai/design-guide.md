# Design Guide — lucabelezal.github.io

Guia da área **/design**: princípios de design de software (SOLID) e padrões de
projeto (GoF), com código Go. Invariantes gerais em `rules/architecture.md`.

## O que é (e o que não é)

- **É** doc de referência sobre um princípio ou padrão de projeto — problema →
  fundamento → código executável → trade-offs.
- **Não é** post datado (vai em `blog/`) nem system design (vai em
  `fundamentals/`).
- **Não** entra em `all-posts.json` nem na home. pt-BR only.
- **Shell:** padrão Posts (`PageShell`/`.pageGrid`), via `src/data/areas.json`.

## Estrutura

```
design/
  index.mdx            # home (DesignHome) — cards vêm de designTrack.ts
  <slug>.mdx           # uma página por capítulo
```

Nav: `sidebarsDesign.ts` (sidebar único, ordem de leitura). Cada página usa
`displayed_sidebar: designSidebar`.

## Esqueleto de um capítulo

1. **Epígrafe** — citação curta de autoridade (Martin, GoF, Cockburn), com fonte.
2. **Contexto** — o problema de acoplamento que o princípio/padrão resolve.
3. **O problema** — código acoplado antes da solução; mostre a dor.
4. **Fundamentos** — o princípio nas palavras da fonte (citação verbatim + tradução).
5. **Implementação** — código Go executável, evolução passo a passo + teste.
6. **Falhas e trade-offs** — quando **não** aplicar; over-abstraction.
7. **Referências** + `Summary` / `NextSteps` / `SkillsGained` (componentes de
   `src/components/blog/`).

## Citação (regra)

Material externo entra **reescrito em pt-BR**, com **diagramas próprios** e
**citação**. Citações diretas de livros: original em inglês (verbatim) + tradução
livre marcada. Sem tradução integral. Ver `AGENTS.md`.

## Diagramas

SVGs **theme-aware** em `static/img/diagramas/`, prefixo `design-`, gerados por
`scripts/design-diagrams.mjs`. Tabelas simples não viram imagem.

## Capítulo novo — checklist

1. Criar `design/<slug>.mdx` (`displayed_sidebar: designSidebar`).
2. Adicionar `<slug>` em `sidebarsDesign.ts`.
3. Adicionar entrada em `src/data/designTrack.ts`.
4. Se houver diagrama, adicionar a cena em `scripts/design-diagrams.mjs` e rodar
   `node scripts/design-diagrams.mjs`.
5. Rodar `npm run build` antes de abrir PR.
