import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { projects, type Project } from '../src/content/projects';
import { getCaseStudyProjects, getCaseStudyHref, findCaseStudy } from '../src/content/case-study-index';
import { validateProjects } from '../src/content/validate-projects';
import { WorkArchive } from '../src/components/work/work-archive';
import { EvidenceFigure, DecisionBlock } from '../src/components/case-study/elements';

const project = projects[0];
test('only published registered content produces static slugs or links', () => {
  assert.deepEqual(getCaseStudyProjects(projects).map(({ slug }) => slug), ['online-auction']);
  assert.deepEqual(getCaseStudyProjects([{ ...project, publicationStatus: 'draft' }]), []);
  assert.equal(getCaseStudyHref({ ...project, slug: 'missing' }), null);
  assert.equal(findCaseStudy(projects, 'missing'), undefined);
  assert.equal(findCaseStudy(projects, '__proto__'), undefined);
  assert.equal(getCaseStudyHref({ ...project, caseStudy: undefined }), null);
});
test('archive renders one H1 and no draft content; empty state is intentional', () => {
  const empty = renderToStaticMarkup(<WorkArchive projects={[{ ...project, publicationStatus: 'draft' }]} />);
  assert.match(empty, /No case studies have been published/);
  assert.doesNotMatch(empty, /Read Online-Auction case study/);
  const html = renderToStaticMarkup(<WorkArchive projects={projects} />);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /href="\/work\/online-auction\/"/);
});
test('publishing validates metadata, dates, URLs, registration and actual assets', () => {
  assert.doesNotThrow(() => validateProjects(projects));
  assert.throws(() => validateProjects([project, project]), /Duplicate/);
  assert.throws(() => validateProjects([{ ...project, title: '' }]), /metadata/);
  assert.throws(() => validateProjects([{ ...project, links: [{ ...project.links[0], verifiedOn: '2026-02-30' }] }]), /date/);
  assert.throws(() => validateProjects([{ ...project, links: [{ ...project.links[0], url: 'http://example.com' as Project['links'][number]['url'] }] }]), /URL/);
  assert.throws(() => validateProjects([{ ...project, caseStudy: { contentPath: 'content/projects/missing.mdx' } }]), /registered/);
  assert.throws(() => validateProjects([{ ...project, cover: { src: '/missing.png', alt: 'Missing', width: 20, height: 10 } }]), /asset/);
});
test('figures expose alt text, intrinsic dimensions and a caption; decisions use a heading', () => {
  const html = renderToStaticMarkup(<EvidenceFigure src="/work/online-auction-architecture.svg" alt="Architecture explanation" caption="Source-derived, not a screenshot" width={320} height={560} />);
  assert.match(html, /<figure/);
  assert.match(html, /alt="Architecture explanation"/);
  assert.match(html, /<figcaption>Source-derived/);
  assert.match(html, /width="320" height="560"/);
  assert.match(renderToStaticMarkup(<DecisionBlock title="Lock order" approach="Lock first" tradeOff="Contention" />), /<h3>Lock order<\/h3>/);
});
