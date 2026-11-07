export type ExpertiseArea = {
  id: string;
  title: string;
  summary: string;
  technologies: readonly string[];
  verifiedOn: `${number}-${number}-${number}` | null;
};

// Owner explicitly confirmed these three areas in the Sprint 03 conversation.
// This confirmation does not establish employment, seniority, metrics or project completion.
export const expertise: readonly ExpertiseArea[] = [
  {
    id: 'frontend', title: 'Frontend Engineering',
    summary: 'Work involving React, component design, responsive layouts, and accessible interfaces.',
    technologies: ['React', 'TypeScript', 'Accessible UI'], verifiedOn: '2026-11-08',
  },
  {
    id: 'backend', title: 'Backend & Systems',
    summary: 'Experience with Node.js APIs and PostgreSQL, with attention to data boundaries and testing.',
    technologies: ['Node.js', 'APIs', 'PostgreSQL'], verifiedOn: '2026-11-08',
  },
  {
    id: 'ai-infrastructure', title: 'AI & Infrastructure',
    summary: 'Work involving LLM-assisted workflows, Docker, and automation supporting development and delivery.',
    technologies: ['LLM workflows', 'Docker', 'Automation'], verifiedOn: '2026-11-08',
  },
];

export function getVerifiedExpertise(areas: readonly ExpertiseArea[]): readonly ExpertiseArea[] {
  return areas.filter((area) => area.verifiedOn !== null);
}
