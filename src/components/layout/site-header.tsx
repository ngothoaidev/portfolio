import Link from 'next/link';
import { getContactLinks, site } from '../../content/site';
import { expertise, getVerifiedExpertise } from '../../content/expertise';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Portfolio home">
        Portfolio<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label="Main navigation" className="site-nav">
        <Link href="/work/">Work</Link>
        {getVerifiedExpertise(expertise).length > 0 && <Link href="/#expertise">Expertise</Link>}
        {getContactLinks(site).length > 0 && <Link href="/#contact">Contact</Link>}
      </nav>
    </header>
  );
}
