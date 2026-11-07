import { getContactLinks, site } from '../../content/site';
import { DisplayHeading, Eyebrow } from '../ui/typography';
import { TextLink } from '../ui/text-link';

export function Hero() {
  const hasContact = getContactLinks(site).length > 0;
  return (
    <section className="hero editorial-grid" aria-labelledby="hero-heading">
      <div className="hero-meta">
        <Eyebrow>{site.name ?? 'Software engineering'}</Eyebrow>
        <p className="meta-note">Interfaces / APIs / Systems</p>
      </div>
      <div className="hero-body">
        <DisplayHeading id="hero-heading">
          Full-stack<br /><em>Software</em><br />Engineer<span className="accent">.</span>
        </DisplayHeading>
        <div className="hero-bottom">
          <p className="hero-introduction">{site.introduction}</p>
          <div className="hero-actions">
            <TextLink href="#work" arrow="↘">View selected work</TextLink>
            {hasContact && <TextLink href="#contact">Get in touch</TextLink>}
          </div>
        </div>
      </div>
    </section>
  );
}
