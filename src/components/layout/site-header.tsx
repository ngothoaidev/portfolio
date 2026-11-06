import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Portfolio home">
        Portfolio<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label="Main navigation" className="site-nav">
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}
