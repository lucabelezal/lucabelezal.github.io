// Gera os SVGs theme-aware dos capítulos de fundamentos, rede, armazenamento
// e entrega de conteúdo em static/img/diagramas/.
// Padrão visual igual a aws-mapa-grupos.svg: JetBrains Mono,
// <style> com @media (prefers-color-scheme: dark), <title>/<desc>/role="img".
// Rodar: node scripts/aws-guide-diagrams.mjs
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
    .dash{fill:none;stroke:#57606a;stroke-width:1.4;stroke-dasharray:5 4}
    .lbl{fill:#57606a}
    .mono{fill:#57606a}
    .title{fill:#24292f;font-weight:700}
    @media (prefers-color-scheme: dark){
      text{fill:#e6edf3}
      .box{stroke:#58a6ff}
      .store{stroke:#e3b341}
      .proc{stroke:#a371f7}
      .flow{stroke:#58a6ff}
      .dash{stroke:#8b949e}
      .lbl{fill:#8b949e}
      .mono{fill:#8b949e}
      .title{fill:#e6edf3}
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

// Os SVGs são exibidos a ~70% da largura do viewBox; a tipografia compensa.
const FS = 1.25;

function rect(x, y, w, h, labelText, cls = 'box', {size = 12, sub = null, rx = 8} = {}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  let t = `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/>`;
  if (labelText) {
    const dy = sub ? -2 : 4;
    t += `\n  <text x="${cx}" y="${cy + dy}" font-size="${size * FS}" text-anchor="middle">${esc(labelText)}</text>`;
  }
  if (sub) {
    t += `\n  <text x="${cx}" y="${cy + 15}" font-size="${10 * FS}" text-anchor="middle" class="mono">${esc(sub)}</text>`;
  }
  return t;
}

function label(x, y, text, {size = 11, anchor = 'start', cls = 'lbl', weight = null} = {}) {
  const w = weight ? ` font-weight="${weight}"` : '';
  return `  <text x="${x}" y="${y}" font-size="${size * FS}" text-anchor="${anchor}" class="${cls}"${w}>${esc(text)}</text>`;
}

function arrow(x1, y1, x2, y2, {cls = 'flow'} = {}) {
  return `  <path d="M ${x1} ${y1} L ${x2} ${y2}" class="${cls}" marker-end="url(#arrow)"/>`;
}

function path(d, {cls = 'flow', marker = true} = {}) {
  const m = marker ? ' marker-end="url(#arrow)"' : '';
  return `  <path d="${d}" class="${cls}"${m}/>`;
}

const scenes = {};

// ---------------------------------------------------------------- Região e AZ
scenes['aws-regiao-az.svg'] = [
  head(
    '0 0 860 290',
    'Diagrama: uma região com três zonas de disponibilidade e pontos de presença na borda',
    'Região, zonas de disponibilidade e borda',
    'Uma região contém três zonas de disponibilidade isoladas; pontos de presença na borda entregam conteúdo perto do usuário; multi-AZ não protege contra a queda da região inteira.',
  ),
  label(18, 24, 'Região: várias AZs isoladas; borda: cópia perto do usuário', {weight: 700}),
  rect(18, 44, 560, 196, null),
  label(38, 68, 'Região sa-east-1 (São Paulo)', {size: 13, weight: 700}),
  rect(40, 88, 150, 130, 'AZ a', 'box', {sub: '1+ data centers'}),
  rect(214, 88, 150, 130, 'AZ b', 'box', {sub: '1+ data centers'}),
  rect(388, 88, 150, 130, 'AZ c', 'box', {sub: '1+ data centers'}),
  path('M 202 98 L 202 208', {cls: 'dash', marker: false}),
  path('M 376 98 L 376 208', {cls: 'dash', marker: false}),
  label(298, 234, 'AZs isoladas entre si', {size: 10, anchor: 'middle'}),
  rect(636, 88, 190, 60, 'Edge location', 'proc', {sub: 'cache perto do usuário'}),
  rect(636, 168, 190, 60, 'Edge location', 'proc', {sub: 'outra cidade'}),
  arrow(578, 118, 636, 118),
  arrow(578, 198, 636, 198),
  label(18, 264, 'multi-AZ: sobrevive à queda de um data center. multi-região: sobrevive à queda da região.', {size: 10}),
].join('\n');

// ---------------------------------------------------------------- VPC
scenes['aws-vpc-subnets.svg'] = [
  head(
    '0 0 860 370',
    'Diagrama: VPC com sub-rede pública e privada, internet gateway, NAT gateway e security groups',
    'VPC com sub-redes pública e privada',
    'O internet gateway liga a VPC à internet; a sub-rede pública contém o balanceador e o NAT; a sub-rede privada contém aplicação e banco, que saem pelo NAT.',
  ),
  label(18, 24, 'VPC: o que é público depende da rota, não do nome', {weight: 700}),
  rect(40, 44, 190, 52, 'Internet Gateway', 'proc', {sub: 'porta para a internet'}),
  rect(18, 112, 640, 224, null),
  label(470, 136, 'VPC 10.0.0.0/16', {size: 13, weight: 700}),
  rect(40, 152, 280, 168, null),
  label(56, 174, 'Sub-rede pública', {size: 12, weight: 700}),
  rect(56, 186, 184, 44, 'Load balancer', 'box', {sub: 'recebe 443'}),
  rect(56, 244, 184, 44, 'NAT Gateway', 'proc', {sub: 'saída da privada'}),
  rect(360, 152, 278, 168, null),
  label(376, 174, 'Sub-rede privada', {size: 12, weight: 700}),
  rect(360, 186, 262, 44, 'Aplicação', 'box', {sub: 'sem IP público'}),
  rect(360, 244, 262, 44, 'Banco de dados', 'store', {sub: 'só aceita o SG da app'}),
  arrow(115, 96, 115, 186),
  arrow(240, 208, 360, 208),
  arrow(491, 230, 491, 244),
  path('M 360 222 L 300 222 L 300 266 L 240 266', {cls: 'flow'}),
  path('M 56 266 L 28 266 L 28 70 L 40 70', {cls: 'flow'}),
  label(664, 140, 'Security group:', {size: 11, weight: 700}),
  label(664, 158, 'porta 443 apenas', {size: 10}),
  label(664, 174, 'do SG do ALB', {size: 10}),
  label(664, 202, 'NACL: stateless,', {size: 10}),
  label(664, 218, 'avaliada por número', {size: 10}),
  label(18, 358, 'Instância privada sem NAT não baixa pacote: falta rota 0.0.0.0/0 para o NAT.', {size: 10}),
].join('\n');

// ---------------------------------------------------------------- Classes de armazenamento
scenes['aws-s3-classes.svg'] = [
  head(
    '0 0 860 220',
    'Diagrama: espectro de armazenamento do bloco ao arquivo frio, com custo de guardar caindo e custo de ler subindo',
    'Espectro de armazenamento',
    'Bloco e arquivo atendem acesso local; o S3 vai do acesso frequente ao arquivo frio. Quanto mais fria a classe, menor o custo de guardar e maior o custo e o tempo de leitura.',
  ),
  label(18, 24, 'Do acesso quente ao arquivo frio: guardar fica mais barato, ler fica mais caro', {weight: 700}),
  label(18, 50, 'guardar mais barato →', {size: 10}),
  label(842, 50, '← ler mais caro e mais lento', {size: 10, anchor: 'end'}),
  rect(18, 66, 128, 62, 'EBS', 'box', {sub: 'bloco, 1 AZ'}),
  rect(158, 66, 128, 62, 'EFS', 'box', {sub: 'arquivo, NFS'}),
  rect(298, 66, 128, 62, 'S3 Standard', 'store', {sub: 'acesso frequente'}),
  rect(438, 66, 128, 62, 'S3 IA', 'store', {sub: 'raro, imediato'}),
  rect(578, 66, 128, 62, 'Glacier', 'store', {sub: 'minutos a horas'}),
  rect(718, 66, 124, 62, 'Deep Archive', 'store', {sub: 'horas'}),
  path('M 18 158 L 842 158'),
  label(18, 182, 'Bloco e arquivo: acesso local. Objeto: acesso por chave via HTTP.', {size: 10}),
  label(18, 200, 'Versionamento, ciclo de vida e Object Lock são do S3.', {size: 10}),
].join('\n');

// ---------------------------------------------------------------- Entrega de conteúdo
scenes['aws-entrega-cdn.svg'] = [
  head(
    '0 0 860 260',
    'Diagrama: usuário resolve o domínio no Route 53, busca o conteúdo no edge do CloudFront e chega à origem pela load balancer',
    'Entrega de conteúdo',
    'O usuário resolve o domínio no Route 53, chega ao ponto de presença do CloudFront; em cache hit o edge responde, em cache miss a origem é consultada.',
  ),
  label(18, 24, 'Três camadas: DNS encontra, CDN entrega perto, load balancer distribui', {weight: 700}),
  rect(18, 80, 150, 60, 'Usuário', 'box', {sub: 'Tóquio'}),
  rect(206, 80, 150, 60, 'Route 53', 'proc', {sub: 'DNS'}),
  rect(394, 80, 160, 60, 'CloudFront edge', 'proc', {sub: 'cache'}),
  rect(600, 80, 120, 60, 'Origem', 'store', {sub: 'S3 / ALB'}),
  rect(728, 80, 114, 60, 'App', 'box', {sub: 'privada'}),
  arrow(168, 100, 206, 100),
  label(187, 70, 'nome → IP', {size: 9, anchor: 'middle'}),
  arrow(356, 100, 394, 100),
  arrow(554, 100, 600, 100),
  label(577, 70, 'miss', {size: 9, anchor: 'middle'}),
  arrow(720, 100, 728, 100),
  path('M 394 130 L 394 190 L 93 190 L 93 140', {cls: 'flow'}),
  label(243, 208, 'hit: o edge responde sem ir à origem', {size: 10, anchor: 'middle'}),
  label(18, 246, 'TTL alto melhora o hit ratio e atrasa a atualização. Versionar o arquivo evita invalidação.', {size: 10}),
].join('\n');

for (const [file, content] of Object.entries(scenes)) {
  writeFileSync(join(outDir, file), `${content}\n</svg>\n`);
  console.log(`gerado ${file}`);
}
