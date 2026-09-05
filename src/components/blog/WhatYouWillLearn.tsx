import type {ReactNode} from 'react';

export default function WhatYouWillLearn({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--learn">
      <div className="blogSection__title">O que vamos aprender</div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
