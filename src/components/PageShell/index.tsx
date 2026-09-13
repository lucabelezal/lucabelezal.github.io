import type {ElementType, ReactNode} from 'react';

type Props = {
  left?: ReactNode;
  right?: ReactNode;
  as?: ElementType;
  children: ReactNode;
};

export default function PageShell({left, right, as: Tag = 'main', children}: Props) {
  return (
    <Tag className="pageGrid">
      {left ? <aside className="rail rail--left">{left}</aside> : null}
      <div className="pageMain">{children}</div>
      {right ? <aside className="rail rail--right">{right}</aside> : null}
    </Tag>
  );
}
