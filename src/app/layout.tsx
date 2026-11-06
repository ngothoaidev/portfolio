import type { Metadata } from 'next';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/geist/latin-400.css';
import '@fontsource/geist/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './globals.css';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { default: site.title, template: '%s — Portfolio' },
  description: site.description,
  // Keep the unfinished portfolio out of search until personal content is approved.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
