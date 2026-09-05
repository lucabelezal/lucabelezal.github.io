import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type GoExampleProps = {
  title: string;
  playHash?: string;
  next?: {title: string; href: string};
  prev?: {title: string; href: string};
  children: React.ReactNode;
};

export function GoExampleRow({
  docs,
  code,
  language = 'go',
  title,
  empty,
}: {
  docs?: React.ReactNode;
  code: string;
  language?: string;
  title?: string;
  empty?: boolean;
}) {
  const docsNode =
    typeof docs === 'string' ? <p style={{margin: 0}}>{docs}</p> : docs;
  if (empty) {
    return (
      <tr className={styles.row}>
        <td className={styles.docs}>{docsNode}</td>
        <td className={`${styles.code} ${styles.codeEmpty}`} />
      </tr>
    );
  }
  return (
    <tr className={styles.row}>
      <td className={styles.docs}>{docsNode}</td>
      <td className={styles.code}>
        <CodeBlock language={language} title={title} showLineNumbers={false}>
          {code}
        </CodeBlock>
      </td>
    </tr>
  );
}

export default function GoExample({title, playHash, next, children}: GoExampleProps) {
  const runUrl = playHash ? `https://go.dev/play/p/${playHash}` : `https://go.dev/play/`;

  return (
    <div className={styles.wrapper}>
      <h2>
        <Link to="/go">Go by Example</Link>: {title}
      </h2>

      <table className={styles.table}>
        <tbody>{children}</tbody>
      </table>

      <div style={{marginTop: 8, textAlign: 'right', fontSize: 12, opacity: 0.8}}>
        <a href={runUrl} target="_blank" rel="noreferrer">
          Run on go.dev/play ↗
        </a>
      </div>

      {next && (
        <p className={styles.next}>
          Próximo exemplo: <Link to={next.href}>{next.title}</Link>.
        </p>
      )}
    </div>
  );
}
