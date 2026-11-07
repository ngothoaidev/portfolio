import { projects } from '../../content/project-catalog';
import { getCaseStudyProjects, getCaseStudyHref } from '../../content/case-study-index';
import { getContactLinks, site, recruiterSummary } from '../../content/site';
import { DisplayHeading, Eyebrow } from '../ui/typography';
import { TextLink } from '../ui/text-link';

export function Hero() {
  const flagship = getCaseStudyProjects(projects).find(project => project.featured);
  const flagshipHref = flagship ? getCaseStudyHref(flagship) : null;
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
          <div className="hero-actions">
            {flagshipHref && flagship ? <TextLink href={flagshipHref} arrow="↗">Read {flagship.title} case study</TextLink> : <TextLink href="#work" arrow="↘">View selected work</TextLink>}
            {hasContact && <TextLink href="#contact">Get in touch</TextLink>}
          </div>
          <p className="hero-introduction">{recruiterSummary}</p>
        </div>
      </div>
    </section>
  );
}
