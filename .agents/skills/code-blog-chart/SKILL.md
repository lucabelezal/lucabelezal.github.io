---
name: code-blog-chart
description: >
  Gera gráficos SVG inline (dark-mode-aware, acessíveis) para posts do blog
  Docusaurus a partir de um JSON simples, usando o gerador determinístico
  scripts/blog-chart/generate_chart_svg.py. Use quando o post tiver dados
  comparáveis (benchmark Go, throughput, latência, antes/depois, partes de um
  todo). Ativa com "gráfico do post", "chart", "benchmark em gráfico",
  "visualizar esses números", "svg do post".
license: MIT
---

# Code Blog Chart — SVG inline para posts

Transforma dados de um post em um gráfico SVG inline, acessível e que funciona
nos temas claro e escuro. Não é biblioteca de JS: o script gera markup pronto
para colar no `.mdx`.

Base: script `scripts/blog-chart/generate_chart_svg.py` (claude-blog, MIT,
AgriciDaniel/claude-blog), adaptado para este tema.

## Quando usar

Use quando o post tem números que o leitor precisa **comparar de relance**:

- Benchmark Go (`go test -bench`): throughput, ns/op, allocs/op.
- Antes/depois de uma otimização.
- Distribuição (partes de um todo).
- Tendência ao longo do tempo.

Não use para um número só, nem para dado que a tabela já resolve melhor.
Gráfico em post técnico precisa de **fonte e contexto** — sempre.

## Tipos

| Padrão do dado | Tipo |
| --- | --- |
| Ranking / melhoria percentual | `horizontal_bar` |
| Antes vs depois | `grouped_bar` |
| Partes de um todo | `donut` |
| Tendência no tempo | `line` |
| Correlação / fatores ordenados | `lollipop` |
| Distribuição / faixa | `area` |
| Pontuação multidimensional | `radar` |

## Como gerar

1. Escreva o JSON do gráfico (veja `references/chart-example.json`):

```json
{
  "type": "horizontal_bar",
  "title": "Throughput por número de workers (tarefas/s)",
  "source": "go test -bench, Go 1.27, MacBook M3",
  "data": [
    {"label": "1 worker", "value": 1200},
    {"label": "8 workers", "value": 6100}
  ]
}
```

2. Rode o gerador (escrevendo o JSON dentro do repo — o script recusa caminhos
   com symlink, e `/tmp` no macOS é symlink):

```bash
python3 scripts/blog-chart/generate_chart_svg.py --input chart.json --format mdx > chart.mdx
```

3. Cole o conteúdo no post e apague a linha `<figure className="blog-chart">`
   duplicada se colar dentro de outro wrapper. O CSS de `.blog-chart` já está
   em `src/css/custom.css`.

## Regras de estilo (não negociáveis)

- Texto do gráfico: `fill="currentColor"` — herda o tema. **Não** fixe cor de
  texto.
- Fundo: transparente (a moldura é do `.blog-chart`).
- Acessível: mantenha `<title>`, `<desc>` e `aria-labelledby` (o script gera).
- Não dependa só de cor: rótulos diretos/legenda já vêm no markup.
- Paleta do script: laranja/azul/roxo/verde. Pode trocar os `fill="#..."` se
  precisar alinhar com as cores de tag do blog, mas verifique contraste nos
  dois temas antes.

## Fonte e honestidade

- O campo `source` é obrigatório na prática: comando, versão, máquina, tamanho
  da amostra. Sem isso o número não vale (ver `code-blog-content/references/eeat.md`).
- Não arredonde para "melhorar" a história; mostre o número medido.
- Se o benchmark tem caveat (carga, ambiente), diga no texto perto do gráfico.

## Checklist

- [ ] Dado pede comparação visual (não é número solto)
- [ ] `source` com comando/versão/ambiente
- [ ] JSON gerado dentro do repo (sem `/tmp`)
- [ ] `--format mdx` e colado no `.mdx`
- [ ] `<title>`/`<desc>`/`aria-labelledby` presentes
- [ ] Confere nos temas claro E escuro
- [ ] Texto ao redor explica o que o gráfico significa (e o que não significa)
