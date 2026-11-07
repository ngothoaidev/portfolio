export type SiteProfile = {
  title: string;
  description: string;
  role: 'Full-stack Software Engineer';
  name: string | null;
  introduction: string;
  email: string | null;
  githubUrl: `https://${string}` | null;
  linkedinUrl: `https://${string}` | null;
  resumePath: `/${string}` | null;
};

export const site: SiteProfile = {
  title: 'Portfolio — Full-stack Software Engineer',
  description: 'Full-stack software engineering: frontend interfaces, backend APIs, and AI-assisted workflows. Explore engineering focus areas and selected work.',
  role: 'Full-stack Software Engineer',
  name: null,
  introduction: 'Frontend interfaces and the systems behind them. Work involving React, Node.js, and PostgreSQL, supported by AI-assisted workflows and automation.',
  email: null,
  // Owner approved publication on 2026-11-08; profile existence checked via GitHub API.
  githubUrl: 'https://github.com/ngothoaidev',
  linkedinUrl: null,
  resumePath: null,
};

export type ContactLink = { label: string; href: string };

// Local data is reviewed before publication. Unknown destinations stay null.
export function getContactLinks(profile: SiteProfile): readonly ContactLink[] {
  const links: ContactLink[] = [];
  if (profile.email) links.push({ label: 'Email', href: `mailto:${profile.email}` });
  if (profile.githubUrl) links.push({ label: 'GitHub', href: profile.githubUrl });
  if (profile.linkedinUrl) links.push({ label: 'LinkedIn', href: profile.linkedinUrl });
  if (profile.resumePath) links.push({ label: 'Resume (PDF)', href: profile.resumePath });
  return links;
}
