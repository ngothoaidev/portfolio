import Introduction from '@/content/introduction.mdx';
import { site } from '@/content/site';
import { publishedProjects } from '@/content/projects';

export default function Home() {
  return (
    <div className="page-frame">
      <header className="site-header flex items-center justify-between gap-6">
        <a href="#main" className="wordmark" aria-label="Portfolio home">Portfolio<span aria-hidden="true">.</span></a>
        <nav aria-label="Main navigation" className="flex gap-6 md:gap-10">
          <a href="#work">Work</a><a href="#about">About</a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero editorial-grid" aria-labelledby="hero-heading">
          <div className="hero-meta"><p className="eyebrow">Software engineering</p><p className="meta-note">Portfolio / In development</p></div>
          <div className="hero-body">
            <h1 id="hero-heading">Full-stack<br /><em>Software</em><br />Engineer<span className="accent">.</span></h1>
            <div className="hero-bottom"><p>A space for the work,<br />and the thinking behind it.</p><a className="text-link" href="#work">Explore the work <span aria-hidden="true">↘</span></a></div>
          </div>
        </section>
        <section id="work" className="content-section editorial-grid" aria-labelledby="work-heading">
          <p className="eyebrow section-label">01 / Selected work</p>
          <div className="section-body">
            <div className="section-heading"><h2 id="work-heading">Work, in detail.</h2><span className="eyebrow">{String(publishedProjects.length).padStart(2, '0')} published</span></div>
            <div className="empty-work"><span className="empty-mark" aria-hidden="true">↗</span><div><h3>Case studies are on the way.</h3><p>Projects will appear here with context, implementation details, and evidence of the work.</p></div></div>
          </div>
        </section>
        <section id="about" className="content-section editorial-grid" aria-labelledby="about-heading">
          <p className="eyebrow section-label">02 / About this space</p>
          <div className="section-body prose"><Introduction components={{ h2: (props) => <h2 id="about-heading" {...props} /> }} /></div>
        </section>
      </main>
      <footer className="site-footer flex flex-wrap justify-between gap-4"><p>{site.role}</p><p className="eyebrow">Portfolio / Foundation edition</p></footer>
    </div>
  );
}
