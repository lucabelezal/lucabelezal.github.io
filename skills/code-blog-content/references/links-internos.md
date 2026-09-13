# Links internos

Link interno distribui autoridade, mostra ao Google (e à IA) como o conteúdo se
relaciona e ajuda o leitor a continuar. É a alavanca de SEO mais barata: dá para
ganhar tráfego sem publicar nada novo.

## Quantos por post

| Tamanho do post | Links internos |
| --- | --- |
| < 1.000 palavras | 3–5 |
| 1.000–2.000 | 5–7 |
| 2.000–3.000 | 7–10 |
| 3.000+ (pilar) | 8–12 |

Regras duras:

- **Mínimo 3** links contextuais por post.
- **Máximo 10** (12 em pilar).
- **Sem órfão**: todo post é linkado de pelo menos um outro.
- **Sem beco sem saída**: todo post linka para pelo menos 3 outros.

## Texto âncora

Descritivo, natural, variado. Se remover o link e a frase ficar esquisita,
reescreva.

| Tipo de âncora | Alvo |
| --- | --- |
| Correspondência exata | 5–10% |
| Parcial | 20–30% |
| Semântica/relacionada | 30–40% |
| Com marca ("o guia de Go") | 10–15% |
| Natural/contextual ("como vimos") | 15–25% |

Nunca use: "clique aqui", "leia mais", "este artigo", URL crua, frase inteira
como âncora, ou a mesma âncora exata para vários destinos.

Neste blog, a âncora natural costuma ser o próprio conceito: `[slices](/slices)`,
`[worker pool](/go-worker-pool)`.

## Onde colocar

| Local | Peso |
| --- | --- |
| Primeiros 2–3 parágrafos | Maior |
| Corpo (contextual) | Alto |
| Transição após H2 | Médio-alto |
| Fim (NextSteps) | Médio |
| Rodapé/sidebar | Baixo |

- O link mais importante vai cedo.
- Espalhe pelo corpo; não concentre tudo no fim.
- `NextSteps` e `SeriesNav` já cobrem o "próximo", mas não substituem links no corpo.

## Mapa do site (hub-and-spoke)

Trilhas são o hub. Cada trilha tem páginas de referência (Go by Example,
roadmap, style guide) e posts que apontam para ela e entre si.

- Hub → todos os spokes.
- Cada spoke → hub.
- Spoke ↔ spoke quando há relação real.

Aqui: hub = `/go` e `/go/roadmap`; spokes = posts de Go e os exemplos.

## Órfão e canibalização

Achar órfão (nenhum link apontando):

```bash
grep -r "/go-slices" blog/ src/ --include="*.mdx" --include="*.tsx"
```

Canibalização: dois posts disputando a mesma intenção. Sintoma: um cai quando o
outro sobe. Resolva **diferenciando** o ângulo ou **mesclando**; nunca deixe os
dois iguais.

## Checklist

- [ ] 3–10 links internos no corpo (fora de NextSteps/SeriesNav)
- [ ] Pelo menos 1 nos primeiros 3 parágrafos
- [ ] Nenhuma âncora genérica ("clique aqui"/"leia mais")
- [ ] Nenhum parágrafo com mais de 2 links internos
- [ ] Post não é órfão (alguém linka para ele)
- [ ] Se é da trilha Go, linka para o hub (`/go` ou roadmap)

---

Adaptado de `claude-blog/skills/blog/references/internal-linking.md` (MIT,
AgriciDaniel/claude-blog), reescrito para pt-BR e para a estrutura Docusaurus
deste blog.
