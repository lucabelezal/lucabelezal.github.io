# Templates de post

Nosso esqueleto fixo é Contexto → Problema → Modelo mental → Implementação →
Falhas → Resumo → Próximo. O template escolhe **como preencher** esse esqueleto
para o tipo de conteúdo. Um post usa um template.

Regra: o template é andaime, não molde. Sempre respeite o esqueleto e os
componentes (`WhatYouWillLearn`, `Prerequisites`, `Summary`, `NextSteps`).

## Como escolher

| Se o post é… | Template | Foco |
| --- | --- | --- |
| "como fazer X em Go" | Tutorial | Passos que rodam, saída real |
| "por que X funciona assim" | Conceito | Modelo mental + exemplo |
| "X vs Y" | Comparação | Critério de decisão + tabela |
| "medimos X e deu…" | Dados | Metodologia + número + leitura |
| "o que é X" (referência) | Explicador | Definição → aplicação → limites |

## Tutorial

Para ensinar um processo. O leitor executa e chega no mesmo resultado.

- Cada passo com código completo (imports, como rodar).
- Saída esperada logo depois do comando.
- Um erro comum por passo, com a correção.
- Fecha com o que variar depois.

## Conceito

Para explicar por que algo é do jeito que é. Ex.: slices, interfaces.

- Problema concreto primeiro ("o que quebra sem entender isso").
- Modelo mental em uma frase + um diagrama simples.
- Exemplo mínimo que expõe o comportamento.
- Limite: onde o modelo mental deixa de valer.

## Comparação

Para decidir entre alternativas. Ex.: stdlib vs framework, channel vs mutex.

- Defina o critério antes de comparar (senão é opinião).
- Tabela: alternativa × o que ganha × o que perde.
- Um cenário em que cada lado é a escolha certa.
- Nunca coroe um vencedor universal.

## Dados

Para um número medido. Ex.: benchmark de worker pool, `-race`.

- Metodologia: comando, versão, máquina, tamanho do teste.
- O número, não uma impressão.
- O que ele significa e o que **não** significa.
- Caveat explícito (carga, ambiente).

## Explicador

Para referência/consulta. Ex.: style guide, roadmap.

- Definição curta.
- Como se aplica na prática.
- Exceções e trade-offs.
- "Quando NÃO usar".

## Sinais de que o template está errado

- Post de dados sem metodologia → falta template Dados.
- "Como fazer" sem código que roda → falta Tutorial.
- Comparação sem critério → vira opinião.
- Conceito sem exemplo → vira definição de dicionário.

---

Adaptado dos 12 templates de `claude-blog` (MIT, AgriciDaniel/claude-blog:
`how-to-guide`, `tutorial`, `comparison`, `data-research`, `faq-knowledge`,
`pillar-page`), reduzido ao que serve a este blog técnico e remapeado para o
nosso esqueleto editorial.
