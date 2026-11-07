import type { Project } from '../../content/projects';
import { getPublishedProjects } from '../../content/projects';
import { DisplayHeading, Eyebrow } from '../ui/typography';
import { ProjectCard } from './project-card';

export function WorkArchive({ projects }: { projects: readonly Project[] }) {
  const published = getPublishedProjects(projects);
  return (
    <div className="work-page editorial-grid">
      <Eyebrow className="section-label">Work / Engineering studies</Eyebrow>
      <div className="section-body">
        <DisplayHeading>Work, in context.</DisplayHeading>
        <p className="archive-introduction">Systems, decisions, and the evidence behind them.</p>
        <Eyebrow>{String(published.length).padStart(2, '0')} published</Eyebrow>
        {published.length ? <ul className="project-list">{published.map((project, index) => <li key={project.slug}><ProjectCard headingLevel="h2" project={project} prominent={index === 0 && project.featured} /></li>)}</ul>
          : <p className="archive-empty">No case studies have been published yet.</p>}
      </div>
    </div>
  );
}
