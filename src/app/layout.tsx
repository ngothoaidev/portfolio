import type { Metadata } from 'next';
import './globals.css';
import { geist, instrument, mono } from './fonts';
import { site } from '@/content/site';
import { validateResume } from '@/content/validate-resume';
validateResume(site);

export const metadata: Metadata = {
  title: { default: site.title, template: '%s — Portfolio' },
  description: site.description,
  // Keep the unfinished portfolio out of search until personal content is approved.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${instrument.variable} ${mono.variable}`}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
