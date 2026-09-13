# Voz do blog

Perfil de estilo do autor, para revisar texto contra a nossa voz real.
Gerado por `style_learn.py` (claude-blog, MIT) sobre os 22 posts canônicos em
`blog/`, e complementado pelas regras manuais de `.ai/writing-guide.md` e da
skill `didactic-writing`.

## Números medidos (amostra: 22 posts, ~31.8k palavras)

- Frase: média **21 palavras**, mediana **16**. Muita variação (desvio 20) —
  frase curta colada em frase longa é a nossa cadência.
- Voz passiva: **0,13%** — praticamente inexistente. Bom.
- Transições explícitas ("além disso", "portanto"): **0%**. Não usamos conectivo
  de enfeite.
- Primeira pessoa: **0,19/1.000 palavras** — raríssima. O texto é impessoal.
- Pergunta em heading: **1,6%** — H2 quase sempre declarativo.
- Muletas de IA: **0/1.000**. Manter.
- Parágrafos: **61% com menos de 40 palavras**, 32% entre 40–80. Bloco curto é
  a regra.

## Descritores de tom

Cadência equilibrada, ritmo variado, voz ativa, direto, sóbrio, sem enfeite.

## Marcas de vocabulário (nossas, não ruído)

`regra prática`, `modelo mental`, `zero value`, `por que`, `não existe`,
`que você`. Termos técnicos repetidos de propósito (não parafrasear o mesmo
conceito com sinônimos).

## Regras que os números não pegam

- Uma ideia por frase. Frase com 3 ideias vira duas.
- Parágrafo 2–4 linhas.
- Explicar o termo antes de usar.
- Exemplo concreto antes da abstração.
- Código sempre seguido de explicação.
- Cada seção grande fecha com uma **regra prática** memorável.
- Sem prosa roxa, sem marketing, sem jargão de mercado.
- Humor no máximo 1 por post, e só se servir ao conteúdo.

## Como usar

Na revisão de um post, comparar contra estes números:

- Se a média de frase subir de ~25 e a variação cair (ritmo uniforme), revisar.
- Se aparecer conectivo de transição em série, cortar.
- Se aparecer primeira pessoa performática ("eu testei") sem evidência, cortar
  (ver `references/eeat.md`).
- Se aparecer muleta da lista de `references/anti-slop.md`, cortar.

## Reproduzir

```bash
python3 <claude-blog>/scripts/style_learn.py blog/ --format markdown
```

---

Perfil automático de `claude-blog/scripts/style_learn.py` (MIT,
AgriciDaniel/claude-blog); lista de frases-assinatura limpa (imports do MDX
removidos). Regras manuais deste repo.
