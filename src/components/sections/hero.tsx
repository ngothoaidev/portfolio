import { DisplayHeading, Eyebrow } from '../ui/typography';
import { TextLink } from '../ui/text-link';

export function Hero() {
  return (
    <section className="hero editorial-grid" aria-labelledby="hero-heading">
      <div className="hero-meta">
        <Eyebrow>Software engineering</Eyebrow>
        <p className="meta-note">Portfolio / In development</p>
      </div>
      <div className="hero-body">
        <DisplayHeading id="hero-heading">
          Full-stack<br /><em>Software</em><br />Engineer<span className="accent">.</span>
        </DisplayHeading>
        <div className="hero-bottom">
          <p>A space for the work,<br />and the thinking behind it.</p>
          <TextLink href="#work" arrow="↘">Explore the work</TextLink>
        </div>
      </div>
    </section>
  );
}
