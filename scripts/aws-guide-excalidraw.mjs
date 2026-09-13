// Gera as fontes editáveis do guia AWS:
//   static/img/diagramas/src/icons/*.svg      (ícones próprios, sem logo oficial)
//   static/img/diagramas/src/*.excalidraw      (cenas abertas no Excalidraw do VS Code)
//
// Os SVGs finais em static/img/diagramas/aws-*.svg são theme-aware e vão pro site.
// Este script mantém a versão editável (hand-drawn) sincronizada com o conteúdo.
// Rodar: node scripts/aws-guide-excalidraw.mjs
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'static/img/diagramas/src');
const iconsDir = join(srcDir, 'icons');
mkdirSync(iconsDir, {recursive: true});

// ---------------------------------------------------------------- ícones
const ICONS = {
  ec2: {color: '#ED7100', glyph: 'EC2'},
  ecs: {color: '#ED7100', glyph: 'ECS'},
  fargate: {color: '#ED7100', glyph: 'FAR'},
  lambda: {color: '#ED7100', glyph: 'λ'},
  rds: {color: '#3B48CC', glyph: 'RDS'},
  dynamodb: {color: '#2E27AD', glyph: 'DDB'},
  s3: {color: '#7AA116', glyph: 'S3'},
  sqs: {color: '#E7157B', glyph: 'SQS'},
  sns: {color: '#E7157B', glyph: 'SNS'},
  eventbridge: {color: '#E7157B', glyph: 'EVB'},
  apigateway: {color: '#E7157B', glyph: 'API'},
  elb: {color: '#8C4FFF', glyph: 'ELB'},
  iam: {color: '#DD344C', glyph: 'IAM'},
};

function iconSvg({color, glyph}) {
  const size = glyph.length > 2 ? 17 : 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="2" y="2" width="60" height="60" rx="14" fill="${color}"/>
  <text x="32" y="33" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${glyph}</text>
</svg>
`;
}

for (const [name, spec] of Object.entries(ICONS)) {
  writeFileSync(join(iconsDir, `${name}.svg`), iconSvg(spec));
}

// ---------------------------------------------------------------- excalidraw
let seed = 1;
const rand = () => (seed = (seed * 9301 + 49297) % 233280) + 1;

function base(type, x, y, width, height, extra = {}) {
  return {
    id: `${type}-${rand().toString(36)}`,
    type,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: rand(),
    version: 1,
    versionNonce: rand(),
    isDeleted: false,
    boundElements: [],
    updated: 1,
    link: null,
    locked: false,
    ...extra,
  };
}

const rect = (x, y, w, h, extra = {}) =>
  base('rectangle', x, y, w, h, {roundness: {type: 3}, ...extra});

const text = (x, y, str, extra = {}) => {
  const fontSize = extra.fontSize ?? 16;
  return base('text', x, y, str.length * fontSize * 0.55, fontSize * 1.25, {
    strokeColor: '#1e1e1e',
    fontFamily: 1,
    fontSize,
    text: str,
    textAlign: 'left',
    verticalAlign: 'top',
    containerId: null,
    originalText: str,
    lineHeight: 1.25,
    baseline: fontSize,
    ...extra,
  });
};

function arrow(x, y, dx, dy, extra = {}) {
  return base('arrow', x, y, Math.abs(dx), Math.abs(dy), {
    roundness: {type: 2},
    points: [
      [0, 0],
      [dx, dy],
    ],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    elbowed: false,
    ...extra,
  });
}

function image(x, y, size, iconName, files) {
  const id = `file-${iconName}`;
  if (!files[id]) {
    const svg = iconSvg(ICONS[iconName]);
    files[id] = {
      id,
      mimeType: 'image/svg+xml',
      dataURL: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
      created: 1,
      lastRetrieved: 1,
    };
  }
  return base('image', x, y, size, size, {
    strokeColor: 'transparent',
    backgroundColor: 'transparent',
    roundness: null,
    status: 'saved',
    fileId: id,
    scale: [1, 1],
  });
}

// Rótulo de serviço = ícone + texto ao lado.
function service(x, y, iconName, label, files, {size = 40} = {}) {
  return [
    image(x, y, size, iconName, files),
    text(x + size + 12, y + size / 2 - 10, label, {fontSize: 16}),
  ];
}

function scene(elements, files = {}) {
  return `${JSON.stringify(
    {
      type: 'excalidraw',
      version: 2,
      source: 'https://excalidraw.com',
      elements,
      appState: {gridSize: null, viewBackgroundColor: '#ffffff'},
      files,
    },
    null,
    2,
  )}\n`;
}

// Cena 1 — os três grupos.
{
  const files = {};
  const groups = [
    {x: 40, title: 'Computação', items: [['ec2', 'EC2'], ['ecs', 'ECS + Fargate'], ['lambda', 'Lambda']]},
    {x: 400, title: 'Dados e objetos', items: [['rds', 'RDS'], ['dynamodb', 'DynamoDB'], ['s3', 'S3']]},
    {x: 760, title: 'Comunicação', items: [['apigateway', 'API Gateway'], ['sqs', 'SQS'], ['sns', 'SNS / EventBridge']]},
  ];
  const els = [text(40, 0, 'Nuvem: alugar infraestrutura sob demanda', {fontSize: 14, strokeColor: '#57606a'})];
  for (const g of groups) {
    els.push(rect(g.x, 40, 320, 280));
    els.push(text(g.x + 20, 56, g.title, {fontSize: 18}));
    g.items.forEach(([icon, label], i) => {
      els.push(...service(g.x + 20, 100 + i * 64, icon, label, files));
    });
  }
  writeFileSync(join(srcDir, 'aws-mapa-grupos.excalidraw'), scene(els, files));
}

// Cena 2 — espectro de responsabilidade.
{
  const files = {};
  const els = [
    text(40, 0, 'Espectro de responsabilidade', {fontSize: 14, strokeColor: '#57606a'}),
    ...service(80, 60, 'ec2', 'EC2 — máquina virtual, SO seu', files),
    ...service(360, 60, 'fargate', 'ECS + Fargate — contêiner', files),
    ...service(640, 60, 'lambda', 'Lambda — função, serverless', files),
    arrow(120, 160, 620, 0),
    text(60, 190, 'você controla: SO, patch, escala', {fontSize: 13, strokeColor: '#57606a'}),
    text(760, 190, 'AWS controla: tudo', {fontSize: 13, strokeColor: '#57606a', textAlign: 'right'}),
  ];
  writeFileSync(join(srcDir, 'aws-espectro-responsabilidade.excalidraw'), scene(els, files));
}

// Cena 3 — arquitetura heterogênea.
{
  const files = {};
  const els = [
    text(40, 0, 'Arquitetura heterogênea: cada peça no serviço certo', {fontSize: 14, strokeColor: '#57606a'}),
    rect(40, 60, 300, 300),
    text(60, 76, 'Clientes', {fontSize: 18}),
    ...service(60, 120, 'apigateway', 'API Gateway', files),
    ...service(60, 190, 'sqs', 'SQS', files),
    ...service(60, 260, 'eventbridge', 'EventBridge', files),
    rect(400, 60, 320, 300),
    text(420, 76, 'Adaptadores primários', {fontSize: 18}),
    ...service(420, 130, 'lambda', 'Lambda', files),
    ...service(420, 220, 'fargate', 'ECS + Fargate', files),
    rect(780, 120, 260, 180),
    text(800, 150, 'Domínio', {fontSize: 20}),
    text(800, 185, 'regras de negócio', {fontSize: 14, strokeColor: '#57606a'}),
    rect(1100, 60, 300, 300),
    text(1120, 76, 'Adaptadores secundários', {fontSize: 18}),
    ...service(1120, 120, 'dynamodb', 'DynamoDB', files),
    ...service(1120, 190, 'rds', 'RDS', files),
    ...service(1120, 260, 's3', 'S3', files),
    arrow(340, 210, 60, 0),
    arrow(720, 210, 60, 0),
    arrow(1040, 210, 60, 0),
    text(40, 390, 'O domínio define portas; os adaptadores implementam.', {fontSize: 13, strokeColor: '#57606a'}),
  ];
  writeFileSync(join(srcDir, 'aws-arquitetura-evolucao.excalidraw'), scene(els, files));
}

console.log('excalidraw + ícones gerados em static/img/diagramas/src/');
