import type { ComponentPropsWithoutRef } from 'react';

type HeadingProps = ComponentPropsWithoutRef<'h2'>;

// Display always owns the page H1; section/card semantics are explicit at call sites.
export function DisplayHeading({ className = '', ...props }: ComponentPropsWithoutRef<'h1'>) {
  return <h1 className={`display-heading ${className}`.trim()} {...props} />;
}

export function SectionHeading({ as: Tag = 'h2', className = '', ...props }: HeadingProps & { as?: 'h2' | 'h3' }) {
  const recipe = Tag === 'h3' ? 'card-title' : 'section-title';
  return <Tag className={`${recipe} ${className}`.trim()} {...props} />;
}

export function Eyebrow({ as: Tag = 'p', className = '', ...props }: ComponentPropsWithoutRef<'p'> & { as?: 'p' | 'span' }) {
  return <Tag className={`eyebrow ${className}`.trim()} {...props} />;
}
