---
name: code-blog-content
description: >
  Estrutura e escreve posts técnicos para blog Docusaurus seguindo esqueleto
  editorial Contexto → Problema → Modelo mental → Implementação → Falhas →
  Resumo → Próximo. Use quando o usuário pedir para criar novo post, escrever
  artigo, revisar estrutura editorial, aplicar template de blog, ou garantir que
  post siga o padrão do writing guide. Ativa com "novo post", "escrever artigo",
  "criar post técnico", "revisar post", "template blog".
---

# Code Blog Content — Estrutura Editorial

## Objetivo

Garantir que todo post canônico em `blog/` siga padrão editorial consistente, técnico e direto, otimizado para leitura longa e código executável. Base: `.ai/writing-guide.md` e `AGENTS.md`.

## Estrutura obrigatória (sempre nessa ordem)

1. **Título H1** — claro e específico (`# Idempotência em APIs`), não genérico
2. **Lead** — 1 parágrafo respondendo "por que devo me importar?" + logo após introdução curta + `{/* truncate */}` (obrigatório em `.mdx`)
3. **O que vamos aprender** — lista com componente `WhatYouWillLearn` (`src/components/blog/WhatYouWillLearn.tsx`)
4. **Pré-requisitos** — lista com `Prerequisites` (`src/components/blog/Prerequisites.tsx`)
5. **1. Contexto** — para onde leitor vai; opcional "O que vamos construir" com diagrama ASCII
6. **2. O problema** — mostre problema antes da solução, exemplo concreto
7. **3. Modelo mental** — explicação simples do conceito
8. **4. Implementação** — código executável (linguagem + versão + dependências + resultado esperado)
9. **5. Falhas e trade-offs** — "X resolve A, mas cria B"; erros comuns
10. **Resumo** — componente `Summary` com 3–5 bullets
11. **O que estudar depois** — `NextSteps` com link p/ próximo post
12. **Skills desenvolvidas** — `SkillsGained` (ex: `["Idempotência", "HTTP"]`)
13. **Navegação de série** — `SeriesNav` quando post pertence a trilha

> Checklist: nunca pule 10→13. Todo post termina com Resumo → Próximo → Skills → SeriesNav (se em série).

## Frontmatter mínimo

```yaml
---
slug: meu-novo-post
title: Título claro e específico
authors: [lucabelezal]
tags: [engenharia-de-software]
---
```

- Autores centralizados em `blog/authors.yml`, tags em `blog/tags.yml`
- Idioma canônico: **pt-BR** em `blog/`; traduções só sob demanda para `i18n/<locale>/docusaurus-plugin-content-blog/` mantendo `slug/authors/tags` (ver `AGENTS.md:35`)
- Sempre `{/* truncate */}` após lead em `.mdx`

## Template MDX completo

```mdx
---
slug: meu-novo-post
title: Título claro e específico
authors: [lucabelezal]
tags: [engenharia-de-software]
---

import WhatYouWillLearn from '@site/src/components/blog/WhatYouWillLearn';
import Prerequisites from '@site/src/components/blog/Prerequisites';
import Summary from '@site/src/components/blog/Summary';
import NextSteps from '@site/src/components/blog/NextSteps';
import SkillsGained from '@site/src/components/blog/SkillsGained';
import SeriesNav from '@site/src/components/blog/SeriesNav';

Um parágrafo de lead: por que alguém deveria se importar?

{/* truncate */}

<WhatYouWillLearn>

- ponto 1
- ponto 2
- ponto 3

</WhatYouWillLearn>

<Prerequisites>

- pré-requisito 1
- pré-requisito 2

</Prerequisites>

## 1. Contexto

Por que este tema existe? Opcional: "O que vamos construir" com diagrama.

## 2. O problema

Mostre o problema antes da solução, com exemplo concreto.

## 3. Modelo mental

Explique o conceito de forma simples.

## 4. Implementação

```ts title="exemplo.ts"
// código executável — informe linguagem/versão
```

Explique o código logo depois.

## 5. Falhas e trade-offs

O que essa solução resolve e o que cria. Erros comuns.

<Summary>

- takeaway 1
- takeaway 2
- takeaway 3

</Summary>

<NextSteps href="/proximo-post" title="Próximo post da série">
Uma frase que conecta o que foi visto com o que vem a seguir.
</NextSteps>

<SkillsGained skills={["Skill 1", "Skill 2", "Skill 3"]} />

<SeriesNav
  seriesName="Minha Trilha — 01/12"
  prev={{title: "Post anterior", href: "/post-anterior"}}
  next={{title: "Próximo post", href: "/proximo-post"}}
/>
```

Template canônico em `.ai/templates/blog-post.mdx`.

## Estilo

- Frases curtas, parágrafos 2–4 linhas
- Explicar termo antes de usar
- Um exemplo concreto > definição abstrata
- Código sempre seguido de explicação — nunca solto
- Voz: engenheiro sênior explicando algo de que gosta — técnico, direto, específico
- Sem "prosa roxa", sem marketing, sem jargão
- Humor só se servir ao conteúdo (máx. 1 piada/post)

## Código

- Fonte JetBrains Mono (tema `src/css/custom.css:2`), highlight Prism `github` light / `oneDark` dark (`docusaurus.config.ts:91`)
- Sempre informar linguagem, versão quando relevante e como rodar
- Blocos com `title="..."` quando fizer sentido (` ```ts title="exemplo.ts" ``` `)
- Highlight de linha quando chamar atenção (`// highlight-next-line`)
- Código executável: inclua imports, config e resultado esperado

## Componentes de blog

Todos em `src/components/blog/` e estilizados via `.blogSection` em `src/css/custom.css:79`:

| Componente | Classe | Borda | Uso |
|---|---|---|---|
| `WhatYouWillLearn` | `blogSection--learn` | `#0969da` azul | Antes do conteúdo |
| `Prerequisites` | `blogSection--prereqs` | `#8b949e` cinza | Após learn |
| `Summary` | `blogSection--summary` | `#238636` verde | Fecho do artigo |
| `NextSteps` | `blogSection--next` | `#8957e5` roxo | Após summary |
| `SkillsGained` | `blogSection--skills` | `#d29922` amarelo | Pills `9999px` |
| `SeriesNav` | `seriesNav` | neutro | Só se em trilha |

Nunca pular Resumo → Próximo → Skills → SeriesNav.

## Trilhas sugeridas

- Backend Engineering: HTTP → REST → Idempotência → Retries → Rate Limiting → Caching → N+1 → Transactions → Concorrência → Message Queues → Event-Driven → Distributed Systems
- Criar trilha nova quando houver 3+ posts no tema (iOS, Go, System Design, Databases, Arquitetura)

## Tradução

Nunca automática. Só quando usuário pedir explicitamente "traduz esse post":

1. Copie canônico para `i18n/<locale>/docusaurus-plugin-content-blog/<mesmo-nome>`
2. Mantenha `slug`, `authors`, `tags`
3. Traduza `title`, `description` e todo conteúdo
4. Nunca edite canônico em `blog/` para refletir traduções

## Verificação antes de entregar

- `npm run build` passa sem erro (broken links quebram build — `onBrokenLinks: 'throw'`)
- `npm run typecheck` passa
- Traduções revisadas por humano antes do push
