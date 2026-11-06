import { getPublishedProjects, type Project } from '../../content/projects';
import { ProjectCard } from '../work/project-card';

export function SelectedWork({ projects }: { projects: readonly Project[] }) {
  const published = getPublishedProjects(projects);
  return (
    <section id="work" className="content-section editorial-grid" aria-labelledby="work-heading">
      <p className="eyebrow section-label">01 / Selected work</p>
      <div className="section-body">
        <div className="section-heading"><h2 id="work-heading">Work, in detail.</h2><span className="eyebrow">{String(published.length).padStart(2, '0')} published</span></div>
        {published.length > 0 ? (
          <ul className="project-list">{published.map((project) => <li key={project.slug}><ProjectCard project={project} /></li>)}</ul>
        ) : (
          <div className="empty-work"><span className="empty-mark" aria-hidden="true">↗</span><div><h3>Case studies are on the way.</h3><p>Projects will appear here with context, implementation details, and evidence of the work.</p></div></div>
        )}
      </div>
    </section>
  );
}
