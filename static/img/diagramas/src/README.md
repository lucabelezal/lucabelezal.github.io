# Diagramas do guia AWS — fontes

Duas camadas por diagrama:

- **`.excalidraw`** — fonte editável (hand-drawn). Abra no Excalidraw do VS Code,
  ajuste e exporte. Os ícones ficam embutidos como imagens (base64).
- **`../../aws-*.svg`** — versão publicada, theme-aware (segue claro/escuro),
  referenciada nas páginas em `aws-guide/`.

## Arquivos

| Fonte | Publicado |
|---|---|
| `aws-mapa-grupos.excalidraw` | `../aws-mapa-grupos.svg` |
| `aws-espectro-responsabilidade.excalidraw` | `../aws-espectro-responsabilidade.svg` |
| `aws-arquitetura-evolucao.excalidraw` | `../aws-arquitetura-evolucao.svg` |

## Ícones

`icons/*.svg` — glifos próprios (retângulo colorido + rótulo), sem uso de logo
oficial da AWS. Gerados junto com as cenas.

## Regerar

```bash
node scripts/aws-guide-excalidraw.mjs
```

O script reescreve os `.excalidraw` e os ícones. O SVG publicado é mantido à
mão (theme-aware); ao mudar um diagrama, edite a cena, exporte o SVG no
Excalidraw e ajuste a versão publicada.
