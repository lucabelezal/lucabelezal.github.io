// Gera src/data/all-posts.json a partir do frontmatter de blog/*.mdx.
// Uso: npm run posts:index (rode sempre que criar/remover post).
import {readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = join(root, 'blog');
const outFile = join(root, 'src', 'data', 'all-posts.json');

function field(body, name) {
  const m = body.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
  if (!m) return null;
  return m[1].trim().replace(/^"(.*)"$/, '$1');
}

function tagsOf(body) {
  const m = body.match(/^tags:\s*\[(.*)\]$/m);
  if (!m) return [];
  return m[1].split(',').map((t) => t.trim()).filter(Boolean);
}

const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((file) => {
    const body = readFileSync(join(blogDir, file), 'utf8');
    const fromName = file.match(/^(\d{4})-(\d{2})-(\d{2})-/) ?? [];
    const date = field(body, 'date') ?? `${fromName[1]}-${fromName[2]}-${fromName[3]}T00:00:00`;
    return {
      slug: field(body, 'slug'),
      title: field(body, 'title'),
      date,
      description: field(body, 'description') ?? '',
      tags: tagsOf(body),
    };
  })
  .filter((p) => p.slug && p.title && p.date)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

mkdirSync(join(root, 'src', 'data'), {recursive: true});
writeFileSync(outFile, JSON.stringify(posts, null, 2) + '\n');
console.log(`all-posts: ${posts.length} posts -> src/data/all-posts.json`);
