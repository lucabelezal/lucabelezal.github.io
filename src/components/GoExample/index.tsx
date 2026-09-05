import {useState} from 'react';
import Link from '@docusaurus/Link';
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
  empty,
}: {
  docs?: React.ReactNode;
  code: string;
  empty?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <tr className={styles.row}>
      <td className={styles.docs}>{docs}</td>
      <td className={`${styles.code} ${empty ? styles.codeEmpty : ''}`}>
        {!empty && (
          <span className={styles.actions}>
            <span onClick={copy} title="Copy" className={styles.copy} style={{cursor: 'pointer'}}>
              {copied ? '✓' : '⧉'}
            </span>
          </span>
        )}
        <pre>
          <code>{code}</code>
        </pre>
      </td>
    </tr>
  );
}

export default function GoExample({title, playHash, next, children}: GoExampleProps) {
  const allCode = (() => {
    // collect from children if needed for play URL; fallback to hash
    return '';
  })();

  const runUrl = playHash
    ? `https://go.dev/play/p/${playHash}`
    : `https://go.dev/play/`;

  const copyAll = async () => {
    // crude: copy visible code via DOM? fallback
    const el = document.querySelectorAll(`.${styles.code} code`);
    const txt = Array.from(el)
      .map((n) => n.textContent)
      .join('\n');
    await navigator.clipboard.writeText(txt);
  };

  return (
    <div className={styles.wrapper}>
      <h2>
        <Link to="/go">Go by Example</Link>: {title}
      </h2>

      <table className={styles.table}>
        <tbody>{children}</tbody>
      </table>

      <div style={{marginTop: 8, textAlign: 'right', fontSize: 12}}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            copyAll();
          }}
        >
          ⧉ Copiar tudo
        </a>
        {' · '}
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
