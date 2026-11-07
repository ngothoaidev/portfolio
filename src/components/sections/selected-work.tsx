import { TextLink } from '../ui/text-link';
import { getPublishedProjects, type Project } from '../../content/projects';
import { ProjectCard } from '../work/project-card';
import { Section } from '../layout/section';
import { Eyebrow, SectionHeading } from '../ui/typography';

export function SelectedWork({ projects }: { projects: readonly Project[] }) {
  const published = getPublishedProjects(projects);
  return (
    <Section id="work" headingId="work-heading" label="01 / Selected work">
      <div className="section-heading">
        <SectionHeading id="work-heading">Work, in detail.</SectionHeading>
        <Eyebrow as="span">{String(published.length).padStart(2, '0')} published</Eyebrow>
        <TextLink href="/work/">All work</TextLink>
      </div>
      {published.length > 0 ? (
        <ul className="project-list">
          {published.map((project, index) => <li key={project.slug}><ProjectCard project={project} prominent={index === 0 && project.featured} /></li>)}
        </ul>
      ) : (
        <div className="empty-work">
          <span className="empty-mark" aria-hidden="true">↗</span>
          <div>
            <h3>Case studies are on the way.</h3>
            <p>Projects will appear here with context, implementation details, and evidence of the work.</p>
          </div>
        </div>
      )}
    </Section>
  );
}
