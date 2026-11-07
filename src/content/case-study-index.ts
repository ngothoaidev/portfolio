import { getPublishedProjects, type Project } from './projects';

// Finite allowlist shared by selectors, validation, cards and the MDX module registry.
export const caseStudyIndex: Readonly<Record<string, { contentPath: string }>> = {
  'online-auction': { contentPath: 'content/projects/online-auction.mdx' },
};

export function getCaseStudyHref(project: Project): string | null {
  const entry = Object.hasOwn(caseStudyIndex, project.slug) ? caseStudyIndex[project.slug] : undefined;
  return project.publicationStatus === 'published' && entry && project.caseStudy?.contentPath === entry.contentPath
    ? `/work/${project.slug}/` : null;
}
export function getCaseStudyProjects(records: readonly Project[]): readonly Project[] {
  return getPublishedProjects(records).filter((project) => getCaseStudyHref(project) !== null);
}
export function findCaseStudy(records: readonly Project[], slug: string): Project | undefined {
  return getCaseStudyProjects(records).find((project) => project.slug === slug);
}
