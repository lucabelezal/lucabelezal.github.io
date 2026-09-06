import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';

export default function WhatYouWillLearn({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--learn">
      <div className="blogSection__title">
        <Translate id="blogSection.whatYouWillLearn">O que vamos aprender</Translate>
      </div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
