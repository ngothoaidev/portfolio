import type { ReactNode } from 'react';
import { getVerifiedExpertise, type ExpertiseArea } from '../../content/expertise';
import { Section } from '../layout/section';
import { SectionHeading, Eyebrow } from '../ui/typography';
import { TechTag } from '../ui/tech-tag';

type ExpertiseProps = { areas: readonly ExpertiseArea[]; introduction: ReactNode };

export function EngineeringExpertise({ areas, introduction }: ExpertiseProps) {
  const verified = getVerifiedExpertise(areas);
  if (verified.length === 0) return null;
  return (
    <Section id="expertise" headingId="expertise-heading" label="02 / Engineering focus">
      <SectionHeading id="expertise-heading">Across the stack.</SectionHeading>
      <div className="prose expertise-introduction">{introduction}</div>
      <ol className="expertise-list">
        {verified.map((area, index) => (
          <li key={area.id} className="expertise-area">
            <Eyebrow as="span" className="expertise-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</Eyebrow>
            <div>
              <SectionHeading as="h3">{area.title}</SectionHeading>
              <p>{area.summary}</p>
              <ul className="technology-list" aria-label={`${area.title} technologies`}>
                {area.technologies.map((technology) => <li key={technology}><TechTag>{technology}</TechTag></li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
