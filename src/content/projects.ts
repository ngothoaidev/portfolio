import type { Approved } from './profile';
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
  contributionScope?: Approved<string>;
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
export const projects: readonly Project[] = [{
  slug: 'online-auction',
  title: 'Online-Auction',
  summary: 'When bids compete and buyers retry: a source-backed study of auction ordering, transactional idempotency, and background settlement.',
  role: 'Source analysis; individual contribution scope is not asserted.',
  technologies: ['React', 'Express', 'PostgreSQL', 'Drizzle', 'SSE'],
  publicationStatus: 'published',
  developmentStatus: 'in-progress',
  featured: true,
  links: [
    { label: 'Audited source', url: 'https://github.com/ngothoaidev/Online-Auction/tree/303ae3348c8456fc4b5f83fe850b2b14db80a688', kind: 'source', verifiedOn: '2026-11-08' },
    { label: 'Demo (may cold-start)', url: 'https://online-auction-1-a3t4.onrender.com/', kind: 'demo', verifiedOn: '2026-11-08' },
  ],
  caseStudy: { contentPath: 'content/projects/online-auction.mdx' },
}];
