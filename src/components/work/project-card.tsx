import Image from 'next/image';
import type { Project } from '../../content/projects';

const statusLabels = { 'in-progress': 'In progress', completed: 'Completed', archived: 'Archived' };

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" aria-labelledby={`project-${project.slug}`}>
      {project.cover && <Image className="project-cover" src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} unoptimized />}
      <div className="project-meta eyebrow">{project.featured && <span>Featured</span>}<span>{statusLabels[project.developmentStatus]}</span></div>
      <h3 id={`project-${project.slug}`}>{project.title}</h3>
      <p>{project.summary}</p>
      <p className="project-role">Role: {project.role}</p>
      <ul className="technology-list" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      {project.links.length > 0 && <ul className="project-links" aria-label={`${project.title} links`}>{project.links.map((link) => <li key={link.url}><a href={link.url}>{link.label}<span className="sr-only"> for {project.title}</span></a></li>)}</ul>}
    </article>
  );
}
