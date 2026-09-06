import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

type Props = {
  href?: string;
  title?: string;
  children?: ReactNode;
};

export default function NextSteps({href, title, children}: Props) {
  return (
    <div className="blogSection blogSection--next">
      <div className="blogSection__title">
        <Translate id="blogSection.nextSteps">O que estudar depois</Translate>
      </div>
      <div className="blogSection__body">
        {children}
        {href && title && (
          <p className="blogNextLink">
            <Link to={href}>
              <Translate id="blogSection.next">Próximo</Translate> → {title}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
