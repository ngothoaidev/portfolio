import { caseStudyIndex, type CaseStudySlug, type CaseStudyDefinition } from './case-study-index';
import OnlineAuction from '../../content/projects/online-auction.mdx';
import type { ComponentType } from 'react';

// Every allowlisted study must have an explicit trusted static import and matching metadata.
export const projectCaseStudies = {
  'online-auction': { ...caseStudyIndex['online-auction'], content: OnlineAuction },
} satisfies Record<CaseStudySlug, CaseStudyDefinition & { content: ComponentType }>;
