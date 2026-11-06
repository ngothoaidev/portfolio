import type { HTMLAttributes } from 'react';

export function Container({ as: Tag = 'div', className = '', ...props }: HTMLAttributes<HTMLElement> & { as?: 'div' | 'main' }) {
  return <Tag className={`container ${className}`.trim()} {...props} />;
}
