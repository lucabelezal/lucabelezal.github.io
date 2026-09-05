import type {ReactNode} from 'react';

export default function Summary({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--summary">
      <div className="blogSection__title">Resumo</div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
