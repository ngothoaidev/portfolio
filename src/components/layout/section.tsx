import type { ReactNode } from 'react';
import { Eyebrow } from '../ui/typography';

type SectionProps = {
  id: string;
  headingId: string;
  label: string;
  children: ReactNode;
};

// Shares the label/content grid; the caller owns the visible heading and its ID.
export function Section({ id, headingId, label, children }: SectionProps) {
  return (
    <section id={id} className="content-section editorial-grid" aria-labelledby={headingId}>
      <Eyebrow className="section-label">{label}</Eyebrow>
      <div className="section-body">{children}</div>
    </section>
  );
}
