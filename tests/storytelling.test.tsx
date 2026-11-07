import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { registeredStudy, validateStudyDefinitions, caseStudyIndex } from '../src/content/case-study-index';
import { SourceLink, CaseStudyTOC, CaseStudyHeader } from '../src/components/case-study/elements';
import { projects } from '../src/content/projects';
import { Hero } from '../src/components/sections/hero';
const second = { contentPath:'content/projects/synthetic.mdx' as const, sections:[['different','Different section']] as const, sourceBaseUrl:'https://example.com/source/', content:()=> <p>Isolated fixture</p> };
test('second registry record keeps its own module, TOC and source; drafts/mismatches are rejected',()=>{
  const project = {...projects[0],slug:'synthetic',caseStudy:{contentPath:second.contentPath}};
  const registry = {...caseStudyIndex,synthetic:second};
  const study = registeredStudy(project,registry);
  assert.equal(study,second);
  const html=renderToStaticMarkup(<><CaseStudyTOC sections={second.sections}/><SourceLink baseUrl={second.sourceBaseUrl} path="file.ts">Evidence</SourceLink><second.content/></>);
  assert.match(html,/href="#different"/); assert.match(html,/https:\/\/example.com\/source\/file.ts/);
  assert.doesNotMatch(html,/Online-Auction|303ae334|#architecture/);
  assert.equal(registeredStudy({...project,publicationStatus:'draft'},registry),undefined);
  assert.equal(registeredStudy({...project,caseStudy:projects[0].caseStudy},registry),undefined);
  assert.equal(registeredStudy({...project,slug:'__proto__'},registry),undefined);
});
test('registry validates duplicate, empty and missing section metadata',()=>{
  assert.doesNotThrow(()=>validateStudyDefinitions(caseStudyIndex));
  for(const sections of [[],[['same','A'],['same','B']],[['','Label']],[['id','']]] as const) assert.throws(()=>validateStudyDefinitions({synthetic:{...second,sections}}));
});
test('TOC matches actual authored headings in sequence, with no duplicate IDs',()=>{
  const mdx=readFileSync('content/projects/online-auction.mdx','utf8');
  const ids=[...mdx.matchAll(/<h2 id="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(ids,caseStudyIndex['online-auction'].sections.map(([id])=>id));
  assert.equal(new Set(ids).size,ids.length);
});
test('personal project scope requires explicit approved nonempty record',()=>{
  const draft={value:'Private ownership assertion',approval:'Pending',publicationStatus:'draft' as const};
  assert.doesNotMatch(renderToStaticMarkup(<CaseStudyHeader project={{...projects[0],contributionScope:draft}}/>),/Private ownership|Approved contribution scope/);
  assert.match(renderToStaticMarkup(<CaseStudyHeader project={{...projects[0],contributionScope:{...draft,value:'Synthetic approved scope',publicationStatus:'approved',approval:'Test approval'}}}/>),/Synthetic approved scope/);
});
test('hero offers a direct published flagship path without unsupported career promises',()=>{
 const html=renderToStaticMarkup(<Hero/>);
 assert.match(html,/href="\/work\/online-auction\/"/);
 assert.doesNotMatch(html,/senior|open to work|certified|mailto:|linkedin\.com/i);
});
