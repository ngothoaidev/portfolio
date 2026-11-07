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
        <a href="#work">Work</a>
        {getVerifiedExpertise(expertise).length > 0 && <a href="#expertise">Expertise</a>}
        {getContactLinks(site).length > 0 && <a href="#contact">Contact</a>}
      </nav>
    </header>
  );
}
