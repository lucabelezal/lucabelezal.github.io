// Gera os SVGs theme-aware dos capítulos de fundamentos em
// static/img/diagramas/. Padrão visual igual ao resto do site (JetBrains Mono,
// <style> com @media (prefers-color-scheme: dark), <title>/<desc>/role="img").
// Rodar: node scripts/fundamentals-diagrams.mjs
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
    .ring{fill:none;stroke:#d0d7de;stroke-width:2}
    .keydot{fill:#57606a}
    .lbl{fill:#57606a}
    .mono{fill:#57606a}
    @media (prefers-color-scheme: dark){
      text{fill:#e6edf3}
      .box{stroke:#58a6ff}
      .store{stroke:#e3b341}
      .proc{stroke:#a371f7}
      .flow{stroke:#58a6ff}
      .ring{stroke:#30363d}
      .keydot{fill:#8b949e}
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

const arrow = (x1, y1, x2, y2) =>
  `  <path d="M ${x1} ${y1} L ${x2} ${y2}" class="flow" marker-end="url(#arrow)"/>`;
const path = (d) => `  <path d="${d}" class="flow" marker-end="url(#arrow)"/>`;

const scenes = {};

// ---------------------------------------------------------------- ch 02
scenes['sd-servidor-unico.svg'] = [
  head(
    '0 0 760 240',
    'Diagrama: tudo num servidor único — usuário resolve o DNS e fala com o servidor, que guarda app, banco e cache',
    'Servidor único',
    'O usuário resolve o domínio no DNS e envia a requisição HTTP a um único servidor, que hospeda aplicação, banco e cache.',
  ),
  label(18, 22, 'Tudo num servidor: app, banco e cache'),
  rect(18, 90, 140, 60, 'Usuário', 'box', {sub: 'browser · mobile'}),
  rect(210, 90, 140, 60, 'DNS', 'proc'),
  rect(430, 90, 300, 60, 'Servidor único', 'box', {sub: 'app web · banco · cache'}),
  arrow(158, 110, 210, 110),
  label(184, 102, '1', {anchor: 'middle', size: 10}),
  arrow(210, 130, 158, 130),
  label(184, 148, '2 IP', {anchor: 'middle', size: 10}),
  path('M 88 150 L 88 190 L 580 190 L 580 150'),
  label(334, 206, '3 HTTP → 4 HTML/JSON', {anchor: 'middle', size: 10}),
].join('\n');

scenes['sd-load-balancer.svg'] = [
  head(
    '0 0 760 220',
    'Diagrama: load balancer recebe o IP público e distribui para servidores com IP privado',
    'Load balancer',
    'Os usuários acessam o IP público do load balancer, que distribui o tráfego entre servidores com IP privado.',
  ),
  label(18, 22, 'Balanceador: IP público na frente, servidores com IP privado'),
  rect(18, 90, 150, 60, 'Usuário', 'box'),
  rect(240, 95, 140, 50, 'Balanceador', 'proc', {sub: 'IP público'}),
  rect(460, 60, 240, 50, 'Servidor 1', 'box', {sub: '10.0.0.1'}),
  rect(460, 140, 240, 50, 'Servidor 2', 'box', {sub: '10.0.0.2'}),
  arrow(168, 120, 240, 120),
  arrow(380, 112, 460, 85),
  arrow(380, 128, 460, 165),
].join('\n');

scenes['sd-replicacao.svg'] = [
  head(
    '0 0 760 270',
    'Diagrama: replicação master/slave — escritas no master, leituras nos slaves',
    'Replicação de banco',
    'O master recebe escritas e replica para os slaves; as leituras são distribuídas entre os slaves.',
  ),
  label(18, 22, 'Master recebe escrita; slaves servem leitura'),
  rect(40, 40, 300, 50, 'Servidores web', 'proc'),
  rect(40, 140, 220, 64, 'Master DB', 'store', {sub: 'escrita'}),
  rect(430, 110, 220, 50, 'Slave 1', 'store', {sub: 'leitura'}),
  rect(430, 190, 220, 50, 'Slave 2', 'store', {sub: 'leitura'}),
  arrow(150, 90, 150, 140),
  label(158, 118, 'write', {size: 10}),
  arrow(260, 165, 430, 135),
  arrow(260, 180, 430, 205),
  label(345, 150, 'replicação', {anchor: 'middle', size: 10}),
  arrow(340, 55, 430, 125),
  arrow(340, 68, 430, 200),
  label(385, 45, 'read', {anchor: 'middle', size: 10}),
].join('\n');

scenes['sd-cache.svg'] = [
  head(
    '0 0 700 210',
    'Diagrama: cache read-through — o servidor busca no cache e só vai ao banco no miss',
    'Cache read-through',
    'O servidor consulta o cache; no acerto devolve direto; no miss busca no banco e popula o cache.',
  ),
  label(18, 22, 'Cache na frente do banco (read-through)'),
  rect(40, 80, 180, 60, 'Servidor web', 'proc'),
  rect(330, 60, 180, 50, 'Cache', 'store'),
  rect(330, 150, 180, 50, 'Banco', 'store'),
  arrow(220, 95, 330, 85),
  label(275, 80, '1 busca', {anchor: 'middle', size: 10}),
  arrow(330, 108, 220, 125),
  label(275, 132, 'hit: devolve', {anchor: 'middle', size: 10}),
  arrow(420, 150, 420, 110),
  label(432, 134, '2.1 miss', {size: 10}),
].join('\n');

scenes['sd-cdn.svg'] = [
  head(
    '0 0 760 250',
    'Diagrama: CDN entrega conteúdo estático do servidor mais próximo do usuário',
    'Content delivery network',
    'O cliente busca o conteúdo estático na CDN; se não houver cache, a CDN busca na origem e passa a servir.',
  ),
  label(18, 22, 'CDN: conteúdo estático perto do usuário'),
  rect(40, 60, 150, 50, 'Cliente A', 'box'),
  rect(40, 160, 150, 50, 'Cliente B', 'box'),
  rect(300, 100, 160, 60, 'CDN', 'proc', {sub: '30 ms'}),
  rect(560, 100, 170, 60, 'Origem', 'store', {sub: '120 ms'}),
  arrow(190, 85, 300, 115),
  arrow(190, 185, 300, 145),
  arrow(460, 130, 560, 130),
  label(510, 122, 'miss', {anchor: 'middle', size: 10}),
].join('\n');

scenes['sd-stateful-stateless.svg'] = [
  head(
    '0 0 880 300',
    'Diagrama: arquitetura com estado (sticky) versus sem estado com store compartilhado',
    'Com estado vs sem estado',
    'Com estado, cada usuário fica preso a um servidor. Sem estado, os servidores buscam o estado num store compartilhado.',
  ),
  label(30, 24, 'Com estado (sticky)', {weight: 'bold'}),
  rect(30, 60, 130, 46, 'Usuário A', 'box'),
  rect(210, 60, 200, 46, 'Servidor 1', 'proc', {sub: 'sessão de A'}),
  arrow(160, 83, 210, 83),
  rect(30, 140, 130, 46, 'Usuário B', 'box'),
  rect(210, 140, 200, 46, 'Servidor 2', 'proc', {sub: 'sessão de B'}),
  arrow(160, 163, 210, 163),
  label(30, 225, 'cada usuário preso ao seu servidor', {size: 10}),
  label(470, 24, 'Sem estado', {weight: 'bold'}),
  rect(470, 60, 130, 46, 'Usuário A', 'box'),
  rect(650, 50, 200, 36, 'Servidor 1', 'proc'),
  rect(650, 92, 200, 36, 'Servidor 2', 'proc'),
  rect(650, 134, 200, 36, 'Servidor 3', 'proc'),
  arrow(600, 83, 650, 68),
  arrow(600, 83, 650, 110),
  arrow(600, 83, 650, 152),
  rect(650, 210, 200, 46, 'Store compartilhado', 'store'),
  arrow(750, 170, 750, 210),
  label(470, 235, 'estado fora do servidor → escala fácil', {size: 10}),
].join('\n');

scenes['sd-message-queue.svg'] = [
  head(
    '0 0 760 200',
    'Diagrama: message queue desacopla produtores e consumidores',
    'Message queue',
    'Produtores publicam mensagens na fila; consumidores as processam de forma assíncrona e independente.',
  ),
  label(18, 22, 'Fila: produtores e consumidores escalam sozinhos'),
  rect(40, 70, 200, 60, 'Produtores', 'proc', {sub: 'servidores web'}),
  rect(320, 75, 180, 50, 'Fila', 'store'),
  rect(580, 70, 160, 60, 'Consumidores', 'proc', {sub: 'workers'}),
  arrow(240, 100, 320, 100),
  label(280, 92, 'publica', {anchor: 'middle', size: 10}),
  arrow(500, 100, 580, 100),
  label(540, 92, 'consome', {anchor: 'middle', size: 10}),
].join('\n');

scenes['sd-sharding.svg'] = [
  head(
    '0 0 700 260',
    'Diagrama: sharding por user_id % 4 distribui as linhas entre quatro shards',
    'Sharding',
    'Uma função de hash do sharding key decide em qual shard a linha é gravada e lida.',
  ),
  label(18, 22, 'Sharding: o sharding key decide o shard'),
  rect(20, 100, 140, 56, 'Requisição', 'box', {sub: 'user_id'}),
  `  <polygon points="250,88 330,128 250,168 170,128" class="proc"/>`,
  `  <text x="250" y="132" font-size="12" text-anchor="middle">user_id % 4</text>`,
  rect(430, 30, 200, 40, 'Shard 0', 'store'),
  rect(430, 80, 200, 40, 'Shard 1', 'store'),
  rect(430, 130, 200, 40, 'Shard 2', 'store'),
  rect(430, 180, 200, 40, 'Shard 3', 'store'),
  arrow(160, 128, 170, 128),
  arrow(330, 112, 430, 50),
  arrow(330, 124, 430, 100),
  arrow(330, 136, 430, 150),
  arrow(330, 148, 430, 200),
].join('\n');

// ---------------------------------------------------------------- ch 04
scenes['sd-framework-4-passos.svg'] = [
  head(
    '0 0 820 200',
    'Diagrama: o processo de 4 passos de uma entrevista de system design',
    'Processo de 4 passos',
    'Entender o problema e o escopo, propor o alto nível, aprofundar nos componentes críticos e fechar.',
  ),
  label(18, 22, 'O processo de 4 passos'),
  rect(20, 70, 180, 64, '1. Entender', 'proc', {sub: 'problema + escopo'}),
  rect(220, 70, 180, 64, '2. Alto nível', 'proc', {sub: 'blueprint + buy-in'}),
  rect(420, 70, 180, 64, '3. Deep dive', 'proc', {sub: 'componentes críticos'}),
  rect(620, 70, 180, 64, '4. Fechar', 'proc', {sub: 'gargalos + next'}),
  arrow(200, 102, 220, 102),
  arrow(400, 102, 420, 102),
  arrow(600, 102, 620, 102),
  label(110, 160, '3–10 min', {anchor: 'middle', size: 10}),
  label(310, 160, '10–15 min', {anchor: 'middle', size: 10}),
  label(510, 160, '10–25 min', {anchor: 'middle', size: 10}),
  label(710, 160, '3–5 min', {anchor: 'middle', size: 10}),
].join('\n');

// ---------------------------------------------------------------- ch 06
const ringCircle = (cx, cy, r) =>
  `  <circle cx="${cx}" cy="${cy}" r="${r}" class="ring"/>`;
const node = (cx, cy, lbl, cls = 'proc') =>
  `  <circle cx="${cx}" cy="${cy}" r="22" class="${cls}"/>\n  <text x="${cx}" y="${cy + 4}" font-size="10" text-anchor="middle">${esc(lbl)}</text>`;
const keydot = (cx, cy, lbl) =>
  `  <circle cx="${cx}" cy="${cy}" r="5" class="keydot"/>\n  <text x="${cx + 9}" y="${cy + 4}" font-size="10" class="lbl">${esc(lbl)}</text>`;

scenes['sd-ring-lookup.svg'] = [
  head(
    '0 0 620 400',
    'Diagrama: anel de hash com servidores e chaves; a chave vai para o primeiro servidor no sentido horário',
    'Anel de hash e lookup',
    'Servidores e chaves são mapeados no mesmo anel; a chave pertence ao primeiro servidor encontrado no sentido horário.',
  ),
  label(18, 22, 'Lookup: anda no sentido horário até o primeiro servidor'),
  ringCircle(310, 200, 130),
  path('M 310 45 A 155 155 0 0 1 465 200'),
  label(410, 60, 'sentido horário', {size: 10}),
  node(310, 70, 's0'),
  node(440, 200, 's1'),
  node(310, 330, 's2'),
  node(180, 200, 's3'),
  keydot(394, 100, 'k0'),
  keydot(410, 284, 'k1'),
  keydot(226, 300, 'k2'),
  keydot(210, 116, 'k3'),
  arrow(394, 100, 430, 185),
  arrow(410, 284, 320, 325),
  arrow(226, 300, 190, 215),
  arrow(210, 116, 300, 78),
].join('\n');

scenes['sd-ring-add-remove.svg'] = [
  head(
    '0 0 620 400',
    'Diagrama: adicionar um servidor no anel redistribui apenas a fração de chaves da faixa afetada',
    'Adicionar ou remover servidor',
    'Ao adicionar s4, apenas as chaves entre s3 e s4 migram; o resto permanece onde estava.',
  ),
  label(18, 22, 'Add/remove: só a faixa afetada migra'),
  ringCircle(310, 200, 130),
  `  <path d="M 234 305 A 130 130 0 0 1 186 160" class="flow" stroke-width="4"/>`,
  node(310, 70, 's0'),
  node(434, 160, 's1'),
  node(386, 305, 's2'),
  node(234, 305, 's3'),
  node(186, 160, 's4'),
  label(150, 360, 'chaves entre s3 e s4 migram para s4', {size: 10}),
].join('\n');

scenes['sd-virtual-nodes.svg'] = [
  head(
    '0 0 620 400',
    'Diagrama: virtual nodes distribuem cada servidor em vários pontos do anel, equilibrando a carga',
    'Virtual nodes',
    'Cada servidor físico vira vários nós virtuais no anel, o que equilibra a distribuição das chaves.',
  ),
  label(18, 22, 'Virtual nodes: cada servidor em vários pontos'),
  ringCircle(310, 200, 130),
  node(310, 70, 's0_0'),
  node(423, 135, 's1_0'),
  node(423, 265, 's0_1'),
  node(310, 330, 's1_1'),
  node(197, 265, 's0_2'),
  node(197, 135, 's1_2'),
  keydot(375, 87, 'k0'),
  arrow(375, 87, 405, 120),
  label(470, 60, 'k0 → s1_0 → servidor 1', {size: 10}),
].join('\n');

// ---------------------------------------------------------------- ch 07
scenes['sd-cap.svg'] = [
  head(
    '0 0 640 380',
    'Diagrama: teorema CAP — consistência, disponibilidade e tolerância a partição; escolha dois de três',
    'Teorema CAP',
    'Um sistema distribuído não garante consistência, disponibilidade e tolerância a partição ao mesmo tempo; escolhe-se dois.',
  ),
  label(18, 22, 'CAP: escolha dois dos três'),
  `  <path d="M 320 60 L 120 320 L 520 320 Z" class="flow"/>`,
  rect(250, 20, 140, 46, 'Consistência', 'box'),
  rect(30, 320, 190, 46, 'Disponibilidade', 'box'),
  rect(430, 320, 190, 46, 'Partição', 'box'),
  label(190, 200, 'CP', {size: 13, weight: 'bold'}),
  label(430, 200, 'AP', {size: 13, weight: 'bold'}),
  label(320, 350, 'CA', {size: 13, weight: 'bold'}),
  label(18, 300, 'CA não existe em rede real', {size: 10}),
].join('\n');

scenes['sd-kv-replicacao.svg'] = [
  head(
    '0 0 620 400',
    'Diagrama: no anel, a chave é replicada nos N primeiros servidores no sentido horário',
    'Replicação no anel',
    'Com N=3, key0 é replicada em s1, s2 e s3, os três primeiros servidores após a chave no anel.',
  ),
  label(18, 22, 'Replicação: N primeiros servidores após a chave'),
  ringCircle(310, 200, 130),
  node(310, 70, 's0'),
  node(402, 108, 's1', 'store'),
  node(440, 200, 's2', 'store'),
  node(402, 292, 's3', 'store'),
  node(310, 330, 's4'),
  node(218, 292, 's5'),
  node(180, 200, 's6'),
  node(218, 108, 's7'),
  keydot(354, 78, 'key0'),
  label(470, 60, 'N = 3', {size: 11}),
].join('\n');

scenes['sd-kv-quorum.svg'] = [
  head(
    '0 0 700 280',
    'Diagrama: quorum — o coordenador espera W acknowledgements na escrita e R na leitura',
    'Quorum consensus',
    'O coordenador é o proxy entre cliente e nós; a escrita espera W acks e a leitura espera R respostas.',
  ),
  label(18, 22, 'Quorum: W + R > N garante consistência forte'),
  rect(20, 115, 130, 50, 'Cliente', 'box'),
  rect(220, 115, 150, 50, 'Coordenador', 'proc'),
  rect(470, 60, 200, 44, 's0', 'store'),
  rect(470, 120, 200, 44, 's1', 'store'),
  rect(470, 180, 200, 44, 's2', 'store'),
  arrow(150, 140, 220, 140),
  arrow(370, 130, 470, 82),
  arrow(370, 140, 470, 142),
  arrow(370, 150, 470, 202),
  label(410, 250, 'ACK', {anchor: 'middle', size: 10}),
  label(560, 40, 'N = 3', {anchor: 'middle', size: 11}),
].join('\n');

scenes['sd-vector-clock.svg'] = [
  head(
    '0 0 780 320',
    'Diagrama: vector clocks resolvem conflito de versões — D3 e D4 são irmãos, D5 reconcilia',
    'Versionamento com vector clock',
    'Duas escritas concorrentes geram versões irmãs; o cliente detecta o conflito e reconcilia numa nova versão.',
  ),
  label(18, 22, 'Vector clock: detecta conflito entre versões'),
  rect(30, 140, 150, 46, 'D1', 'box', {sub: 'Sx,1'}),
  rect(230, 140, 150, 46, 'D2', 'box', {sub: 'Sx,2'}),
  rect(450, 60, 190, 46, 'D3', 'box', {sub: 'Sx,2 · Sy,1'}),
  rect(450, 220, 190, 46, 'D4', 'box', {sub: 'Sx,2 · Sz,1'}),
  rect(660, 140, 110, 46, 'D5', 'box', {sub: 'reconciliado'}),
  arrow(180, 163, 230, 163),
  arrow(380, 155, 450, 90),
  arrow(380, 170, 450, 235),
  arrow(640, 90, 660, 140),
  arrow(640, 235, 660, 180),
  label(430, 300, 'D3 e D4: irmãos (conflito)', {size: 10}),
].join('\n');

scenes['sd-merkle.svg'] = [
  head(
    '0 0 760 300',
    'Diagrama: Merkle tree — compara a raiz e desce só nos buckets divergentes',
    'Merkle tree',
    'Comparam-se os hashes da raiz; se diferem, desce-se na árvore só até os buckets que divergem.',
  ),
  label(18, 22, 'Merkle tree: sincroniza só o que difere'),
  rect(300, 40, 160, 46, 'raiz', 'proc'),
  rect(140, 140, 150, 46, 'bucket 1-3', 'box'),
  rect(470, 140, 150, 46, 'bucket 4-6', 'box'),
  rect(60, 230, 130, 42, 'h(k1)', 'store'),
  rect(210, 230, 130, 42, 'h(k3)', 'store'),
  rect(390, 230, 130, 42, 'h(k4)', 'store'),
  rect(540, 230, 130, 42, 'h(k6)', 'store'),
  arrow(380, 86, 250, 140),
  arrow(380, 86, 510, 140),
  arrow(200, 186, 130, 230),
  arrow(220, 186, 260, 230),
  arrow(510, 186, 450, 230),
  arrow(540, 186, 590, 230),
].join('\n');

scenes['sd-kv-arquitetura.svg'] = [
  head(
    '0 0 760 340',
    'Diagrama: arquitetura descentralizada — cliente, coordenador e nós num anel por consistent hashing',
    'Arquitetura do key-value store',
    'O cliente fala com um coordenador, que distribui os nós num anel usando consistent hashing; não há ponto único de falha.',
  ),
  label(18, 22, 'Arquitetura: descentralizada, cada nó com todas as responsabilidades'),
  rect(20, 130, 130, 50, 'Cliente', 'box'),
  rect(210, 130, 150, 50, 'Coordenador', 'proc', {sub: 'proxy'}),
  ringCircle(560, 170, 100),
  node(560, 70, 'n0'),
  node(631, 99, 'n1'),
  node(660, 170, 'n2'),
  node(631, 241, 'n3'),
  node(560, 270, 'n4'),
  node(489, 241, 'n5'),
  node(460, 170, 'n6'),
  node(489, 99, 'n7'),
  arrow(150, 155, 210, 155),
  arrow(360, 145, 490, 110),
  label(410, 120, 'get / put', {size: 10}),
].join('\n');

for (const [file, body] of Object.entries(scenes)) {
  writeFileSync(join(outDir, file), body + '\n</svg>\n');
}

console.log(`fundamentals: ${Object.keys(scenes).length} SVGs em static/img/diagramas/`);
