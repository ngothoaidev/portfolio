export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  technologies: readonly string[];
  status: 'draft' | 'published';
  evidence: readonly { label: string; url: string }[];
};

// Add only owner-verified work. Drafts must never appear as completed projects.
export const projects: readonly Project[] = [];
export const publishedProjects = projects.filter((project) => project.status === 'published');
