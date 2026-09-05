import type {ComponentProps} from 'react';
import DocItem from '@theme-original/DocItem';
import CompletionTracker from '@site/src/components/CompletionTracker';

export default function DocItemWrapper(props: ComponentProps<typeof DocItem>) {
  return (
    <>
      <DocItem {...props} />
      <CompletionTracker />
    </>
  );
}
