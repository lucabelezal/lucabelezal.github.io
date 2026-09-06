# Guia de revisão — go-by-example (pt-BR)

Régua editorial para reescrever as páginas de `go-by-example/` em tom de
**professor ensinando**, no modelo híbrido. Fonte canônica de voz e regras:
`AGENTS.md` (regras de escrita) e `skills/code-blog-content`.

## Formato híbrido por página

Cada página mantém o card interativo `CodeExplanation` e ganha prosa ao redor.

1. **Frontmatter** — só `title`. Nome de arquivo, slug, imports e link
   `go.dev/play` **inalterados** (URLs e sidebar estáveis).
2. **Intro curta** (1-2 §§, antes do card): qual problema resolve, quando usar,
   pré-requisito, o que a página vai ensinar. Sem `#` duplicado (o `title` já
   vira H1 do tema).
3. **Card `CodeExplanation`**: pode haver **mais de um card** por página quando uma variação central do tema merece demonstração própria (ex.: página de funções ganha um 2º card de callbacks). O card canônico da referência gobyexample fica como primeiro.
   - `title` = nome real do arquivo de exemplo (`hello-world.go`), não o nome
     da página — ensina a convenção de nome de arquivo.
   - `sections` reescritas em voz de professor: nomear o conceito, o que o
     código faz e **por quê**. 1-3 frases cada.
   - Última section = `Saída:` com **saída real** capturada de `go run`/`go
     test` (não anotada à mão). Saída não-determinística (data/hora, rede,
     concorrência) documentada com comentário no bloco do terminal.
4. **Prosa após o card**, só onde agrega (não encher linguiça). Seções típicas:
   - `## Por que <X>?` — desmontar conceito que confunde (ex.: dois `main`,
     *zero value*, constante sem tipo, sem `break` no switch).
   - `## Em código real` — onde o padrão aparece de verdade e composição com
     páginas vizinhas (links internos para docs do mesmo diretório).
   - `## Armadilhas comuns` — erros frequentes + gotcha da skill `golang-*` do
     tópico. Bullets curtos.
   - `## Pratique` — 3 exercícios: reproduzir, modificar, aplicar.
   - `## Próximo passo` — link para a página seguinte na ordem do sidebar.
5. Sem seções de blog (`authors`, `truncate`, `WhatYouWillLearn` etc.) — isto é
   conteúdo de docs, não post.

## Tom

- Engenheiro sênior explicando algo de que gosta: técnico, direto, específico.
- Explica causa/efeito: "por que esse resultado?" sempre que a saída não for
  óbvia.
- Conceito novo entra pelo **problema** que resolve, não pela sintaxe.
- Tabela de comparação quando ajuda (ex.: formas do `for`, tipos).
- Sem floreios, sem jargão de marketing, sem emojis.

## Processo por página

1. Carregar skill do tópico: `golang-concurrency` (bloco 06), `golang-testing`
   (12), `golang-cli`/`spf13-cobra` (12), etc., para precisão técnica e
   idiomatismo. Fundamentos não exigem skill específica.
2. Extrair o código do card → rodar com Go real em dir temporário → colar
   saída verdadeira. Exemplo quebrado → corrigir.
3. Reescrever MDX híbrido.
4. `npm run build` passa (broken links quebram o build).

## Regras de código nos exemplos

- Manter o código como está no site de referência (gobyexample) quando correto;
  espaços em vez de tabs são aceitáveis em bloco de exibição.
- Apontar convenção idiomática quando relevante (early return, `:=`, type
  switch, *zero value*) e explicar, não só citar.
- Quando a saída depende de runtime, mostrar a saída real com comentário
  `# depende de ...` no bloco do terminal.

## Ancoragem de temas avançados

Temas de profundidade entram como seção no corpo de uma página específica
(teaser + cross-link quando têm página futura). Registrar o "lar" evita
duplicar nos blocos seguintes:

- Scheduler/GMP/GOMAXPROCS e concorrência×paralelismo → `28-goroutines`.
- Method sets (receiver ponteiro × interface) → `21-interfaces`; value×pointer
  receiver → `20-methods`.
- *Typed nil* em interface → `21-interfaces`; nil de ponteiro → `17-pointers`.
- Data race / `-race` → `43-atomic-counters`; mutex/deadlock por ordem →
  `44-mutexes`.
- Embedding não é herança / shadowing → `23-struct-embedding`.
- Construtores `New...`/campos exportados → `86-visibility-and-packages`.

## Sequência de revisão

Blocos na ordem da nav (`sidebarsGo.ts`): fundamentos → estruturas de dados →
funções/abstração → tipos/modelagem → erros/packages → concorrência → recursos
da linguagem → texto/serialização → tempo/parsing → cripto/codificação →
arquivos → testes/CLI → networking → SO. Piloto (fundamentos) valida o tom;
blocos seguintes entregues para revisão humana ao fim de cada um.
