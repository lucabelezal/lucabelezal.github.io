// Gera src/data/all-posts.json a partir de blog/* e go-by-example/*.
// Uso: npm run posts:index (o prebuild já executa; rode sempre que criar/remover conteúdo).
import {readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, dirname, basename, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = join(root, 'blog');
const goDir = join(root, 'go-by-example');
const outFile = join(root, 'src', 'data', 'all-posts.json');

function frontmatter(body) {
  const m = body.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

function unquote(s) {
  const m = s.match(/^(['"])(.*)\1$/s);
  return m ? m[2] : s;
}

function field(fm, name) {
  const m = fm.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'));
  if (!m) return null;
  return unquote(m[1].trim());
}

function tagsOf(fm) {
  const inline = fm.match(/^tags:\s*\[(.*)\]\s*$/m);
  if (inline) {
    return inline[1]
      .split(',')
      .map((t) => unquote(t.trim()))
      .filter(Boolean);
  }
  const lines = fm.split('\n');
  const idx = lines.findIndex((l) => /^tags:\s*$/.test(l));
  if (idx === -1) return [];
  const tags = [];
  for (let i = idx + 1; i < lines.length; i++) {
    const m = lines[i].match(/^\s*-\s*(.+?)\s*$/);
    if (!m) break;
    const tag = unquote(m[1].trim());
    if (tag) tags.push(tag);
  }
  return tags;
}

function sidebarOrder() {
  try {
    const src = readFileSync(join(root, 'sidebarsGo.ts'), 'utf8');
    return src.match(/'([^']+)'/g)?.map((s) => s.slice(1, -1)) ?? [];
  } catch {
    return [];
  }
}

function scanBlog() {
  return readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const fm = frontmatter(readFileSync(join(blogDir, file), 'utf8'));
      const fromName = file.match(/^(\d{4})-(\d{2})-(\d{2})-/) ?? [];
      const fallbackSlug = basename(file, extname(file)).replace(
        /^\d{4}-\d{2}-\d{2}-/,
        '',
      );
      const slug = field(fm, 'slug') ?? fallbackSlug;
      const date =
        field(fm, 'date') ??
        (fromName[1] ? `${fromName[1]}-${fromName[2]}-${fromName[3]}T00:00:00` : null);
      return {
        kind: 'blog',
        slug,
        title: field(fm, 'title'),
        date,
        description: field(fm, 'description') ?? '',
        tags: tagsOf(fm),
        url: `/${slug}`,
      };
    })
    .filter((p) => p.slug && p.title && p.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function scanGo() {
  const order = sidebarOrder();
  const rank = new Map(order.map((id, i) => [id, i]));
  return readdirSync(goDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const fm = frontmatter(readFileSync(join(goDir, file), 'utf8'));
      const id = basename(file, extname(file)).replace(/^\d+-/, '');
      const isIndex = id === 'index';
      return {
        kind: 'go',
        slug: isIndex ? 'go' : id,
        title: field(fm, 'title') ?? id,
        date: field(fm, 'date'),
        description: field(fm, 'description') ?? '',
        tags: tagsOf(fm).length > 0 ? tagsOf(fm) : ['go'],
        url: isIndex ? '/go' : `/go/${id}`,
      };
    })
    .filter((p) => p.title)
    .sort((a, b) => {
      const idOf = (p) => (p.slug === 'go' ? 'index' : p.slug);
      const ra = rank.has(idOf(a)) ? rank.get(idOf(a)) : Number.MAX_SAFE_INTEGER;
      const rb = rank.has(idOf(b)) ? rank.get(idOf(b)) : Number.MAX_SAFE_INTEGER;
      if (ra !== rb) return ra - rb;
      return a.slug < b.slug ? -1 : 1;
    });
}

const blog = scanBlog();
const go = scanGo();
const entries = [...blog, ...go];

mkdirSync(join(root, 'src', 'data'), {recursive: true});
writeFileSync(outFile, JSON.stringify(entries, null, 2) + '\n');
console.log(
  `all-posts: ${blog.length} blog + ${go.length} go-by-example -> src/data/all-posts.json`,
);
