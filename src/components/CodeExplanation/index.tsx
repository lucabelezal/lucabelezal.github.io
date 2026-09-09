import {useEffect, useState, type ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const EXPAND_LABEL: Record<string, string> = {
  'pt-BR': 'Expandir código',
  en: 'Expand code',
  es: 'Expandir código',
};

const RESTORE_LABEL: Record<string, string> = {
  'pt-BR': 'Mostrar explicação',
  en: 'Show explanation',
  es: 'Mostrar explicación',
};

function storageKey(fileName: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return `gbe.codex.expand::${window.location.pathname}::${fileName}`;
}

function ExpandIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 3.5 5 8l4.5 4.5" />
      <path d="M13.5 3.5 9 8l4.5 4.5" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 3.5 11 8l-4.5 4.5" />
      <path d="M2.5 3.5 7 8l-4.5 4.5" />
    </svg>
  );
}

type Section = {
  text: string;
  highlight?: string;
};

type CodeExplanationProps = {
  title: string;
  code: string;
  language?: string;
  locale?: 'pt-BR' | 'en' | 'es';
  sections?: Section[];
};

function renderInline(text: string, keyPrefix: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }

    return part.split(/(\[[^\]]+\]\([^\)]+\))/g).map((linkPart, j) => {
      const linkMatch = linkPart.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const external = /^https?:\/\//.test(href);
        return (
          <a
            key={`${key}-link-${j}`}
            href={href}
            {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}
          >
            {renderInline(label, `${key}-label-${j}`)}
          </a>
        );
      }

      return linkPart.split(/(\*\*[^*]+\*\*)/g).map((boldPart, k) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return <strong key={`${key}-bold-${j}-${k}`}>{boldPart.slice(2, -2)}</strong>;
        }
        return boldPart;
      });
    });
  });
}

function InlineText({text}: {text: string}) {
  return (
    <>
      {text.split('\n').map((line, li) => (
        <span key={li}>
          {renderInline(line, `line-${li}`)}
          {li < text.split('\n').length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function isTerminalSection(text: string) {
  return text.trimStart().startsWith('Saída:') || text.trimStart().startsWith('Output:') || text.includes('$ go ');
}

export default function CodeExplanation({
  title,
  code,
  language = 'go',
  locale = 'pt-BR',
  sections = [],
}: CodeExplanationProps) {
  const fileName = title.endsWith('.go')
    ? title
    : `${title.toLowerCase().replace(/\s+/g, '-')}.go`;
  const terminalSections = sections.filter((s) => isTerminalSection(s.text));
  const contentSections = sections.filter((s) => !isTerminalSection(s.text));
  const [expanded, setExpanded] = useState(false);
  const [restoredFromStorage, setRestoredFromStorage] = useState(false);

  useEffect(() => {
    const key = storageKey(fileName);
    if (!key) {
      return;
    }
    try {
      setExpanded(sessionStorage.getItem(key) === '1');
    } catch {
      // storage indisponível — mantém estado padrão
    }
    setRestoredFromStorage(true);
  }, [fileName]);

  useEffect(() => {
    if (!restoredFromStorage) {
      return;
    }
    const key = storageKey(fileName);
    if (!key) {
      return;
    }
    try {
      if (expanded) {
        sessionStorage.setItem(key, '1');
      } else {
        sessionStorage.removeItem(key);
      }
    } catch {
      // storage indisponível — ignora
    }
  }, [expanded, fileName, restoredFromStorage]);

  const toggle = () => setExpanded((v) => !v);
  const label = (expanded ? RESTORE_LABEL : EXPAND_LABEL)[locale] ?? EXPAND_LABEL['pt-BR'];

  return (
    <div className={expanded ? `${styles.container} ${styles.codeOnly}` : styles.container}>
      {!expanded && (
        <div className={styles.left}>
          <div className={styles.leftHeader}>
            <h3>{title}</h3>
            <button
              type="button"
              className={styles.toggle}
              onClick={toggle}
              aria-expanded={false}
              aria-label={label}
              title={label}
            >
              <ExpandIcon />
            </button>
          </div>
          {contentSections.map((s, i) => (
            <p key={i}>
              <InlineText text={s.text} />
            </p>
          ))}
        </div>
      )}
      <div className={styles.right}>
        <div className={styles.codeStack}>
          <CodeBlock language={language} title={fileName} showLineNumbers>
            {code}
          </CodeBlock>
          {terminalSections.map((s, i) => {
            const terminalContent = s.text.replace(/^(Saída:|Output:)\s*\n?/, '');
            return (
              <div key={i} className={styles.terminal}>
                <CodeBlock language="bash" title="Terminal">
                  {terminalContent}
                </CodeBlock>
              </div>
            );
          })}
        </div>
      </div>
      {expanded && (
        <button
          type="button"
          className={styles.restore}
          onClick={toggle}
          aria-expanded={true}
          aria-label={label}
          title={label}
        >
          <RestoreIcon />
        </button>
      )}
    </div>
  );
}
