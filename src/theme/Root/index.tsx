import type {ReactNode} from 'react';
import Root from '@theme-original/Root';
import {ProgressProvider} from '@site/src/components/CompletionTracker/progress';

export default function RootWrapper({children}: {children: ReactNode}) {
  return (
    <ProgressProvider>
      <Root>{children}</Root>
    </ProgressProvider>
  );
}
