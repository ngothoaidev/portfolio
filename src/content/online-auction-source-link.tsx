import type { ComponentProps } from 'react';
import { SourceLink } from '../components/case-study/elements';
import { caseStudyIndex } from './case-study-index';
export function AuctionSourceLink(props: Omit<ComponentProps<typeof SourceLink>, 'baseUrl'>) {
  return <SourceLink baseUrl={caseStudyIndex['online-auction'].sourceBaseUrl} {...props} />;
}
