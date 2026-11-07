import { publishedText } from '../../content/profile';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Project } from '../../content/projects';
import { DisplayHeading, Eyebrow } from '../ui/typography';
import { TextLink } from '../ui/text-link';

export function CaseStudyHeader({ project }: { project: Project }) {
  const contribution = publishedText(project.contributionScope ?? null);
  return <header className="case-header">
    <TextLink href="/work/">Back to work</TextLink>
    <Eyebrow>Engineering case study / {project.developmentStatus.replace('-', ' ')}</Eyebrow>
    <DisplayHeading>{project.title}</DisplayHeading>
    <p>{project.summary}</p>
    <dl className="case-meta"><dt>Scope</dt><dd>{project.role}</dd>{contribution && <><dt>Approved contribution scope</dt><dd>{contribution}</dd></>}<dt>Stack</dt><dd>{project.technologies.join(' / ')}</dd></dl>
    <ul className="project-links" aria-label="Project evidence">{project.links.map((link) => <li key={link.url}><TextLink href={link.url}>{link.label}</TextLink></li>)}</ul>
  </header>;
}
export function CaseStudyTOC({ sections }: { sections: readonly (readonly [string, string])[] }) {
  return <nav className="case-toc" aria-label="Case study contents"><Eyebrow>In this study</Eyebrow><ol>{sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol></nav>;
}
export function SourceLink({ baseUrl, path, children }: { baseUrl: string; path: string; children: ReactNode }) {
  return <a href={baseUrl + path}>{children}</a>;
}
export function EvidenceFigure({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  return <figure className="evidence-figure"><div className="figure-media" role="region" aria-label={alt} tabIndex={0}><Image src={src} alt={alt} width={width} height={height} unoptimized /></div><figcaption>{caption}</figcaption></figure>;
}
export function DecisionBlock({ title, problem, approach, rationale, tradeOff }: { title: string; problem?: string; approach: string; rationale?: string; tradeOff: string }) {
  return <aside className="decision-block"><h3>{title}</h3><dl>{problem && <><dt>Problem</dt><dd>{problem}</dd></>}<dt>Decision</dt><dd>{approach}</dd>{rationale && <><dt>Why</dt><dd>{rationale}</dd></>}<dt>Trade-off</dt><dd>{tradeOff}</dd></dl></aside>;
}
