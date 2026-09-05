import fs from 'fs';
import path from 'path';

const SRC = '/Users/lucasnascimento/Downloads/gobyexample';
const DEST = 'go-by-example';
const examplesTxt = fs.readFileSync(path.join(SRC, 'examples.txt'), 'utf8').split('\n').filter(Boolean);

function toId(name) {
  let id = name.toLowerCase();
  id = id.replace(/ /g, '-');
  id = id.replace(/\//g, '-');
  id = id.replace(/'/g, '');
  id = id.replace(/-+/g, '-');
  return id;
}

const docsPat = /^(\s*(\/\/|#)\s|\s*\/\/$)/;

function parseSegs(lines) {
  const segs = [];
  let lastSeen = '';
  for (const raw of lines) {
    const line = raw.replace(/\t/g, '    ');
    if (line === '') {
      lastSeen = '';
      continue;
    }
    const isDocs = docsPat.test(line);
    const newDocs = lastSeen === '' || (lastSeen !== 'docs' && segs.length && segs[segs.length-1].Docs !== '');
    const newCode = lastSeen === '' || (lastSeen !== 'code' && segs.length && segs[segs.length-1].Code !== '');
    if (isDocs) {
      const trimmed = line.replace(docsPat, '');
      if (newDocs || segs.length === 0 || segs[segs.length-1].Docs === undefined) {
        segs.push({Docs: trimmed, Code: ''});
      } else {
        segs[segs.length-1].Docs += '\n' + trimmed;
      }
      lastSeen = 'docs';
    } else {
      if (newCode || segs.length === 0) {
        segs.push({Docs: '', Code: line});
      } else {
        const last = segs[segs.length-1];
        if (last.Code === '') last.Code = line;
        else last.Code += '\n' + line;
      }
      lastSeen = 'code';
    }
  }
  for (let i = 0; i < segs.length; i++) {
    segs[i].CodeEmpty = segs[i].Code === '';
    segs[i].CodeLeading = i < segs.length - 1;
  }
  return segs;
}

function escapeForJS(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

let sidebar = ["'index'"];
let indexEntries = [];

for (let idx = 0; idx < examplesTxt.length; idx++) {
  const name = examplesTxt[idx];
  const id = toId(name);
  const goPath = path.join(SRC, `examples/${id}/${id}.go`);
  const hashPath = path.join(SRC, `examples/${id}/${id}.hash`);
  const shPath = path.join(SRC, `examples/${id}/${id}.sh`);

  if (!fs.existsSync(goPath)) {
    if (id === 'testing-and-benchmarking') {
      const manualMdx = `---\ntitle: Testing and Benchmarking\n---\n\n# Testing and Benchmarking\n\nExemplo de testes e benchmarks em Go. O diretório original contém \`main_test.go\` — veja o [gobyexample.com](https://gobyexample.com/testing-and-benchmarking) para o exemplo completo.\n\n\`\`\`go title="main_test.go"\npackage main\n\nimport "testing"\n\nfunc IntMin(a, b int) int {\n    if a < b { return a }\n    return b\n}\n\nfunc TestIntMinBasic(t *testing.T) {\n    if IntMin(2, -2) != -2 { t.Errorf("fail") }\n}\n\`\`\`\n`;
      fs.writeFileSync(path.join(DEST, '72-testing-and-benchmarking.mdx'), manualMdx);
      console.log('wrote go-by-example/72-testing-and-benchmarking.mdx (manual)');
      sidebar.push(`'${id}'`);
      indexEntries.push({name, id});
      continue;
    }
    console.warn(`skip ${name} -> ${id} (no go file)`);
    continue;
  }

  const hashContent = fs.existsSync(hashPath) ? fs.readFileSync(hashPath, 'utf8').split('\n') : [];
  const playHash = hashContent[1]?.trim() || '';

  const lines = fs.readFileSync(goPath, 'utf8').split('\n');
  const segs = parseSegs(lines);

  // Append shell output as extra segs from .sh if exists - as bash blocks with empty docs initially
  let shCode = '';
  if (fs.existsSync(shPath)) {
    shCode = fs.readFileSync(shPath, 'utf8').trim();
  }

  const nextName = examplesTxt[idx+1];
  const nextId = nextName ? toId(nextName) : null;
  const next = nextId ? `{title: "${nextName}", href: "/go/${nextId}"}` : 'undefined';

  // Build MDX
  let mdx = `---\ntitle: ${name}\n---\n\nimport GoExample, {GoExampleRow} from '@site/src/components/GoExample';\n\n<GoExample title="${name.replace(/"/g, '\\"')}" playHash="${playHash}" next={${next}}>\n\n`;

  for (const seg of segs) {
    const docs = seg.Docs.trim().replace(/\n/g, ' ');
    const code = seg.Code;
    if (!docs && !code) continue;
    const docsProp = docs ? `docs={${JSON.stringify(docs)}}` : `docs={undefined}`;
    const lang = 'go';
    const title = code.includes('package main') ? `${id}.go` : undefined;
    const titleProp = title ? ` title={${JSON.stringify(title)}}` : '';
    if (seg.CodeEmpty) {
      mdx += `<GoExampleRow ${docsProp} empty code="" />\n\n`;
    } else if (!docs) {
      mdx += `<GoExampleRow ${docsProp} language="${lang}"${titleProp} code={${JSON.stringify(code)}} />\n\n`;
    } else {
      mdx += `<GoExampleRow ${docsProp} language="${lang}"${titleProp} code={${JSON.stringify(code)}} />\n\n`;
    }
  }

  if (shCode) {
    mdx += `<GoExampleRow docs={"Saída:"} language="bash" code={${JSON.stringify(shCode)}} />\n\n`;
  }

  mdx += `</GoExample>\n`;

  const destFile = path.join(DEST, `${String(idx+1).padStart(2,'0')}-${id}.mdx`);
  fs.writeFileSync(destFile, mdx);
  console.log(`wrote ${destFile}`);
  sidebar.push(`'${id}'`);
  indexEntries.push({name, id});
}

// Update sidebar
const sidebarContent = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  goSidebar: [${sidebar.join(', ')}],
};

export default sidebars;
`;
fs.writeFileSync('sidebarsGo.ts', sidebarContent);
console.log('updated sidebarsGo.ts');

// Update index.mdx list
let indexMdx = `---\ntitle: Go by Example\nslug: /\n---\n\n# Go by Example\n\nGo é uma linguagem open source projetada para software escalável e confiável. Leia a [documentação oficial](https://go.dev/doc/) para saber mais.\n\n**Go by Example** é uma introdução prática a Go com programas anotados. Comece pelo [Hello World](/go/hello-world) ou navegue pela lista abaixo.\n\n> A menos que indicado, os exemplos assumem a última versão major de Go. Atualize se algo não funcionar.\n\n## Lista completa\n\n<div style={{columns: 2, columnGap: '2rem'}}>\n\n`;
for (const e of indexEntries) {
  indexMdx += `- [${e.name}](/go/${e.id})\n`;
}
indexMdx += `\n</div>\n\n> Exemplos adaptados de [gobyexample.com](https://gobyexample.com) por Mark McGranaghan e Eli Bendersky — [source](https://github.com/mmcgrana/gobyexample) | [license CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).\n`;
fs.writeFileSync(path.join(DEST, 'index.mdx'), indexMdx);
console.log('updated index.mdx');
