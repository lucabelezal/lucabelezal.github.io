# Writing Guide — lucabelezal.github.io

## Objetivo

Ensinar conceitos de engenharia de software através de **problemas reais**,
com texto confortável para leitura longa e código fácil de copiar/executar.

## Estrutura obrigatória (sempre nessa ordem)

1. **Título H1** — claro e específico (`# Idempotência em APIs`)
2. **Lead** — 1 parágrafo que responde "por que devo me importar?"
   - Logo após, a introdução curta + `{/* truncate */}`.
3. **O que vamos aprender** — lista com `WhatYouWillLearn`
4. **Pré-requisitos** — lista com `Prerequisites` (HTTP básico, REST, etc.)
5. **1. Contexto** — para onde o leitor vai (e opcional "O que vamos construir" com diagrama ASCII)
6. **2. O problema** — mostre o problema antes da solução
7. **3. Modelo mental** — explicação simples do conceito
8. **4. Implementação** — código executável (linguagem + versão + dependências + resultado esperado)
9. **5. Falhas e trade-offs** — "X resolve A, mas cria B"; erros comuns
10. **Resumo** — `Summary` com 3–5 bullets
11. **O que estudar depois** — `NextSteps` com link p/ próximo post
12. **Skills desenvolvidas** — `SkillsGained` (✓ idempotency, ✓ HTTP semantics…)
13. **Navegação de série** — `SeriesNav` quando o post pertence a uma trilha

> Checklist IA: nunca pule 10→13; todo post termina com Resumo + Próximo + Skills + (se em série) SeriesNav.

## Estilo

- Frases curtas, parágrafos de 2–4 linhas.
- Explicar o termo antes de usá-lo.
- Um exemplo concreto > definição abstrata.
- Código sempre seguido de explicação — nunca solto.
- Sem "prosa roxa", sem marketing.
- Humor só se servir ao conteúdo (máx. 1 piada/post).

## Código

- Fonte monoespaçada JetBrains Mono (já no tema), highlight via Prism (`github` light / `oneDark` dark).
- Sempre informar linguagem, versão quando relevante e como rodar.
- Blocos com nome de arquivo quando fizer sentido (` ```ts title="...” ``` `).
- Highlight de linha quando quiser chamar atenção (`// highlight-next-line`).

## Exemplo de uso em MDX

```mdx
import WhatYouWillLearn from '@site/src/components/blog/WhatYouWillLearn';
import Prerequisites from '@site/src/components/blog/Prerequisites';
import Summary from '@site/src/components/blog/Summary';
import NextSteps from '@site/src/components/blog/NextSteps';
import SkillsGained from '@site/src/components/blog/SkillsGained';
import SeriesNav from '@site/src/components/blog/SeriesNav';

<WhatYouWillLearn>

- o que é idempotência
- por que retries importam
- PUT vs POST

</WhatYouWillLearn>

<Prerequisites>

- HTTP básico
- REST

</Prerequisites>

...

<Summary>

- idempotência evita duplicação em retries
- use Idempotency-Key

</Summary>

<NextSteps href="/blog/retries-e-backoff" title="Retries e Exponential Backoff">
Você já sabe tornar uma operação idempotente. Agora entenda como o cliente decide _quando_ repetir.
</NextSteps>

<SkillsGained skills={["Idempotência", "HTTP", "API design", "Retry handling"]} />

<SeriesNav
  seriesName="Backend Engineering — 03/12"
  prev={{title: "REST API Design", href: "/blog/rest-api-design"}}
  next={{title: "Retries e Backoff", href: "/blog/retries-e-backoff"}}
/>
```

## Trilhas sugeridas

- Backend Engineering (12 posts: HTTP → REST → Idempotência → Retries → Rate Limiting → Caching → N+1 → Transactions → Concorrência → Message Queues → Event-Driven → Distributed Systems)
- iOS, Go, System Design, Databases, Arquitetura — criar quando houver 3+ posts no tema.
