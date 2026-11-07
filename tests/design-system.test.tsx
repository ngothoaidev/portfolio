import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Hero } from '../src/components/sections/hero';
import { SelectedWork } from '../src/components/sections/selected-work';
import { SiteHeader } from '../src/components/layout/site-header';
import { Container } from '../src/components/layout/container';
import { TextLink } from '../src/components/ui/text-link';
import { ProjectCard } from '../src/components/work/project-card';
import type { Project } from '../src/content/projects';

// Synthetic test records are isolated from the portfolio's empty collection.
const fixture: Project = {
  slug: 'test-only', title: 'Test fixture', summary: 'Test summary', role: 'Test role',
  technologies: ['TypeScript'], publicationStatus: 'published', featured: true,
  developmentStatus: 'in-progress', links: [{ label: 'Source', url: 'https://example.com', kind: 'source', verifiedOn: '2026-11-07' }],
};

test('hero and work compose one H1 and a labelled H2 section', () => {
  const html = renderToStaticMarkup(<><Hero /><SelectedWork projects={[]} /></>);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /aria-labelledby="work-heading"/);
  assert.match(html, /<h2[^>]*id="work-heading"/);
  assert.match(html, /<h3>Case studies are on the way/);
});

test('navigation links home and retains current section anchors', () => {
  const html = renderToStaticMarkup(<SiteHeader />);
  assert.match(html, /href="\/"/);
  assert.match(html, /href="#work"/);
  assert.match(html, /href="#expertise"/);
  assert.match(html, /aria-label="Main navigation"/);
});

test('not-found container can preserve the keyboard-focusable main landmark', () => {
  const html = renderToStaticMarkup(<Container as="main" id="main" tabIndex={-1}>Test</Container>);
  assert.match(html, /<main[^>]*id="main"[^>]*tabindex="-1"/);
});

test('text link preserves native link behavior and hides its decorative arrow', () => {
  const html = renderToStaticMarkup(<TextLink href="#work" arrow="\u2198">Explore work</TextLink>);
  assert.match(html, /href="#work"/);
  assert.match(html, /class="link-arrow" aria-hidden="true"/);
  assert.doesNotMatch(html, /role="button"|target="_blank"|disabled/);
});

test('cards communicate each development status with text, named links and static technology tags', () => {
  for (const [status, label] of [['in-progress', 'In progress'], ['completed', 'Completed'], ['archived', 'Archived']] as const) {
    const html = renderToStaticMarkup(<ProjectCard project={{ ...fixture, developmentStatus: status }} />);
    assert.ok(html.includes(label));
    assert.match(html, /<h3[^>]*id="project-test-only"/);
    assert.match(html, /class="tech-tag">TypeScript/);
    assert.match(html, /class="sr-only"> for Test fixture/);
    assert.doesNotMatch(html, /href=".*case-study/);
  }
});

test('text and focus palette meet contrast thresholds against paper and selection', () => {
  const css = readFileSync('src/app/tokens.css', 'utf8');
  const luminance = (name: string) => {
    const hex = css.match(new RegExp(`--palette-${name}: #([0-9a-f]{6})`))?.[1];
    assert.ok(hex, `Missing palette primitive ${name}`);
    const rgb = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
      .map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  const contrast = (a: string, b: string) => {
    const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (values[0] + .05) / (values[1] + .05);
  };
  for (const text of ['ink', 'stone', 'forest']) {
    assert.ok(contrast(text, 'paper') >= 4.5, `${text} text must meet AA normal text contrast`);
  }
  assert.ok(contrast('forest', 'paper') >= 3, 'Focus must remain visible against paper');
  assert.ok(contrast('ink', 'sage') >= 4.5, 'Selected text must remain readable');
});
