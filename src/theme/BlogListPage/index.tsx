import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import type {Props} from '@theme/BlogListPage';
import posts from '@site/src/data/all-posts.json';
import styles from './styles.module.css';

type Post = {slug: string; title: string; date: string; description: string};

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function fmtData(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

function Vitrine() {
  const recentes = (posts as Post[]).slice(0, 6);
  return (
    <Layout title="Aprendizados em engenharia de software" description="Posts recentes do blog">
      <main className={styles.page}>
        <p className={styles.kicker}>Aprendizados em engenharia de software</p>
        <h1 className={styles.title}>Recentes</h1>
        <div className={styles.list}>
          {recentes.map((p) => (
            <Link className={styles.card} to={`/${p.slug}`} key={p.slug}>
              <span className={styles.date}>{fmtData(p.date)}</span>
              <strong>{p.title}</strong>
              {p.description ? <span className={styles.desc}>{p.description}</span> : null}
            </Link>
          ))}
        </div>
        <Link className={styles.cta} to="/posts">
          Ver todos os posts -&gt;
        </Link>
      </main>
    </Layout>
  );
}

export default function BlogListPage(props: Props): React.JSX.Element {
  const page = props.metadata?.page ?? 1;
  if (page !== 1) {
    return <OriginalBlogListPage {...props} />;
  }
  return <Vitrine />;
}
