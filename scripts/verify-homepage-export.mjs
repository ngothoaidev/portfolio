import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('out/index.html', 'utf8');
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'Exactly one exported H1');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.has(match[1]), `Missing hash target ${match[1]}`);
}
for (const match of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
  for (const id of match[1].split(' ')) assert.ok(ids.has(id), `Missing accessible label ${id}`);
}
for (const section of ['work', 'expertise', 'contact']) assert.ok(ids.has(section), `Missing ${section}`);
for (const omitted of ['experience', 'insight', 'about']) assert.ok(!ids.has(omitted), `Unsupported section ${omitted}`);
assert.equal((html.match(/<h2\b/g) ?? []).length, 3, 'One H2 per visible main section');
assert.match(html, /href="https:\/\/github.com\/ngothoaidev"/);
assert.match(html, /name="robots" content="noindex, nofollow"/);
assert.doesNotMatch(html, /mailto:|linkedin.com|href="[^"]*\.pdf|Synthetic fixture|Hidden draft|open to work/i);
assert.doesNotMatch(html, /href="\/notes(\/|")/);
console.log('PASS exported homepage: headings, anchor targets, section labels, approved contact, omitted claims, noindex.');
