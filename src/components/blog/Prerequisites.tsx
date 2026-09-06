import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';

export default function Prerequisites({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--prereqs">
      <div className="blogSection__title">
        <Translate id="blogSection.prerequisites">Pré-requisitos</Translate>
      </div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
