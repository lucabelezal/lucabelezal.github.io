import React from 'react';
import type {ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import BackToTopButton from '@theme/BackToTopButton';
import OriginalDocRootLayout from '@theme-original/DocRoot/Layout';
import {isDocsArea} from '@site/src/utils/areas';
import {isGoHome} from '@site/src/components/CompletionTracker/progress';

// Páginas editoriais (/aws, /projects, /fundamentals, /design e a home /go) não
// usam o shell de docs do Docusaurus: sem sidebar de docs, sem container. O
// layout do Posts é aplicado no componente da home / no DocItem/Layout
// (PageShell com rails). As demais páginas de docs usam o original.
export default function DocRootLayout({children}: {children: ReactNode}) {
  const {pathname} = useLocation();

  if (isDocsArea(pathname) || isGoHome(pathname)) {
    return (
      <>
        <BackToTopButton />
        {children}
      </>
    );
  }

  return <OriginalDocRootLayout>{children}</OriginalDocRootLayout>;
}
