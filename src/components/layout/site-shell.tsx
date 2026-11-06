import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="page-frame"><SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /></div>;
}
