import type {ReactNode} from 'react';

export default function Prerequisites({children}: {children: ReactNode}) {
  return (
    <div className="blogSection blogSection--prereqs">
      <div className="blogSection__title">Pré-requisitos</div>
      <div className="blogSection__body">{children}</div>
    </div>
  );
}
