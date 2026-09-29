import React from 'react';
import type {ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import BackToTopButton from '@theme/BackToTopButton';
import OriginalDocRootLayout from '@theme-original/DocRoot/Layout';
import {isDocsArea} from '@site/src/utils/areas';

// Áreas editoriais (/aws, /projects) não usam o shell de docs do Docusaurus:
// sem sidebar de docs, sem container. O layout do Posts é aplicado no
// DocItem/Layout (PageShell com rails). Demais docs usam o original.
export default function DocRootLayout({children}: {children: ReactNode}) {
  const {pathname} = useLocation();

  if (isDocsArea(pathname)) {
    return (
      <>
        <BackToTopButton />
        {children}
      </>
    );
  }

  return <OriginalDocRootLayout>{children}</OriginalDocRootLayout>;
}
