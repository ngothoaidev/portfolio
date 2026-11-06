import type { MDXComponents } from 'mdx/types';
import { SectionHeading } from './components/ui/typography';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <SectionHeading {...props} />,
    h3: (props) => <SectionHeading as="h3" {...props} />,
    ...components,
  };
}
