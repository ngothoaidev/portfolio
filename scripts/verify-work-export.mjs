import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const paths = ['index.html', 'work/index.html', 'work/online-auction/index.html', '404.html', 'about/index.html'];
const fileFor = (pathname) => pathname.endsWith('.html') ? join('out', pathname) : join('out', pathname, 'index.html');
for (const path of paths) {
  const html = readFileSync(join('out', path), 'utf8');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: one H1`);
  if (path !== '404.html') assert.match(html, /href="\/about\/"/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${path}: unique IDs`);
  let level = 0;
  for (const heading of html.matchAll(/<h([1-6])\b/g)) { const next = Number(heading[1]); assert.ok(next <= level + 1, `${path}: heading sequence`); level = next; }
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /Synthetic fixture|Hidden draft|Private employer|Private bio|Private ownership|Synthetic approved scope|enterprise-grade|mailto:|linkedin\.com|href="[^" ]*\.pdf|I built|open to work/i);
  assert.doesNotMatch(html, /â€|â†/);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const current = path === 'index.html' ? '/' : `/${path.replace(/index.html$/, '')}`;
    const url = new URL(href, `https://portfolio.invalid${current}`);
    const file = fileFor(url.pathname);
    assert.ok(existsSync(file), `${path}: missing target ${href}`);
    if (url.hash) assert.ok(readFileSync(file, 'utf8').includes(`id="${url.hash.slice(1)}"`), `${path}: missing anchor ${href}`);
  }
  for (const match of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
    for (const id of match[1].split(' ')) assert.ok(html.includes(`id="${id}"`));
  }
}
const detail = readFileSync('out/work/online-auction/index.html', 'utf8');
for (const id of ['overview','scope','problem','constraints','architecture','decisions','implementation','verification','outcomes','limitations']) assert.ok(detail.includes(`id="${id}"`), `MDX heading missing: ${id}`);
assert.match(detail, /<figure/);
assert.match(detail, /<figcaption/);
assert.match(detail, /repository-reported lab result/);
assert.match(detail, /19 tests passed/);
assert.ok(!existsSync('out/work/missing/index.html'));
console.log('PASS work export: archive + registered MDX detail, H1, noindex, headings, evidence figure, all local links/anchors, no unknown slug export.');

const about = readFileSync('out/about/index.html', 'utf8');
assert.doesNotMatch(about, /mailto:|linkedin\.com|href="[^" ]*\.pdf|id="experience"|Hidden draft|Private employer/i);
assert.match(about, /href="\/work\/"/);
console.log('PASS about export: navigation, heading hierarchy, unique IDs and unpublished channels absent.');

const toc = detail.match(/<nav class="case-toc"[\s\S]*?<\/nav>/)?.[0];
assert.ok(toc, 'TOC is rendered');
const targets = [...toc.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
const headings = [...detail.matchAll(/<h2[^>]*id="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(targets, headings, 'Rendered TOC matches rendered MDX headings in order');
const revision = '303ae3348c8456fc4b5f83fe850b2b14db80a688';
for (const match of detail.matchAll(/href="(https:\/\/github.com\/ngothoaidev\/Online-Auction[^"]*)"/g)) assert.ok(match[1].includes(revision), 'Source links must remain pinned');
assert.match(detail, /earlier Sprint 04 source audit/);
assert.match(detail, /No Online-Auction tests were rerun/);
assert.match(detail, /1,322 rule refusals/);
assert.doesNotMatch(detail, /Approved contribution scope/);
console.log('PASS storytelling export: real TOC/heading agreement, immutable citations, prior execution and historical results qualified.');
