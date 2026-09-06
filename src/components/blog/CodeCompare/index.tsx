import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type CodeCompareProps = {
  swift: string;
  go: string;
  swiftTitle?: string;
  goTitle?: string;
};

export default function CodeCompare({
  swift,
  go,
  swiftTitle = 'Swift',
  goTitle = 'Go',
}: CodeCompareProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <CodeBlock language="swift" title={swiftTitle} showLineNumbers>
          {swift.trim()}
        </CodeBlock>
      </div>
      <div className={styles.column}>
        <CodeBlock language="go" title={goTitle} showLineNumbers>
          {go.trim()}
        </CodeBlock>
      </div>
    </div>
  );
}
