# lucabelezal.github.io

Blog de aprendizados em engenharia de software — **https://lucabelezal.github.io**

> Docusaurus 3 + blog na `/` (i18n: pt-BR, en, es)

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Deploy automático via GitHub Actions (`.github/workflows/deploy.yml`):
- `git push` na `main` → build 3 locales → `actions/deploy-pages@v4` → https://lucabelezal.github.io
- Em **Settings → Pages → Source: GitHub Actions** (já configurado)

Legado (não usado aqui):

```bash
USE_SSH=true npm run deploy
```
