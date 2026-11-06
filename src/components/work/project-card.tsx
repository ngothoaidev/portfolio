import Image from 'next/image';
import type { Project } from '../../content/projects';
import { Eyebrow, SectionHeading } from '../ui/typography';
import { TextLink } from '../ui/text-link';
import { TechTag } from '../ui/tech-tag';

const statusLabels = { 'in-progress': 'In progress', completed: 'Completed', archived: 'Archived' };

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" aria-labelledby={`project-${project.slug}`}>
      {project.cover && (
        <Image className="project-cover" src={project.cover.src} alt={project.cover.alt}
          width={project.cover.width} height={project.cover.height} unoptimized />
      )}
      <Eyebrow className="project-meta">
        {project.featured && <span>Featured</span>}
        <span>{statusLabels[project.developmentStatus]}</span>
      </Eyebrow>
      <SectionHeading as="h3" id={`project-${project.slug}`}>{project.title}</SectionHeading>
      <p>{project.summary}</p>
      <p>Role: {project.role}</p>
      <ul className="technology-list" aria-label="Technologies">
        {project.technologies.map((technology) => <li key={technology}><TechTag>{technology}</TechTag></li>)}
      </ul>
      {project.links.length > 0 && (
        <ul className="project-links" aria-label={`${project.title} links`}>
          {project.links.map((link) => (
            <li key={link.url}>
              <TextLink href={link.url} arrow="↗">
                {link.label}<span className="sr-only"> for {project.title}</span>
              </TextLink>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
