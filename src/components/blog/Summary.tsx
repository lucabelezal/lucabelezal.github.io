import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';

export default function Summary({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--summary">
      <div className="blogSection__title">
        <Translate id="blogSection.summary">Resumo</Translate>
      </div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
