// Gera os SVGs theme-aware dos capítulos de design de software em
// static/img/diagramas/. Mesmo padrão visual do resto do site (JetBrains Mono,
// <style> com @media (prefers-color-scheme: dark), <title>/<desc>/role="img").
// Prefixo da área: design-. Rodar: node scripts/design-diagrams.mjs
import {writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'static', 'img', 'diagramas');

const STYLE = `
    text{font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;fill:#24292f}
    .box{fill:none;stroke:#0969da;stroke-width:2}
    .port{fill:none;stroke:#238636;stroke-width:2;stroke-dasharray:6 4}
    .detail{fill:none;stroke:#d29922;stroke-width:2}
    .proc{fill:none;stroke:#8957e5;stroke-width:2}
    .flow{fill:none;stroke:#0969da;stroke-width:1.6}
    .bad{fill:none;stroke:#cf222e;stroke-width:2}
    .lbl{fill:#57606a}
    .mono{fill:#57606a}
    @media (prefers-color-scheme: dark){
      text{fill:#e6edf3}
      .box{stroke:#58a6ff}
      .port{stroke:#3fb950}
      .detail{stroke:#e3b341}
      .proc{stroke:#a371f7}
      .flow{stroke:#58a6ff}
      .bad{stroke:#f85149}
      .lbl{fill:#8b949e}
      .mono{fill:#8b949e}
    }`;

function head(viewBox, aria, title, desc) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${aria}">
  <title>${title}</title>
  <desc>${desc}</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/>
    </marker>
  </defs>
  <style>${STYLE}
  </style>`;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function rect(x, y, w, h, label, cls = 'box', {size = 12, sub = null, rx = 8} = {}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  let t = `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
  if (label) {
    t += `\n  <text x="${cx}" y="${cy + (sub ? -2 : 4)}" font-size="${size}" text-anchor="middle">${esc(label)}</text>`;
  }
  if (sub) {
    t += `\n  <text x="${cx}" y="${cy + 15}" font-size="10" text-anchor="middle" class="mono">${esc(sub)}</text>`;
  }
  return t;
}

function label(x, y, text, {size = 11, anchor = 'start', cls = 'lbl', weight = null} = {}) {
  const w = weight ? ` font-weight="${weight}"` : '';
  return `  <text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" class="${cls}"${w}>${esc(text)}</text>`;
}

const arrow = (x1, y1, x2, y2, cls = 'flow') =>
  `  <path d="M ${x1} ${y1} L ${x2} ${y2}" class="${cls}" marker-end="url(#arrow)"/>`;

const scenes = {};

// ------------------------------------------------ 1. acoplado ao concreto
scenes['design-dip-acoplado.svg'] = [
  head(
    '0 0 780 250',
    'Diagrama: o serviço de alto nível instancia e chama diretamente o SDK externo, ficando acoplado ao detalhe',
    'Acoplado ao detalhe',
    'O OrderProcessorService cria o SDK da Stripe com new e chama ChargeCreditCard direto. Alto nível depende de baixo nível.',
  ),
  label(18, 24, 'Alto nível preso ao detalhe — e o detalhe é de terceiros', {weight: 'bold'}),
  rect(30, 80, 300, 70, 'OrderProcessorService', 'proc', {sub: 'regra de negócio (alto nível)'}),
  rect(480, 80, 270, 70, 'ExternalStripeSDK', 'detail', {sub: 'lib externa (baixo nível)'}),
  arrow(330, 105, 480, 105, 'bad'),
  arrow(480, 135, 330, 135, 'bad'),
  label(405, 96, 'new + ChargeCreditCard()', {anchor: 'middle', size: 10}),
  label(30, 200, 'Trocar de gateway = editar a regra. Testar = bater na rede.', {size: 10}),
].join('\n');

// ------------------------------------------------ 2. tentativa ingênua
scenes['design-dip-tentativa.svg'] = [
  head(
    '0 0 820 250',
    'Diagrama: injeção pelo construtor de uma classe concreta — o new mudou de lugar, mas o acoplamento permanece',
    'Tentativa ingênua',
    'Injetar StripeClient pelo construtor move o new para o chamador, mas o serviço continua dependendo de uma classe concreta.',
  ),
  label(18, 24, 'new mudou de lugar; o acoplamento continua', {weight: 'bold'}),
  rect(30, 90, 180, 64, 'Controller', 'box', {sub: 'chamador'}),
  rect(300, 90, 250, 64, 'OrderProcessorService', 'proc', {sub: 'depende de concreto'}),
  rect(640, 90, 160, 64, 'StripeClient', 'detail', {sub: 'concreto'}),
  arrow(210, 122, 300, 122, 'flow'),
  arrow(550, 122, 640, 122, 'bad'),
  label(475, 114, 'StripeClient', {anchor: 'middle', size: 10}),
  label(255, 82, 'injeta', {anchor: 'middle', size: 10}),
  label(30, 205, 'Ainda depende de uma classe concreta e volátil.', {size: 10}),
].join('\n');

// ------------------------------------------------ 3. invertido (DIP + Adapter)
scenes['design-dip-invertido.svg'] = [
  head(
    '0 0 860 300',
    'Diagrama: o serviço depende da interface PaymentGateway; o adapter implementa a porta e envolve o SDK externo',
    'Invertido com DIP e Adapter',
    'O OrderProcessorService depende da interface PaymentGateway. O StripeAdapter implementa essa porta e traduz as chamadas para o SDK externo.',
  ),
  label(18, 24, 'A seta aponta para a abstração; o adapter envolve o detalhe', {weight: 'bold'}),
  rect(30, 100, 260, 70, 'OrderProcessorService', 'proc', {sub: 'alto nível'}),
  rect(370, 108, 200, 54, 'PaymentGateway', 'port', {sub: '«interface» (porta)'}),
  rect(650, 60, 190, 54, 'StripeAdapter', 'box', {sub: 'adapter'}),
  rect(650, 200, 190, 54, 'ExternalStripeSDK', 'detail', {sub: 'lib externa'}),
  arrow(290, 128, 370, 128, 'flow'),
  label(330, 120, 'depende', {anchor: 'middle', size: 10}),
  arrow(650, 100, 570, 120, 'flow'),
  label(612, 100, 'implementa', {anchor: 'middle', size: 10}),
  arrow(745, 114, 745, 200, 'flow'),
  label(755, 162, 'envolve', {size: 10}),
].join('\n');

for (const [file, body] of Object.entries(scenes)) {
  writeFileSync(join(outDir, file), body + '\n</svg>\n');
}

console.log(`design: ${Object.keys(scenes).length} SVGs em static/img/diagramas/`);
