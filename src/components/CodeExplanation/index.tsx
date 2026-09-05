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
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        // also render **bold** as strong
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((b, j) => {
          if (b.startsWith('**') && b.endsWith('**')) {
            return <strong key={`${i}-${j}`}>{b.slice(2, -2)}</strong>;
          }
          return b;
        });
      })}
    </>
  );
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
        {sections.map((s, i) => (
          <p key={i}>
            <InlineText text={s.text} />
          </p>
        ))}
      </div>
      <div className={styles.right}>
        <CodeBlock language={language} title={fileName} showLineNumbers>
          {code}
        </CodeBlock>
      </div>
    </div>
  );
}
