import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

type Props = {
  href?: string;
  title?: string;
  children?: ReactNode;
};

export default function NextSteps({href, title, children}: Props) {
  return (
    <div className="blogSection blogSection--next">
      <div className="blogSection__title">O que estudar depois</div>
      <div className="blogSection__body">
        {children}
        {href && title && (
          <p className="blogNextLink">
            <Link to={href}>Próximo → {title}</Link>
          </p>
        )}
      </div>
    </div>
  );
}
