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
    .badlbl{fill:#cf222e}
    .oklbl{fill:#238636}
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
      .badlbl{fill:#f85149}
      .oklbl{fill:#3fb950}
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

function rect(x, y, w, h, label, cls = 'box', {size = 13, sub = null, subSize = 11, rx = 8} = {}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  let t = `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
  if (label) {
    t += `\n  <text x="${cx}" y="${cy + (sub ? -2 : 4)}" font-size="${size}" text-anchor="middle">${esc(label)}</text>`;
  }
  if (sub) {
    t += `\n  <text x="${cx}" y="${cy + 15}" font-size="${subSize}" text-anchor="middle" class="mono">${esc(sub)}</text>`;
  }
  return t;
}

function label(x, y, text, {size = 12, anchor = 'start', cls = 'lbl', weight = null} = {}) {
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

// ------------------------------------------------ 4. ISP: interface gorda
scenes['design-isp-inchuada.svg'] = [
  head(
    '0 0 880 320',
    'Diagrama: a interface gorda PaymentMethod obriga todos os meios de pagamento a implementar geração de QR Code e de documento, criando métodos mortos',
    'Interface gorda',
    'PaymentMethod acumula Pay, GenerateQRCode e GenerateDocument. Todo meio de pagamento herda o contrato inteiro, mesmo quem só sabe pagar.',
  ),
  label(20, 26, 'Interface gorda — todos presos a um contrato que ninguém usa por inteiro', {weight: 'bold'}),
  rect(270, 56, 340, 70, 'PaymentMethod', 'port', {sub: 'Pay + GenerateQRCode + GenerateDocument'}),
  rect(40, 214, 220, 66, 'CreditCard', 'detail', {sub: 'só paga'}),
  rect(330, 214, 220, 66, 'Pix', 'detail', {sub: 'paga + QR Code'}),
  rect(620, 214, 220, 66, 'Boleto', 'detail', {sub: 'paga + documento'}),
  arrow(150, 214, 330, 126, 'bad'),
  arrow(440, 214, 440, 126, 'flow'),
  arrow(730, 214, 560, 126, 'flow'),
  label(20, 308, 'Quem só paga é obrigado a carregar geração de QR Code e de documento — código morto.', {size: 11, cls: 'badlbl'}),
].join('\n');

// ------------------------------------------------ 5. ISP: interfaces segregadas
scenes['design-isp-segregada.svg'] = [
  head(
    '0 0 900 400',
    'Diagrama: três contratos coesos — QRCodeGenerable, PaymentMethod e DocumentGenerable — e cada cliente depende apenas da capacidade que usa',
    'Interfaces segregadas',
    'Pix implementa PaymentMethod e QRCodeGenerable; Boleto implementa PaymentMethod e DocumentGenerable; CreditCard só PaymentMethod. Cada cliente pede a capacidade que usa.',
  ),
  label(20, 26, 'Contratos coesos — cada cliente depende só da capacidade que usa', {weight: 'bold'}),
  rect(40, 48, 240, 54, 'Tela Pix', 'box', {sub: 'cliente'}),
  rect(330, 48, 240, 54, 'Checkout', 'box', {sub: 'cliente'}),
  rect(620, 48, 240, 54, 'E-mail boleto', 'box', {sub: 'cliente'}),
  rect(40, 170, 240, 66, 'QRCodeGenerable', 'port', {sub: 'GenerateQRCode'}),
  rect(330, 170, 240, 66, 'PaymentMethod', 'port', {sub: 'Pay'}),
  rect(620, 170, 240, 66, 'DocumentGenerable', 'port', {sub: 'GenerateDocument'}),
  rect(40, 300, 240, 64, 'Pix', 'detail', {sub: 'paga + QR Code'}),
  rect(330, 300, 240, 64, 'CreditCard', 'detail', {sub: 'só paga'}),
  rect(620, 300, 240, 64, 'Boleto', 'detail', {sub: 'paga + documento'}),
  arrow(160, 102, 160, 170, 'flow'),
  arrow(450, 102, 450, 170, 'flow'),
  arrow(740, 102, 740, 170, 'flow'),
  label(300, 142, 'usa', {anchor: 'middle', size: 11}),
  arrow(160, 300, 160, 236, 'flow'),
  arrow(230, 300, 380, 236, 'flow'),
  arrow(450, 300, 450, 236, 'flow'),
  arrow(670, 300, 520, 236, 'flow'),
  arrow(740, 300, 740, 236, 'flow'),
  label(300, 272, 'implementa', {anchor: 'middle', size: 11}),
  label(20, 390, 'CreditCard depende só de PaymentMethod — sem métodos mortos.', {size: 11}),
].join('\n');

// ------------------------------------------------ 6. LSP: as três regras
scenes['design-lsp-contrato.svg'] = [
  head(
    '0 0 900 260',
    'Diagrama: as três regras de contrato do LSP — pré-condição não pode ser fortalecida, pós-condição não pode ser enfraquecida, invariantes devem ser mantidas',
    'As três regras do LSP',
    'Um subtipo honra o contrato quando não fortalece pré-condições, não enfraquece pós-condições e mantém as invariantes da base.',
  ),
  label(20, 26, 'As três regras de contrato do LSP', {weight: 'bold'}),
  rect(20, 60, 270, 170, '', 'box'),
  label(155, 96, 'Pré-condição', {anchor: 'middle', size: 13}),
  label(155, 126, 'subtipo não exige mais', {anchor: 'middle', size: 11}),
  label(155, 156, '✓ aceitar igual ou mais amplo', {anchor: 'middle', size: 11, cls: 'oklbl'}),
  label(155, 182, '✗ exigir entrada mais restrita', {anchor: 'middle', size: 11, cls: 'badlbl'}),
  rect(315, 60, 270, 170, '', 'box'),
  label(450, 96, 'Pós-condição', {anchor: 'middle', size: 13}),
  label(450, 126, 'subtipo não entrega menos', {anchor: 'middle', size: 11}),
  label(450, 156, '✓ devolver igual ou mais', {anchor: 'middle', size: 11, cls: 'oklbl'}),
  label(450, 182, '✗ devolver garantia menor', {anchor: 'middle', size: 11, cls: 'badlbl'}),
  rect(610, 60, 270, 170, '', 'box'),
  label(745, 96, 'Invariante', {anchor: 'middle', size: 13}),
  label(745, 126, 'regra global da base', {anchor: 'middle', size: 11}),
  label(745, 156, '✓ sempre preservada', {anchor: 'middle', size: 11, cls: 'oklbl'}),
  label(745, 182, '✗ quebrada pelo subtipo', {anchor: 'middle', size: 11, cls: 'badlbl'}),
].join('\n');

// ------------------------------------------------ 7. LSP: substituição falha
scenes['design-lsp-viola.svg'] = [
  head(
    '0 0 880 330',
    'Diagrama: S3Generator devolve uma URL onde o contrato prometia um caminho local, quebrando o cliente e forçando checagem de tipo',
    'Substituição falha',
    'CSV e PDF devolvem caminho local; S3 devolve URL. O cliente que confia no contrato quebra e é forçado a checar o tipo, perdendo o polimorfismo.',
  ),
  label(20, 26, 'A assinatura é a mesma; o comportamento não', {weight: 'bold'}),
  rect(30, 132, 190, 64, 'AttachToEmail', 'proc', {sub: 'cliente'}),
  rect(290, 132, 230, 64, 'ReportGenerator', 'port', {sub: 'Generate() string'}),
  rect(600, 52, 240, 50, 'CSVGenerator', 'detail', {sub: '→ caminho local'}),
  rect(600, 138, 240, 50, 'PDFGenerator', 'detail', {sub: '→ caminho local'}),
  rect(600, 224, 240, 50, 'S3Generator', 'detail', {sub: '→ URL (nuvem)'}),
  arrow(220, 164, 290, 164, 'flow'),
  label(255, 156, 'usa', {anchor: 'middle', size: 11}),
  arrow(520, 152, 600, 77, 'flow'),
  arrow(520, 164, 600, 163, 'flow'),
  arrow(520, 176, 600, 249, 'bad'),
  label(20, 300, 'URL não é caminho local: o cliente quebra e passa a checar o tipo — polimorfismo perdido.', {size: 11, cls: 'badlbl'}),
].join('\n');

// ------------------------------------------------ 8. LSP vs ISP
scenes['design-lsp-vs-isp.svg'] = [
  head(
    '0 0 820 360',
    'Diagrama: LSP e ISP operam em eixos diferentes — tamanho do contrato no eixo horizontal e comportamento cumprido no eixo vertical — formando quatro quadrantes',
    'LSP e ISP são eixos diferentes',
    'ISP trata do tamanho do contrato; LSP trata de o comportamento ser cumprido. Um contrato pequeno ainda pode mentir (LSP violado), e um contrato gordo pode ser honesto (só ISP violado).',
  ),
  label(20, 26, 'ISP cuida do tamanho do contrato; LSP, da honestidade da implementação', {weight: 'bold'}),
  arrow(150, 300, 790, 300, 'flow'),
  arrow(150, 300, 150, 66, 'flow'),
  label(780, 320, 'contrato maior →', {anchor: 'end', size: 11}),
  label(160, 62, 'comportamento cumprido ↑', {size: 11}),
  label(300, 150, 'ISP ok · LSP ok', {anchor: 'middle', size: 12, cls: 'oklbl'}),
  label(300, 172, 'o ponto ideal', {anchor: 'middle', size: 11}),
  label(640, 150, 'ISP violado · LSP ok', {anchor: 'middle', size: 12}),
  label(640, 172, 'contrato gordo, mas honesto', {anchor: 'middle', size: 11}),
  label(300, 240, 'ISP ok · LSP violado', {anchor: 'middle', size: 12, cls: 'badlbl'}),
  label(300, 262, 'Generate() string que devolve URL', {anchor: 'middle', size: 11}),
  label(640, 240, 'os dois violados', {anchor: 'middle', size: 12, cls: 'badlbl'}),
  label(640, 262, 'contrato gordo que também mente', {anchor: 'middle', size: 11}),
].join('\n');

for (const [file, body] of Object.entries(scenes)) {
  writeFileSync(join(outDir, file), body + '\n</svg>\n');
}

console.log(`design: ${Object.keys(scenes).length} SVGs em static/img/diagramas/`);
