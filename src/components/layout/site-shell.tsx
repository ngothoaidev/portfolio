import type { ReactNode } from 'react';
import { Container } from './container';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <Container>
      <SiteHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </Container>
  );
}
