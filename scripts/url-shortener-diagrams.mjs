// Gera os SVGs theme-aware do projeto URL shortener em static/img/diagramas/.
// Padrão visual igual ao guia AWS (aws-mapa-grupos.svg): JetBrains Mono,
// <style> com @media (prefers-color-scheme: dark), <title>/<desc>/role="img".
// Rodar: node scripts/url-shortener-diagrams.mjs
import {writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'static', 'img', 'diagramas');

const STYLE = `
    text{font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;fill:#24292f}
    .box{fill:none;stroke:#0969da;stroke-width:2}
    .store{fill:none;stroke:#d29922;stroke-width:2}
    .proc{fill:none;stroke:#8957e5;stroke-width:2}
    .flow{fill:none;stroke:#0969da;stroke-width:1.6}
    .lbl{fill:#57606a}
    .mono{fill:#57606a}
    @media (prefers-color-scheme: dark){
      text{fill:#e6edf3}
      .box{stroke:#58a6ff}
      .store{stroke:#e3b341}
      .proc{stroke:#a371f7}
      .flow{stroke:#58a6ff}
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
    const dy = sub ? -2 : 4;
    t += `\n  <text x="${cx}" y="${cy + dy}" font-size="${size}" text-anchor="middle">${esc(label)}</text>`;
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

function arrow(x1, y1, x2, y2) {
  return `  <path d="M ${x1} ${y1} L ${x2} ${y2}" class="flow" marker-end="url(#arrow)"/>`;
}

function path(d) {
  return `  <path d="${d}" class="flow" marker-end="url(#arrow)"/>`;
}

function diamond(cx, cy, w, h, label_, cls = 'proc') {
  const pts = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  return (
    `  <polygon points="${pts}" class="${cls}"/>` +
    `\n  <text x="${cx}" y="${cy + 4}" font-size="12" text-anchor="middle">${esc(label_)}</text>`
  );
}

const scenes = {};

// ---------------------------------------------------------------- Fig 2
scenes['us-redirect-301.svg'] = [
  head(
    '0 0 820 210',
    'Diagrama: redirecionamento 301 — cliente pede URL curta, servidor devolve Location, cliente segue para o site original',
    'Fluxo de redirecionamento 301',
    'O cliente pede a URL curta ao servidor; o servidor responde 301 com Location apontando para a URL longa; o cliente segue para o servidor de destino.',
  ),
  label(18, 22, 'Redirecionamento 301: o servidor só aponta o destino'),
  rect(18, 74, 170, 64, 'Cliente', 'box', {sub: 'navegador'}),
  rect(320, 74, 180, 64, 'Servidor URL curta', 'proc', {sub: 'tinyurl'}),
  rect(632, 74, 170, 64, 'Site original', 'store', {sub: 'amazon'}),
  arrow(188, 92, 320, 92),
  label(254, 84, 'GET /qtj5opu', {anchor: 'middle', size: 10}),
  arrow(320, 120, 188, 120),
  label(254, 136, '301 Location: amazon', {anchor: 'middle', size: 10}),
  path('M 103 138 L 103 176 L 717 176 L 717 138'),
  label(410, 192, 'cliente segue o redirect sozinho', {anchor: 'middle', size: 10}),
].join('\n');

// ---------------------------------------------------------------- Fig 3
scenes['us-hash-funcao.svg'] = [
  head(
    '0 0 760 170',
    'Diagrama: função de hash mapeia a URL longa para um valor curto',
    'Função de hash',
    'A URL longa entra na função f(x), que produz um valor de hash curto usado como URL encurtada.',
  ),
  label(18, 22, 'A função de hash precisa ser determinística e reversível'),
  rect(18, 58, 210, 64, 'URL longa', 'box', {sub: 'entrada'}),
  rect(310, 58, 130, 64, 'f(x)', 'proc', {sub: 'hash'}),
  rect(520, 58, 222, 64, 'URL curta', 'store', {sub: 'tinyurl.com/{hash}'}),
  arrow(228, 90, 310, 90),
  label(269, 82, 'hash', {anchor: 'middle', size: 10}),
  arrow(440, 90, 520, 90),
  label(480, 82, 'codifica', {anchor: 'middle', size: 10}),
].join('\n');

// ---------------------------------------------------------------- Fig 5
scenes['us-hash-colisao.svg'] = [
  head(
    '0 0 700 540',
    'Fluxograma: hash com resolução de colisão, reaplicando o hash com um prefixo até não haver colisão',
    'Hash com resolução de colisão',
    'Aplica o hash, checa se a URL curta já existe no banco; se existir, acrescenta um prefixo à URL longa e repete; se não, salva.',
  ),
  label(18, 22, 'Hash + resolução de colisão'),
  rect(110, 40, 100, 34, 'início', 'proc', {rx: 17}),
  rect(40, 96, 240, 46, 'entrada: URL longa', 'box'),
  rect(40, 174, 240, 46, 'função de hash', 'proc', {sub: '7 primeiros caracteres'}),
  rect(40, 252, 240, 46, 'URL curta', 'store'),
  diamond(160, 360, 240, 76, 'existe no DB?'),
  rect(40, 432, 240, 46, 'salva no DB', 'store'),
  rect(110, 500, 100, 34, 'fim', 'proc', {rx: 17}),
  rect(400, 337, 260, 46, 'URL longa + prefixo', 'proc'),
  arrow(160, 74, 160, 96),
  arrow(160, 142, 160, 174),
  arrow(160, 220, 160, 252),
  arrow(160, 298, 160, 322),
  arrow(160, 398, 160, 432),
  label(172, 418, 'não'),
  arrow(160, 478, 160, 500),
  arrow(280, 360, 400, 360),
  label(300, 352, 'sim'),
  path('M 530 337 L 530 197 L 280 197'),
  label(392, 189, 're-hash', {anchor: 'middle', size: 10}),
].join('\n');

// ---------------------------------------------------------------- Fig 7
scenes['us-shortening-fluxo.svg'] = [
  head(
    '0 0 700 500',
    'Fluxograma do encurtamento: verifica se a URL longa já existe, gera ID único, converte para base 62 e salva',
    'Fluxo de encurtamento da URL',
    'Se a URL longa já existe, devolve a URL curta; senão gera um ID único, converte para base 62 e salva o novo registro.',
  ),
  label(18, 22, 'Encurtamento com base 62'),
  rect(40, 46, 280, 44, '1. entrada: URL longa', 'box'),
  diamond(180, 158, 240, 76, '2. URL longa no DB?'),
  rect(400, 136, 270, 44, '3. devolve URL curta', 'store'),
  rect(40, 232, 280, 44, '4. gera ID único', 'proc'),
  rect(40, 302, 280, 44, '5. converte ID para base 62', 'proc'),
  rect(40, 372, 280, 44, '6. salva ID, curta, longa', 'store'),
  rect(130, 442, 100, 34, 'fim', 'proc', {rx: 17}),
  arrow(180, 90, 180, 120),
  arrow(300, 158, 400, 158),
  label(320, 150, 'sim'),
  arrow(180, 196, 180, 232),
  label(192, 220, 'não'),
  arrow(180, 276, 180, 302),
  arrow(180, 346, 180, 372),
  arrow(180, 416, 180, 442),
].join('\n');

// ---------------------------------------------------------------- Fig 8
scenes['us-redirect-arquitetura.svg'] = [
  head(
    '0 0 860 300',
    'Diagrama: arquitetura do redirecionamento — cliente, balanceador, servidores web, cache e banco',
    'Arquitetura do redirecionamento',
    'O cliente pede a URL curta; o balanceador distribui para servidores web sem estado; a leitura passa por um cache antes de chegar ao banco.',
  ),
  label(18, 22, 'Leitura em cache: mais leituras que escritas'),
  rect(18, 120, 150, 70, 'Cliente', 'box', {sub: 'laptop · mobile'}),
  rect(230, 130, 110, 50, 'Balanceador', 'proc'),
  rect(400, 50, 200, 44, 'Servidores web', 'proc', {sub: 'sem estado'}),
  rect(660, 44, 180, 66, 'Cache', 'store', {sub: 'Redis'}),
  rect(660, 176, 180, 66, 'Banco', 'store', {sub: 'curta → longa'}),
  arrow(168, 155, 230, 155),
  label(199, 147, '1 GET', {anchor: 'middle', size: 10}),
  arrow(340, 145, 400, 72),
  label(378, 118, '2', {anchor: 'middle', size: 10}),
  arrow(600, 72, 660, 72),
  label(630, 64, '3 hit', {anchor: 'middle', size: 10}),
  arrow(750, 110, 750, 176),
  label(760, 148, '4 miss', {size: 10}),
  path('M 400 62 L 93 62 L 93 120'),
  label(246, 54, '5 devolve a URL longa', {anchor: 'middle', size: 10}),
].join('\n');

// ---------------------------------------------------------------- Fig base62
scenes['us-base62-divisao.svg'] = [
  head(
    '0 0 840 390',
    'Diagrama: conversão para base 62 com resto (% 62) e divisão inteira (/ 62) — os restos, lidos de baixo para cima, formam a URL curta',
    'Conversão para base 62',
    'Em cada passo, n % 62 dá o símbolo e n / 62 (divisão inteira) dá o próximo n. Os restos, lidos de baixo para cima, formam o código.',
  ),
  label(18, 22, 'Cada passo: resto vira símbolo, quociente inteiro vira o próximo n'),
  rect(20, 60, 560, 64, '11157 % 62 = 59 → X', 'box', {sub: '11157 / 62 = 179  (divisão inteira)'}),
  rect(20, 170, 560, 64, '179 % 62 = 55 → T', 'box', {sub: '179 / 62 = 2'}),
  rect(20, 280, 560, 64, '2 % 62 = 2 → 2', 'box', {sub: '2 / 62 = 0  →  para'}),
  arrow(300, 124, 300, 170),
  arrow(300, 234, 300, 280),
  rect(630, 150, 190, 110, '2 T X', 'store', {sub: 'restos, de baixo para cima'}),
  arrow(580, 312, 630, 240),
  label(18, 372, 'Em Go: / entre inteiros descarta o resto; % dá o resto.', {size: 10}),
].join('\n');

for (const [file, body] of Object.entries(scenes)) {
  writeFileSync(join(outDir, file), body + '\n</svg>\n');
}

console.log(`url-shortener: ${Object.keys(scenes).length} SVGs em static/img/diagramas/`);
