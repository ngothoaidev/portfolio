import { existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { caseStudyIndex, registeredStudy } from './case-study-index';
import type { Project } from './projects';

export function validateProjects(records: readonly Project[], root = process.cwd()): void {
  const seen = new Set<string>();
  for (const project of records) {
    if (seen.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`);
    seen.add(project.slug);
    if (project.publicationStatus !== 'published') continue;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error('Invalid project slug');
    for (const value of [project.title, project.summary, project.role]) {
      if (!value.trim()) throw new Error(`Missing published metadata: ${project.slug}`);
    }
    if (!project.technologies.length || project.technologies.some((value) => !value.trim())) throw new Error('Missing technologies');
    for (const link of project.links) {
      const url = new URL(link.url);
      if (url.protocol !== 'https:' || !url.hostname || url.username || url.password || !link.label.trim()) throw new Error('Invalid evidence URL');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(link.verifiedOn) || !Number.isFinite(Date.parse(link.verifiedOn)) || new Date(link.verifiedOn).toISOString().slice(0, 10) !== link.verifiedOn) throw new Error('Invalid verification date');
    }
    if (project.cover) {
      const publicRoot = resolve(root, 'public');
      const asset = resolve(publicRoot, `.${project.cover.src}`);
      if (!project.cover.src.startsWith('/') || project.cover.src.startsWith('//') || !asset.startsWith(publicRoot + sep) || !existsSync(asset) || !project.cover.alt.trim() || project.cover.width <= 0 || project.cover.height <= 0) throw new Error('Invalid or missing cover asset');
    }
    if (project.caseStudy) {
      const entry = registeredStudy(project, caseStudyIndex);
      if (!entry || entry.contentPath !== project.caseStudy.contentPath || !existsSync(resolve(root, entry.contentPath))) throw new Error('Missing registered case study');
    }
  }
}
