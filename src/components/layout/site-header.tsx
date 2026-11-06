export function SiteHeader() {
  return (<header className="site-header flex items-center justify-between gap-6">
        <a href="#main" className="wordmark" aria-label="Portfolio home">Portfolio<span aria-hidden="true">.</span></a>
        <nav aria-label="Main navigation" className="flex gap-6 md:gap-10">
          <a href="#work">Work</a><a href="#about">About</a>
        </nav>
      </header>);
}
