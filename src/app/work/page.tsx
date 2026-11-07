import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/site-shell';
import { WorkArchive } from '@/components/work/work-archive';
import { projects } from '@/content/project-catalog';

export const metadata: Metadata = { title: 'Work', description: 'Source-backed engineering case studies: user problems, implementation decisions, trade-offs, verification and explicit limits.' };
export default function WorkPage() {
  return <SiteShell><WorkArchive projects={projects} /></SiteShell>;
}
