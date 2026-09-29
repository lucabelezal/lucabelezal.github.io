# Shortly — web (Next.js)

App React/Next do encurtador de URL. Companheiro do projeto
[Design a URL Shortener](../projects/url-shortener.mdx) do blog.

## Rodar

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — build de produção
- `npm run start` — serve o build
- `npm run typecheck` — `tsc --noEmit`

## O que faz

- **Shorten a Link:** Long URL → link curto (código base 62 de 7 caracteres).
- **Your Recent Links:** lista dos últimos links (localStorage).
- Botões: **Visit URL**, **Copy** (QR e Share ficam para depois).
- **Shorten Another Link:** limpa o resultado e volta ao formulário.

## Como o "encurtar" funciona (mock local)

Não há backend. O código curto é gerado no navegador e o mapeamento fica no
`localStorage`. O link curto aponta para `/r/<code>`, uma rota do próprio app que
lê o `localStorage` e redireciona para a URL longa — então funciona de verdade
no mesmo navegador.

- Código: `lib/shorten.ts` (`generateCode`, `buildShortUrl`, `normalizeUrl`).
- Persistência: `lib/storage.ts`.
- UI: `components/Shortener.tsx`.
- Redirect: `app/r/[code]/page.tsx`.

## Domínio próprio

Por padrão o link curto usa a origem do app (`window.location.origin`). Para usar
um domínio próprio, defina:

```bash
# web/.env.local
NEXT_PUBLIC_SHORT_BASE=https://sho.rt
```

Com um domínio externo, o `/r/<code>` precisa existir lá (não é o caso do mock).

## Próximos passos

- QR Code (aba já existe, desabilitada).
- Share (Web Share API).
- Backend real (Go) — trocar o mock por uma API de encurtamento.
