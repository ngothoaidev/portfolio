import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { getContactLinks, site, type SiteProfile } from '../src/content/site';
import { expertise } from '../src/content/expertise';
import { Contact } from '../src/components/sections/contact';
import { EngineeringExpertise } from '../src/components/sections/engineering-expertise';
import { SelectedWork } from '../src/components/sections/selected-work';
import type { Project } from '../src/content/projects';

const noContact: SiteProfile = { ...site, email: null, githubUrl: null, linkedinUrl: null, resumePath: null };

test('contact omits the whole section when no approved destination exists', () => {
  assert.deepEqual(getContactLinks(noContact), []);
  assert.equal(renderToStaticMarkup(<Contact profile={noContact} />), '');
});

test('only approved GitHub is published without fabricated email, resume or availability', () => {
  assert.deepEqual(getContactLinks(site), [{ label: 'GitHub', href: 'https://github.com/ngothoaidev' }]);
  const html = renderToStaticMarkup(<Contact profile={site} />);
  assert.match(html, /href="https:\/\/github.com\/ngothoaidev"/);
  assert.match(html, /aria-labelledby="contact-heading"/);
  assert.doesNotMatch(html, /mailto:|linkedin.com|\.pdf|open to work|target="_blank"/i);
});

test('unverified expertise produces neither claims nor empty section dividers', () => {
  const unverified = expertise.map((area) => ({ ...area, verifiedOn: null }));
  assert.equal(renderToStaticMarkup(<EngineeringExpertise areas={unverified} introduction={<p>Should not leak</p>} />), '');
});

test('expertise contains exactly the three owner-confirmed domains in a semantic list', () => {
  const html = renderToStaticMarkup(<EngineeringExpertise areas={expertise} introduction={<p>Verified introduction</p>} />);
  assert.equal((html.match(/<h2\b/g) ?? []).length, 1);
  assert.equal((html.match(/<h3\b/g) ?? []).length, 3);
  assert.match(html, /<ol class="expertise-list">/);
  assert.match(html, /Backend &amp; Systems/);
  assert.match(html, /AI &amp; Infrastructure/);
  assert.doesNotMatch(html, /[0-9]+%|senior|certified/i);
});

test('only one published featured card is prominent and drafts cannot take that place', () => {
  const fixture: Project = {
    slug: 'fixture', title: 'Synthetic fixture', summary: 'Test only', role: 'Test role',
    technologies: [], publicationStatus: 'published', developmentStatus: 'in-progress',
    featured: true, links: [],
  };
  const html = renderToStaticMarkup(<SelectedWork projects={[
    { ...fixture, slug: 'draft', title: 'Hidden draft', publicationStatus: 'draft' },
    fixture,
    { ...fixture, slug: 'second' },
  ]} />);
  assert.equal((html.match(/project-card-featured/g) ?? []).length, 1);
  assert.match(html, /02 published/);
  assert.doesNotMatch(html, /Hidden draft/);
});
