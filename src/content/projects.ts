export type VerifiedProjectLink = {
  label: string;
  url: `https://${string}`;
  kind: 'source' | 'demo' | 'reference';
  verifiedOn: `${number}-${number}-${number}`;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  technologies: readonly string[];
  publicationStatus: 'draft' | 'published';
  developmentStatus: 'in-progress' | 'completed' | 'archived';
  featured: boolean;
  links: readonly VerifiedProjectLink[];
  cover?: { src: `/${string}`; alt: string; width: number; height: number };
  // A reference to an authored MDX file, not an assertion that a route exists.
  caseStudy?: { contentPath: `content/projects/${string}.mdx` };
};

export function getPublishedProjects(records: readonly Project[]): readonly Project[] {
  return records.filter((project) => project.publicationStatus === 'published')
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

// Only owner-verified records belong here. Test fixtures are never imported by the site.
export const projects: readonly Project[] = [];
