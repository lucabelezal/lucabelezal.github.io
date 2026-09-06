import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

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
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3>{title}</h3>
        {contentSections.map((s, i) => (
          <p key={i}>
            <InlineText text={s.text} />
          </p>
        ))}
      </div>
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
    </div>
  );
}
