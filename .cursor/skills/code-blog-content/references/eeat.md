# E-E-A-T no blog

O Google avalia Experience, Expertise, Authoritativeness e Trustworthiness.
**Confiança vem primeiro**: página sem autoria, fonte e data não ganha E-E-A-T
nem com conteúdo bom.

Este blog é de autor único. Nada de byline genérico.

## Autoria

- Sempre `authors: [lucabelezal]` no frontmatter (autor em `blog/authors.yml`).
- Nunca "Admin", "Equipe", "Redação" ou post sem autor.
- Um autor por post.

## Experiência: só com evidência

Afirmação em primeira pessoa só entra quando dá para mostrar o lastro. Nunca
escreva "eu testei" para parecer experiente.

| Padrão | Só use quando |
| --- | --- |
| "rodei isso e deu…" | a saída/benchmark está no post |
| "no meu caso deu X ns" | o comando e o número aparecem |
| "o erro que vejo sempre é…" | há exemplo concreto do erro |
| "depois de migrar para Y…" | o antes/depois é descrito |

Para este blog, a evidência mais forte é **código que roda + saída real**:
`go test -race`, `go test -bench`, `curl`, log de erro. Isso vale mais que
qualquer "minha experiência mostra que".

## Expertise e autoridade

- Profundidade real: cobrir o *porquê* da decisão, não só o *como*.
- Linkar fonte primária (go.dev, docs oficiais, spec) quando citar comportamento.
- Autoridade externa não se escreve, se constrói (links, citações, palestras).

## Confiança (peso maior)

| Sinal | Como aparece aqui |
| --- | --- |
| Data | frontmatter/`date` sempre; atualização relevante vira nota |
| Fonte | link para a doc oficial quando afirmar um comportamento |
| Metodologia | quando há número, dizer como foi medido (comando/versão) |
| Correção | "Atualizado em …: corrigido …" quando mudar algo factual |
| Autor | `authors.yml` com nome e links |

## Framing por risco do tema

- **Tema técnico** (a maioria aqui): exige evidência proporcional à afirmação.
  Se o post recomenda uma ação (config, transação, concorrência), mostre o
  teste/cenário. Análise neutra e bem-fonteada também é válida.
- **Tema sensível** (web é pouco provável, mas se aparecer: segurança,
  autenticação, dados de usuário): redobre fonte, caveat e limite explícito.

## Anti-padrões

| Evite | Problema |
| --- | --- |
| "Como especialista em…" | autoridade autodeclarada, sem prova |
| "Estudos mostram…" (sem link) | apelo de autoridade vazio |
| "Todo mundo sabe que…" | infalsificável |
| "Confie em mim" | pede confiança em vez de ganhar |
| "Neste artigo veremos…" | filler, não é sinal de experiência |
| Afirmação em 1ª pessoa sem lastro | performa experiência |

## Checklist do post

- [ ] `authors: [lucabelezal]` e `date`
- [ ] Toda afirmação forte com fonte ou código/saída
- [ ] Se há número, há como foi medido
- [ ] Nenhuma frase usa "nós/eu testamos" sem mostrar o teste
- [ ] Links para fonte primária ao citar comportamento

---

Adaptado de `claude-blog/skills/blog/references/eeat-signals.md` (MIT,
AgriciDaniel/claude-blog). Reescrito para pt-BR e para este blog (autor único,
Docusaurus, conteúdo técnico).
