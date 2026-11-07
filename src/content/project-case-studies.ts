import { caseStudyIndex } from './case-study-index';
import OnlineAuction from '../../content/projects/online-auction.mdx';
import type { ComponentType } from 'react';

// Only trusted, statically imported repository MDX. No user-controlled import paths.
export const projectCaseStudies: Readonly<Record<string, ComponentType>> = {
  'online-auction': OnlineAuction,
};

for (const slug of Object.keys(caseStudyIndex)) {
  if (!Object.hasOwn(projectCaseStudies, slug)) throw new Error(`Missing MDX import: ${slug}`);
}
