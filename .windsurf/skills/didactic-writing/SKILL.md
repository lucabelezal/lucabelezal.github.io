---
name: didactic-writing
description: >
  Escreve qualquer conteúdo técnico no formato didático de professor (estilo
  livro/capítulo do Elemar Jr): conceito → porquê → exemplo completo →
  execução → explicação → armadilha → regra → exercício. Use quando o usuário
  pedir para escrever "como professor", "formato aula", "estilo Elemar", "que
  um professor mostre com código", "capítulo técnico", ou quando o texto atual
  está corrido, condensado ou parece referência em vez de ensino. Dois modos:
  capítulo avulso estilo livro (Modo A) ou post do blog Docusaurus (Modo B,
  respeitando o esqueleto editorial). Ativa com "escreve como professor",
  "quero que um professor mostre", "estilo elemarjr", "formato aula", "deixa
  isso mais didático", "está corrido", "capítulo técnico", "aula sobre X".
---

# Didactic Writing — escrita técnica didática, professor conduzindo

## Objetivo

Transformar qualquer assunto técnico em ensino conduzido por um professor, no
padrão dos capítulos do livro de arquitetura do Elemar Jr (elemarjr.com). A
referência que originou este padrão: "Arquitetura de Software — Vol. 1",
capítulos 1.1, 1.2 e 1.3.

A skill resolve o sintoma recorrente: texto que parece **documentação ou
referência** — condensado, frases corridas, código como excerto solto, conceitos
pulados sem ponte — em vez de **aula** — definição clara, exemplo completo,
execução, explicação, armadilha, regra prática e exercício.

Esta skill governa o **estilo** e a **estrutura didática**. Para as regras
editoriais do blog (frontmatter, componentes, tradução), a fonte continua sendo
`AGENTS.md` e a skill `code-blog-content`.

## A voz do professor

Antes de escrever, assuma: você é um professor experiente que ama o assunto e
quer que o aluno saia sabendo *por que* as coisas são como são — não apenas
*como* digitar.

1. **Conduza, não documente.** Cada conceito segue uma progressão:
   conceito → porquê → exemplo → execução → explicação → armadilha → regra →
   exercício. Nunca entregue só o "de-para" ou só o resumo.
2. **Defina antes de nomear.** Explique o termo antes de usá-lo. Termo central
   do texto merece formalização em callout **Definição (Proposta)**.
3. **Exemplo real e completo.** Mostre código que roda (linguagem, imports,
   como executar, saída esperada). Excerto solto sem execução é referência, não
   aula. Um exemplo concreto vale mais que uma definição abstrata.
4. **Fundamente com autoridade.** Quando o assunto permitir, apoie em citação
   de fonte confiável (padrão IEEE, livro, autor consagrado) com link de acesso.
   Citação vira destaque; fonte vira ponte para quem quer aprofundar.
5. **Trade-off honesto.** "X resolve A, mas cria B." Sempre deixe claro o que a
   escolha ganha e o que cede. Nunca transforme comparação em "X é melhor".
6. **Progresso visível.** Texto longo se organiza: seções numeradas, sumário
   ("Conteúdo") no topo, boxes de regra, fechamento com atividades e ponte para
   o próximo passo. O aluno precisa sentir que avançou.
7. **Frases completas e calmas.** Proibido telegráfico e floreio. Frase corrida
   (3+ ideias) é reescrita em duas. Uma ideia por frase, parágrafos curtos
   (2–4 linhas no blog; blocos curtos no livro).
8. **Um conceito por vez.** Não empilhe conceitos novos sem ponte entre eles.
   Quando o próximo depender de um anterior, diga "lembre do que vimos".

## Como reescrever texto corrido / condensado

Quando o usuário entrega um texto atual confuso ("está corrido", "a explicação
está confusa", "faltam exemplos") e pede para melhorar:

1. Leia o texto inteiro. Marque (a) frases com 3+ ideias, (b) transições
   puladas, (c) código-referência sem execução, (d) conceito usado sem definir.
2. Para cada marcação, aplique o reparo:
   - frase corrida → divida; a segunda frase explica ou exemplifica a primeira;
   - conceito pulado → acrescente parágrafo de definição ou callout;
   - código excerto → vire exemplo completo e executável com saída esperada;
   - comparação rasa ("X não tem Y") → acrescente o *porquê* e o *no lugar do
     quê*;
3. Releia em voz alta mental. Se um parágrafo não responde "e daí?", ele ainda
   é referência — reescreva com intenção de ensino.
4. Confira o checklist de qualidade (abaixo) antes de entregar.

## Modo A — Capítulo / artigo avulso estilo livro (Elemar)

Para conteúdo autônomo de leitura longa (guia, capítulo, trilha didática).
Estrutura-tipo:

```
Título (claro e específico)
[Versão + data — opcional]

Epígrafe: citação curta e relevante de autoridade, com autor.

Conteúdo
1. <seção>
2. <seção>
...        ← sumário numerado que guia a leitura

<Lead: 1–2 parágrafos de propósito — por que este capítulo importa>

## 1. <seção>
Conceito → definição → explicação → exemplo → aplicação.

## 2. <seção>
... (cada seção pode repetir o padrão didático interno)

// TODO  (ou "Antes de avançar")
Atividades reflexivas ou exercícios (3–5) que consolidam o capítulo.

Referências
Fontes citadas.

<Ponte: "Este é o início de uma longa jornada..." → o que vem no próximo capítulo>
```

### Callouts recorrentes (estilo Elemar)

- **Definição: 'X' (Proposta)** — formaliza termo central em linguagem neutra e
  precisa.
- **Saiba mais** — aprofundamento opcional, não bloqueia a leitura principal.
- **Regra prática** — imperativo curto que vira hábito: "Habitue-se a...",
  "Lembre-se sempre...", "Ao fazer X, considere Y". Uma frase para guardar.
- **Citação em destaque** — autoridade + origem; quando on-line, com link
  ("Acessar livro/vídeo/episódio").
- **Trade-off** — quando duas direções conflitam, exponha o que cada lado ganha
  e perde.

### Fechamento

Termine sempre com atividade (`// TODO`), referências e ponte para o próximo
passo. Nunca deixe o capítulo "no ar".

## Modo B — Post do blog Docusaurus

Quando o destino é um post do blog deste repo:

1. Respeite o esqueleto editorial e os componentes — consulte `AGENTS.md` e a
   skill `code-blog-content` (frontmatter mínimo, `{/* truncate */}`, componentes
   `WhatYouWillLearn`/`Prerequisites`/`Summary`/`NextSteps`/`SkillsGained`,
   fechamento Resumo → Próximo → Skills).
2. Idioma canônico: pt-BR. Traduções só sob demanda explícita.
3. Aplique a **voz didática por dentro** das seções numeradas já existentes
   (Contexto → Problema → Modelo mental → Implementação → Falhas): cada seção
   ganha progressão professor; cada conceito ganha exemplo completo + saída.
4. Callouts do estilo livro viram **tabelas, blockquotes, subseções e caixas**
   dentro do post — mantendo a semântica (Definição, Saiba mais, Regra prática,
   Trade-off).
5. Conflito de escala: se o conteúdo didático completo estourar o formato de um
   post (ex.: guia de migração de linguagem inteiro), **proponha dividir em
   série ou manter um post-mapa + posts de aprofundamento**, em vez de criar um
   post gigante. Valide com o usuário antes de escrever.

## Exemplo: telegráfico ✗ → professor ✓

Assunto: argumento padrão em Go (migrante Swift).

**✗ Referência (o que evitar):**
> Em Go não tem argumento padrão: o Go recusou de propósito. Você cria outra
> função ou usa variadic.

**✓ Professor (o que queremos):**
> Em Swift, você dá um valor padrão direto na assinatura:
>
> ```swift
> func saudar(nome: String = "Mundo") {
>     print("Olá, \(nome)")
> }
>
> saudar()        // Olá, Mundo
> saudar(nome: "Ada")
> ```
>
> Agora tente o mesmo em Go: `func saudar(nome string = "Mundo")` — não compila.
> Go não tem argumento padrão, e isso não foi esquecimento.
>
> **Por que o Go recusou.** Pense no que um default permite: você adiciona um
> parâmetro novo no meio da lista e todos os chamadores continuam compilando.
> Parece conveniente, mas esconde a mudança de contrato — o código passa a se
> comportar diferente sem que ninguém tenha decidido nada naquele ponto de
> chamada. O Go prefere que a escolha fique visível onde ela acontece.
>
> **Como o Go resolve.** Com uma segunda função que carrega o comportamento
> completo:
>
> ```go
> func saudar(nome string) {
>     fmt.Println("Olá,", nome)
> }
>
> // quem quer o default chama esta:
> func saudarDefault() {
>     saudar("Mundo")
> }
> ```
>
> Ou, quando o número de valores varia, com variadic (`...string`).
>
> **Regra prática.** No Go, default de função é função nova. Se o default faz
> sentido, ele merece um nome.
>
> **Tente.** Reescreva `conectar(timeout: TimeInterval = 30)` em Go usando uma
> função `conectar()` que chama `conectarComTimeout(30)`.

Compare os dois: o ✗ informa, o ✓ ensina. É essa a diferença que esta skill
garante.

## Anti-padrões

- **Tabela de equivalência como aula.** Tabela/de-para é referência de consulta,
  não ensino. Use para resumir no fim; nunca como a seção central.
- **Excerto solto.** Código sem `package main`/imports/como rodar/saída é
  vitrine, não aula.
- **"X é melhor".** Comparação vira propaganda; mantenha o trade-off honesto.
- **Empilhar conceito.** Passar de um conceito a outro sem ponte perde o aluno.
- **Parágrafo-índice.** Frase que só lista ("há três pontos: A, B e C" e segue)
  sem desenvolver cada um.
- **Frase corrida.** Três ideias numa sentença só, exigindo releitura.
- **Texto telegráfico.** Fragmento sem verbo para parecer "direto" — parece
  resumo de slide, não professor.

## Checklist de qualidade

Antes de entregar, confirme:

- [ ] Termo central definido antes de usado (callout **Definição** quando couber)
- [ ] Exemplo concreto antes de abstração; código completo, executável, com
      saída esperada quando o assunto é linguagem/API
- [ ] Pelo menos um **porquê** (decisão de design / motivo) por conceito
- [ ] Trade-off explícito quando há escolha entre alternativas
- [ ] Pelo menos uma **regra prática** memorável por seção grande
- [ ] Nenhuma frase corrida ou telegráfica (leitura em voz alta passa)
- [ ] Transição explícita entre seções consecutivas
- [ ] Fechamento: atividade/exercício + referência + ponte para o próximo passo
      (Modo A); Resumo → Próximo → Skills (Modo B)
- [ ] Escala coerente com o destino (post não vira livro sem consultar o usuário)
