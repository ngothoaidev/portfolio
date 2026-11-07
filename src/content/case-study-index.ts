import { auctionSource, caseStudySections } from './online-auction-evidence';
import { getPublishedProjects, type Project } from './projects';

export type CaseStudyDefinition = {
  contentPath: `content/projects/${string}.mdx`;
  sections: readonly (readonly [string, string])[];
  sourceBaseUrl: string;
};
// Finite metadata allowlist; no MDX execution is needed by cards or selectors.
export const caseStudyIndex = {
  'online-auction': { contentPath: 'content/projects/online-auction.mdx', sections: caseStudySections, sourceBaseUrl: auctionSource },
} as const satisfies Record<string, CaseStudyDefinition>;
export type CaseStudySlug = keyof typeof caseStudyIndex;
export function registeredStudy<T extends CaseStudyDefinition>(project: Project, registry: Readonly<Record<string, T>>): T | undefined {
  const entry = Object.hasOwn(registry, project.slug) ? registry[project.slug] : undefined;
  return project.publicationStatus === 'published' && entry?.contentPath === project.caseStudy?.contentPath ? entry : undefined;
}
export function validateStudyDefinitions(registry: Readonly<Record<string, CaseStudyDefinition>>) {
  for (const entry of Object.values(registry)) {
    const ids = new Set<string>();
    if (!entry.sections.length) throw new Error('Missing case study sections');
    for (const [id, label] of entry.sections) {
      if (!/^[a-z][a-z0-9-]*$/.test(id) || !label.trim() || ids.has(id)) throw new Error('Invalid or duplicate case study section');
      ids.add(id);
    }
    const url = new URL(entry.sourceBaseUrl);
    if (url.protocol !== 'https:' || url.username || url.password || !url.pathname.endsWith('/')) throw new Error('Invalid study source URL');
  }
}
validateStudyDefinitions(caseStudyIndex);

export function getCaseStudyHref(project: Project): string | null {
  const entry = registeredStudy(project, caseStudyIndex);
  return project.publicationStatus === 'published' && entry && project.caseStudy?.contentPath === entry.contentPath
    ? `/work/${project.slug}/` : null;
}
export function getCaseStudyProjects(records: readonly Project[]): readonly Project[] {
  return getPublishedProjects(records).filter((project) => getCaseStudyHref(project) !== null);
}
export function findCaseStudy(records: readonly Project[], slug: string): Project | undefined {
  return getCaseStudyProjects(records).find((project) => project.slug === slug);
}
