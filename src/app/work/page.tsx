import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/site-shell';
import { WorkArchive } from '@/components/work/work-archive';
import { projects } from '@/content/project-catalog';

export const metadata: Metadata = { title: 'Work', description: 'Engineering case studies with source evidence, technical decisions, and explicit limitations.' };
export default function WorkPage() {
  return <SiteShell><WorkArchive projects={projects} /></SiteShell>;
}
