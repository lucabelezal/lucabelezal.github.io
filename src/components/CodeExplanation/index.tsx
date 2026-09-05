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

export default function CodeExplanation({
  title,
  code,
  language = 'go',
  locale = 'pt-BR',
  sections = [],
}: CodeExplanationProps) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3>{title}</h3>
        {sections.map((s, i) => (
          <p key={i}>{s.text}</p>
        ))}
      </div>
      <div className={styles.right}>
        <CodeBlock language={language} showLineNumbers={false}>
          {code}
        </CodeBlock>
      </div>
    </div>
  );
}