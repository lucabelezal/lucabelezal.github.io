---
name: code-blog-ui
description: >
  Analisa referência visual de interface e transforma o design em especificação
  textual detalhada e implementável. Use quando o usuário pedir para analisar
  imagem/screenshot/Figma/URL, transformar design em spec, descrever interface
  para outro modelo implementar, ou criar componente seguindo padrão visual do
  blog. Ativa com "analise essa imagem", "transforme o design em especificação",
  "descreva essa interface", "quero criar esse componente".
---

# Code Blog UI — Referência Visual → Especificação

## Objetivo

Transformar imagem, screenshot ou referência visual em especificação clara o suficiente para outro modelo recriar interface com código.

Ponte: **Referência visual → Especificação textual → Componentes → CSS/Layout → Implementação**

Resultado não é descrição estética. Explica como interface está organizada e quais decisões precisam ser reproduzidas. Não inventar elementos ausentes na referência.

## Regras principais

### 1. Analise primeiro, descreva depois

Antes de escrever spec, identifique:

- estrutura geral da página
- regiões principais
- hierarquia visual
- navegação
- conteúdo principal
- componentes reutilizáveis
- relação entre colunas
- espaçamentos
- tipografia
- cores
- bordas, sombras, ícones
- estados visuais
- comportamento aparente
- elementos responsivos inferíveis

Quando característica não pode ser determinada pela imagem, descreva como **decisão a definir durante implementação**. Não invente.

### 2. Estrutura da página

Comece sempre pela macro-estrutura. Use ASCII:

```text
┌──────────────────────────────────────────────────────────────┐
│ Header                                                       │
├───────────────┬──────────────────────────┬───────────────────┤
│ Sidebar       │ Conteúdo principal       │ Sidebar direita   │
│ Navegação     │ Breadcrumb               │ Neste artigo      │
│ Trilhas       │ Título                   │                   │
│ Categorias    │ Metadata                 │ Conteúdo          │
│ Roadmap       │ Learning objectives      │ relacionado       │
│               │ Artigo                   │                   │
│               │ Código                   │                   │
│               │ Resumo                   │                   │
├───────────────┴──────────────────────────┴───────────────────┤
│ Footer                                                       │
└──────────────────────────────────────────────────────────────┘
```

Explique:

- largura aproximada das regiões
- ordem dos elementos
- alinhamento
- limites de largura (max-width, container)
- relação entre conteúdo e navegação
- comportamento esperado em telas menores

### 3. Componentes

Converta elementos visuais em componentes reutilizáveis. Para blog técnico considere:

`Header`, `Sidebar`, `Breadcrumb`, `ArticleHeader`, `ArticleMetadata`, `LearningObjectives`, `CodeWalkthrough`, `CodeBlock`, `Tip`, `Warning`, `Concept`, `Summary`, `RelatedArticles`, `TableOfContents`, `LearningPath`, `PreviousNextNavigation`, `Footer`

Para cada componente descreva: função, posição, conteúdo, aparência, comportamento, relação com outros.

### 4. Código + explicação

Quando referência usa explicação ao lado do código, preserve relação lado a lado:

```text
┌──────────────────────────────┬──────────────────────────────┐
│ EXPLICAÇÃO                   │ CÓDIGO                       │
│ O que acontece neste trecho  │ nome := "Lucas"              │
│ Explique conceito antes do   │ idade := 31                  │
│ próximo trecho               │ ativo := true                │
└──────────────────────────────┴──────────────────────────────┘
```

Regras: explicação à esquerda, código à direita, syntax highlighting, numeração quando apropriado, botão copiar, destaque trecho relevante, largura suficiente, alinhamento vertical.

Para blocos grandes não force lado a lado:

```text
Explicação
┌─────────────────────────────────────────────────────────┐
│ código                                                     │
│ código                                                     │
└─────────────────────────────────────────────────────────┘
```

Descreva como **componente de ensino**, não tabela.

### 5. Responsividade

Sempre descreva 3 breakpoints:

**Desktop** — manter `Sidebar esquerda | Conteúdo | Sidebar direita`, conteúdo com largura confortável para leitura (640–720px).

**Tablet** — reduzir/ocultar elementos secundários, priorizar conteúdo principal, navegação secundária recolhida.

**Mobile** — nunca 3 colunas. Transformar `Explicação | Código` em `Explicação` + `Código` empilhado, código com scroll horizontal, menu lateral vira drawer/recolhível.

### 6. Tipografia

Descreva hierarquia:

- **H1** — título artigo, grande, pesado, alta prioridade
- **H2** — seções principais
- **H3** — subseções
- **Body** — confortável para leitura longa (17px/1.7 no projeto)
- **Code** — monoespaçada (JetBrains Mono)

Priorizar legibilidade em artigos longos. Sem fontes decorativas. Indicar pesos, tamanhos aproximados, line-height.

### 7. Cores

Descreva por função, não só aparência:

- Background principal → branco/neutro claro
- Header → azul-marinho quase preto
- Texto principal → azul/preto muito escuro
- Texto secundário → cinza
- Links → azul
- Código → fundo escuro ou `f6f8fa` (claro) / `161b22` (dark)
- Cards informativos → fundos suaves por tipo

Especifique: modo claro, modo escuro, contraste, links, código, estados active/hover/selected. No projeto atual: light `#0969da`, dark `#58a6ff`, bg dark `#0d1117`, surface `#161b22` (`src/css/custom.css`).

### 8. Espaçamento

Ritmo consistente, escala:

```text
4px   → detalhes
8px   → pequenos agrupamentos
12px  → componentes
16px  → conteúdo
24px  → seções
32px  → grandes separações
48px+ → mudanças importantes de seção
```

Sem espaçamentos arbitrários por componente.

### 9. Blog técnico — checklist

Priorize: leitura longa, código, navegação entre artigos, busca, breadcrumbs, índice, categorias, trilhas, relacionados, progressão.

Cada artigo deve ter: `Breadcrumb → Título → Descrição → Metadata → Tags → O que vamos aprender → Conteúdo → Código → Dicas/Conceitos → Resumo → Anterior/Próximo`.

### 10. Learning Objectives

Bloco antes do conteúdo:

```text
┌──────────────────────────────────────────────────────────┐
│ 🎯 O que vamos aprender neste artigo?                     │
│ ✓ Conceito 1                                             │
│ ✓ Conceito 2                                             │
│ ✓ Boas práticas                                          │
└──────────────────────────────────────────────────────────┘
```

Deixar claro o que será aprendido e qual conhecimento ao terminar.

### 11. Navegação de aprendizado

Trilha como progressão, estado atual destacado:

```text
ROADMAP GO
✓ Introdução
● Fundamentos da linguagem
○ Standard Library
○ APIs e HTTP
```

### 12. Table of Contents

Para artigos longos, navegação lateral "Neste artigo" numerada. Item da seção atual com destaque visual.

### 13. Conteúdo relacionado

Cards compactos, não competir com artigo:

```text
┌─────────────────────────────┐
│ Tipos de dados em Go        │
│ string, int, float, bool... │
│ 6 min · Iniciante           │
└─────────────────────────────┘
```

### 14. Estilo visual

Transmitir: engenharia, documentação técnica, qualidade, clareza, confiança, simplicidade, foco no conteúdo.

Evitar: excesso gradientes/animações, visual landing page, elementos decorativos, cards desnecessários, fontes extravagantes, excesso cores. Conteúdo é elemento visual dominante.

## Resultado esperado — ordem obrigatória

1. **Visão geral** — objetivo visual da interface
2. **Estrutura** — ASCII macro
3. **Header** — todos elementos
4. **Sidebar** — navegação e estados
5. **Conteúdo principal** — hierarquia artigo
6. **Componentes especiais** — Learning Objectives, Code Walkthrough, Tip, Summary, Related
7. **Código** — como blocos devem aparecer
8. **Sidebar direita** — TOC e conteúdo relacionado
9. **Footer** — estrutura e links
10. **Design system** — cores, tipografia, espaçamento, bordas, radius, sombras, ícones
11. **Responsividade** — Desktop, Tablet, Mobile
12. **Componentes reutilizáveis** — lista para implementar
13. **Regras de implementação** — decisões que dev/modelo precisa respeitar

## Regra final

Não descreva só "como página parece". Descreva como funciona visualmente e como elementos se relacionam, para outro modelo implementar sem re-interpretar referência. Spec deve ser concreta o suficiente para gerar: `Referência → Descrição → Componentes → CSS/Layout → Implementação`.
