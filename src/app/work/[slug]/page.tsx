import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/site-shell';
import { CaseStudyHeader, CaseStudyTOC } from '@/components/case-study/elements';
import { projects } from '@/content/project-catalog';
import { findCaseStudy, getCaseStudyProjects, registeredStudy } from '@/content/case-study-index';
import { projectCaseStudies } from '@/content/project-case-studies';

export const dynamicParams = false;
export function generateStaticParams() {
  return getCaseStudyProjects(projects).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = findCaseStudy(projects, (await params).slug);
  if (!project) notFound();
  return { title: project.title, description: project.summary };
}
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = findCaseStudy(projects, (await params).slug);
  if (!project) notFound();
  const study = registeredStudy(project, projectCaseStudies);
  if (!study) notFound();
  const Content = study.content;
  return <SiteShell><article className="case-study"><CaseStudyHeader project={project} /><div className="case-layout"><CaseStudyTOC sections={study.sections} /><div className="case-prose"><Content /></div></div></article></SiteShell>;
}
