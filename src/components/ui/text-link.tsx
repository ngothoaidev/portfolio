import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TextLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
  arrow?: ReactNode;
};

export function TextLink({ children, className = '', arrow, ...props }: TextLinkProps) {
  return (
    <a className={`text-link ${className}`.trim()} {...props}>
      <span>{children}</span>
      {arrow && <span className="link-arrow" aria-hidden="true">{arrow}</span>}
    </a>
  );
}
