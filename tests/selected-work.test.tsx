import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { SelectedWork } from '../src/components/sections/selected-work';
import { getPublishedProjects, type Project } from '../src/content/projects';

// Synthetic fixtures only. Never loaded by application content.
const fixture: Project = {
  slug: 'test-project', title: 'Synthetic test project', summary: 'Test description',
  role: 'Test role', technologies: ['TypeScript'], publicationStatus: 'published',
  developmentStatus: 'in-progress', featured: false, links: [],
};

test('empty and draft-only content renders the empty state without leaking drafts', () => {
  for (const records of [[], [{ ...fixture, publicationStatus: 'draft' as const }]]) {
    const html = renderToStaticMarkup(<SelectedWork projects={records} />);
    assert.match(html, /Case studies are on the way/);
    assert.doesNotMatch(html, /Synthetic test project/);
    assert.match(html, /00 published/);
  }
});

test('published content renders cards, development status and verified links', () => {
  const html = renderToStaticMarkup(<SelectedWork projects={[{ ...fixture, links: [{ label: 'Source', url: 'https://example.com/test', kind: 'source', verifiedOn: '2026-11-07' }] }]} />);
  assert.match(html, /Synthetic test project/);
  assert.match(html, /In progress/);
  assert.match(html, /href="https:\/\/example.com\/test"/);
  assert.match(html, /01 published/);
  assert.doesNotMatch(html, /Case studies are on the way/);
});

test('featured ordering is stable and never promotes a draft', () => {
  const records = [fixture, { ...fixture, slug: 'featured', featured: true }, { ...fixture, slug: 'draft', featured: true, publicationStatus: 'draft' as const }];
  assert.deepEqual(getPublishedProjects(records).map(({ slug }) => slug), ['featured', 'test-project']);
  assert.equal(records[0].slug, 'test-project');
});


test('covers keep alt text and dimensions; an MDX reference does not create a dead link', () => {
  const html = renderToStaticMarkup(<SelectedWork projects={[{
    ...fixture,
    cover: { src: '/test-cover.png', alt: 'Synthetic cover description', width: 800, height: 600 },
    caseStudy: { contentPath: 'content/projects/test.mdx' },
  }]} />);
  assert.match(html, /alt="Synthetic cover description"/);
  assert.match(html, /width="800"/);
  assert.match(html, /height="600"/);
  assert.doesNotMatch(html, /href=.*test.mdx/);
  assert.doesNotMatch(html, /_next\/image/);
});
