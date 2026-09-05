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

function InlineText({text}: {text: string}) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, li) => (
        <span key={li}>
          {line.split(/(`[^`]+`)/g).map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return <code key={i}>{part.slice(1, -1)}</code>;
            }
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
            return boldParts.map((b, j) => {
              if (b.startsWith('**') && b.endsWith('**')) {
                return <strong key={`${i}-${j}`}>{b.slice(2, -2)}</strong>;
              }
              return b;
            });
          })}
          {li < lines.length - 1 && <br />}
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
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}.go`;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3>{title}</h3>
        {sections.map((s, i) => {
          if (isTerminalSection(s.text)) {
            const terminalContent = s.text.replace(/^(Saída:|Output:)\s*\n?/, '');
            return (
              <div key={i} className={styles.terminal}>
                <CodeBlock language="bash" title="Terminal">
                  {terminalContent}
                </CodeBlock>
              </div>
            );
          }
          return (
            <p key={i}>
              <InlineText text={s.text} />
            </p>
          );
        })}
      </div>
      <div className={styles.right}>
        <CodeBlock language={language} title={fileName} showLineNumbers>
          {code}
        </CodeBlock>
      </div>
    </div>
  );
}
