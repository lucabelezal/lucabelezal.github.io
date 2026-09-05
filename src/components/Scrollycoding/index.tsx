import {useEffect, useState, useRef} from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type Step = {
  title?: string;
  content: React.ReactNode;
  code: string;
  language?: string;
  focus?: string; // e.g. "1:3" or "5"
};

export default function Scrollycoding({steps}: {steps: Step[]}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      {rootMargin: '-40% 0px -50% 0px', threshold: 0}
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const cur = steps[active];

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {steps.map((s, i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`${styles.step} ${i === active ? styles.stepActive : ''}`}
          >
            {s.title && <h3>{s.title}</h3>}
            <div>{s.content}</div>
          </div>
        ))}
      </div>
      <div className={styles.codeSticky}>
        <CodeBlock language={cur.language ?? 'go'} title={`focus: ${cur.focus ?? 'all'}`}>
          {cur.code}
        </CodeBlock>
        <div style={{marginTop: 8, fontSize: 12, textAlign: 'right', opacity: 0.6}}>
          {active + 1} / {steps.length} · scroll para navegar
        </div>
      </div>
    </div>
  );
}
