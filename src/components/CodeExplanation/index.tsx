import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type CodeExplanationProps = {
  title: string;
  explanation: string;
  code: string;
  language?: string;
  locale?: 'pt-BR' | 'en' | 'es';
};

export default function CodeExplanation({
  title,
  explanation,
  code,
  language = 'go',
  locale = 'pt-BR',
}: CodeExplanationProps) {
  const currentExplanation =
    locale === 'pt-BR'
      ? explanation
      : locale === 'en'
      ? explanation.replace(
          /Nosso primeiro programa/,
          'Our first program'
        )
      : explanation.replace(
          /Nosso primeiro programa/,
          'Nuestro primer programa'
        );

  const currentCode =
    language === 'go' ? code : language === 'bash' ? code : code;

  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>

      <div className={styles.explanation}>
        {currentExplanation}
      </div>

      <div className={styles.code}>
        <CodeBlock language={language} title={title} showLineNumbers={false}>
          {currentCode}
        </CodeBlock>
      </div>
    </div>
  );
}