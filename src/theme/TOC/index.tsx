import TOC from '@theme-original/TOC';
import type {ComponentProps} from 'react';
import ProgressIndicator from '@site/src/components/ProgressIndicator';

export default function TOCWrapper(props: ComponentProps<typeof TOC>) {
  return (
    <>
      <ProgressIndicator />
      <TOC {...props} />
    </>
  );
}
