// Sincroniza as skills canônicas do projeto (skills/) para as árvores que os
// agentes leem (.claude, .agents, .cursor, .windsurf). Preserva
// .skill-meta.json existente no destino. Skills externas (geridas por
// skills-lock.json / .agents/.skill-lock.json) não são tocadas.
// Rodar: npm run skills:sync
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'skills');
const targets = [
  '.claude/skills',
  '.agents/skills',
  '.cursor/skills',
  '.windsurf/skills',
];

const skills = readdirSync(srcDir, {withFileTypes: true})
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (skills.length === 0) {
  console.error('skills/: nenhuma skill encontrada.');
  process.exit(1);
}

let copied = 0;
for (const target of targets) {
  const dir = join(root, target);
  mkdirSync(dir, {recursive: true});
  for (const name of skills) {
    const from = join(srcDir, name);
    const to = join(dir, name);
    const metaPath = join(to, '.skill-meta.json');
    const meta = existsSync(metaPath) ? readFileSync(metaPath) : null;
    rmSync(to, {recursive: true, force: true});
    cpSync(from, to, {recursive: true});
    if (meta) writeFileSync(metaPath, meta);
    copied++;
  }
}

console.log(
  `skills:sync — ${skills.length} skills × ${targets.length} alvos (${copied} cópias).`,
);
