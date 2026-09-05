---
name: code-blog-docusaurus
description: >
  Transforma especificação de UI em componentes Docusaurus/React/TypeScript
  implementáveis. Use quando o usuário pedir para implementar spec visual,
  criar componente de blog, converter design em código Docusaurus, ou aplicar
  padrão visual do blog em novo componente. Ativa com "implemente essa spec",
  "crie componente Docusaurus", "transforme design em código", "converter spec
  em componente", "quero criar esse componente seguindo padrão do blog".
---

# Code Blog Docusaurus — Spec → Código

## Objetivo

Receber especificação textual (saída de `code-blog-ui`) e gerar componentes React/TypeScript para Docusaurus que reproduzam design, reutilizando infraestrutura existente e criando apenas o necessário.

Fluxo: **Spec → Tokens → Layout → Componentes atômicos → Integração → Build**

## Princípios Docusaurus

### Preferir nativo, customizar o mínimo

- Use recursos nativos `preset-classic`, `theme-classic`, `swizzle`, `customCss` (`docusaurus.config.ts:34`)
- Customização via:
  ```
  src/
  ├── components/
  │   ├── blog/              # WhatYouWillLearn, Summary, etc (6 comps)
  │   ├── CodeExplanation/    # explicação | código com sticky
  │   ├── GoExample/          # tabela docs | code (go-by-example)
  │   ├── Scrollycoding/      # scroll-code pattern
  │   └── <NovoComponente>/   # novo componente aqui
  ├── css/custom.css          # Infima vars + overrides
  └── theme/                  # swizzled theme (evitar sem necessidade)
  ```
- Não substituir sistema inteiro de tema sem necessidade. Aparência = identidade própria sobre base sólida Docusaurus.
- `onBrokenLinks: 'throw'` (`docusaurus.config.ts:28`) — todo link interno deve ser válido.

### Stack do projeto

- Docusaurus `3.10` (`package.json`), React 19, TypeScript
- Tema custom `src/css/custom.css`: Inter + JetBrains Mono (`@import` linha 2), paleta GitHub Light `#0969da` / Dark `#0d1117` linha 9/142, Infima vars `--ifm-*`, `prism-react-renderer` `github`/`oneDark` (`docusaurus.config.ts:91`)
- i18n `pt-BR` (default), `en`, `es` — blog route `/`, docs `go-by-example` em `/go` (`docusaurus.config.ts:29/38`)

## Design tokens — mapear spec para `custom.css`

Extraia da spec e traduza para Infima vars já existentes; não crie novo sistema se já existe.

| Spec | Token no projeto | Valor atual |
|------|------------------|-------------|
| Primary | `--ifm-color-primary` | Light `#0969da`, Dark `#58a6ff` |
| Background | `--ifm-background-color` | Light `#ffffff`, Dark `#0d1117` |
| Surface | `--ifm-background-surface-color` | Light `#f6f8fa`, Dark `#161b22` |
| Text | `--ifm-font-color-base` | Light `#24292f`, Dark `#e6edf3` |
| Heading | `--ifm-heading-color` | Light `#1f2328`, Dark `#e6edf3` |
| Code bg | `--ifm-code-background` / `--ifm-pre-background` | Light `#f6f8fa`, Dark `#21262d`/`#161b22` |
| Border | `--ifm-color-emphasis-200` | Light `#d0d7de`, Dark `#30363d` |

- Fontes: `--ifm-font-family-base: Inter`, `--ifm-font-family-monospace: JetBrains Mono` (`custom.css:31/33`)
- Tamanhos: `--ifm-font-size-base: 17px`, `--ifm-line-height-base: 1.7`, body `.blog-wrapper article 1.02rem/1.75` (`custom.css:50`)
- Seções: `.blogSection` com `border-left-width: 4px`, `border-radius: 8px`, variantes `--learn #0969da`, `--prereqs #8b949e`, `--summary #238636`, `--next #8957e5`, `--skills #d29922` (`custom.css:79/95`)

Se spec pedir cor/tipografia/espaçamento novo, avalie: estende `custom.css` com nova var ou reusa existente? Prefira reuso.

## Componentes existentes — reusar antes de criar

### Blog sections (`src/components/blog/`)

Todos seguem padrão:

```tsx
// src/components/blog/WhatYouWillLearn.tsx
export default function WhatYouWillLearn({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--learn">
      <div className="blogSection__title">O que vamos aprender</div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
```

- `WhatYouWillLearn`, `Prerequisites`, `Summary`, `NextSteps`, `SkillsGained` (pills `9999px` `custom.css:101`), `SeriesNav` (`custom.css:117`)
- Use em posts `.mdx` via `import WhatYouWillLearn from '@site/src/components/blog/WhatYouWillLearn'` (ver `.ai/templates/blog-post.mdx:8`)

### CodeExplanation (`src/components/CodeExplanation/`)

Padrão **explicação | código** lado a lado com sticky:

- Props: `{title, code, language='go', locale, sections: {text, highlight?}[]}` (`index.tsx:9`)
- Layout: `grid 1fr 1fr gap 2.5rem max-width 1400px` (`styles.module.css:1`), `left` com `border-left 3px primary`, `right` sticky `top 80px` com `CodeBlock` + `prism-code 14px/1.65`
- Mobile `@media (max-width: 900px)` → `grid 1fr`, sticky vira relative
- Terminal detection: `isTerminalSection` para `Saída:` / `Output:` / `$ go ` → `CodeBlock language="bash" title="Terminal"`

Use como referência para novo `CodeWalkthrough` — copie padrões de grid/sticky se spec pedir lado a lado.

### GoExample (`src/components/GoExample/`)

Tabela `docs | code` (`index.tsx:13`): `<table><tbody>{children}</tbody></table>` com `GoExampleRow` (`docs: ReactNode, code: string, language, title, empty`). Link `go.dev/play/p/${playHash}`. Use para páginas `/go` (`sidebarsGo.ts`, `go-by-example/`).

## Como implementar nova spec

### 1. Tokens primeiro

1. Liste cores/tipografia/espaçamento da spec
2. Mapeie para `custom.css` vars existentes
3. Só adicione novas vars se spec exigir e mate comportamento claro/escuro (`[data-theme='dark']`)

### 2. Layout

- Macro: `Header | [Sidebar | Conteúdo | TOC] | Footer` — use Docusaurus `Layout`, não recrie
- Conteúdo: `max-width 640-720px` confortável, `margin 0 auto`, Infima container
- Responsivo obrigatório: Desktop (3 col), Tablet (colapsa secundário), Mobile (stack + drawer + code scroll). Siga breakpoints de `CodeExplanation/styles.module.css:86` (`900px`).

### 3. Componente atômico

Crie em `src/components/<Nome>/`:

```
src/components/<Nome>/
├── index.tsx           # componente React TS, props tipadas
└── styles.module.css   # CSS Modules, usa var(--ifm-*)
```

Regras:

- Props tipadas com `ReactNode`, `language`, `title` etc.; export default
- Use `@theme/CodeBlock` para blocos código (não `<pre>` cru) — já lida com Prism, copy, title, lineNumbers
- Use `clsx` para condicionais
- CSS Modules com `var(--ifm-*)`, não hardcode cores
- Suporte dark mode: teste com `[data-theme='dark']` — herde vars, não override fixo
- Acessível: semântico (`nav`, `aside`, `article`), contraste, `aria-label` quando icon-only
- Exemplo estrutura:

```tsx
import type {ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type Props = { title: string; children: ReactNode; code?: string; language?: string };

export default function NovoComp({title, children, code, language='ts'}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{children}</div>
      {code && <div className={styles.right}><CodeBlock language={language} title={title}>{code}</CodeBlock></div>}
    </div>
  );
}
```

### 4. Código — regras visuais

- `CodeBlock` com `language`, `title="arquivo.ext"`, `showLineNumbers` quando relevante, `// highlight-next-line` para foco
- Syntax highlighting via `prismThemes.github` / `oneDark` já configurado
- Fundo code: `--ifm-pre-background` (`#f6f8fa` / `#161b22`), borda `1px solid --ifm-color-emphasis-200`, radius `8px`, font `0.9rem`, `prism-code 14px/1.65` (ver `custom.css:63/73`)
- Copy button nativo `CodeBlock`; scroll horizontal em mobile
- Não force lado-a-lado para blocos grandes — use empilhado (explicação acima, code abaixo)

### 5. Integração em MDX

```mdx
import MeuComp from '@site/src/components/MeuComp';

<MeuComp title="Learning Objectives">
  - item
</MeuComp>
```

Registre uso em `.ai/writing-guide.md` se virar padrão editorial.

### 6. Atomic delivery

Entregue um componente por vez: `tokens → layout → componente → review → próximo`. Não gere página inteira de uma vez.

## Checklist antes de entregar

- [ ] Reusa `CodeBlock`, `custom.css` vars, `blogSection` onde couber
- [ ] Suporta light/dark (teste `colorMode: respectPrefersColorScheme` `docusaurus.config.ts:73`)
- [ ] Responsivo: desktop lado-a-lado, mobile empilhado + drawer + code scroll
- [ ] `npm run typecheck` passa
- [ ] `npm run build` passa (3 locales, broken links throw)
- [ ] MDX exemplo funciona copiando template

## Anti-padrões (evitar)

- Criar novo design system do zero quando Infima + `custom.css` já resolve
- Hardcode `#000`/`#fff` — use vars tintadas
- Cards dentro de cards, gradiente roxo-azul neon, ícones redondos genéricos em cada heading
- Animar `width/height` — só `transform/opacity` com `ease-out-quart`
- Inline styles — use CSS Modules
