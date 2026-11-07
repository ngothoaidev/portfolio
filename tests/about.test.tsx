import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { getApprovedExperience, publishedText, type ExperienceEntry } from '../src/content/profile';
import { ExperienceList } from '../src/components/about/experience-list';
import { getContactLinks, site, validResumePath } from '../src/content/site';
const entry: ExperienceEntry = { id: 'fixture', organization: 'Private employer', role: 'Test role', startDate: '2020-01', endDate: '2021-02', summary: 'Test only', contributions: ['Test contribution'], technologies: ['Test tech'], publicationStatus: 'approved', approval: 'Synthetic test approval' };
test('draft and empty experience produce no section, employer or ghost timeline', () => {
  assert.equal(renderToStaticMarkup(<ExperienceList entries={[]} />), '');
  assert.equal(renderToStaticMarkup(<ExperienceList entries={[{...entry, publicationStatus:'draft'}]} />), '');
  assert.equal(publishedText({value:'Private bio', publicationStatus:'draft', approval:'Pending'}), null);
  assert.equal(publishedText({value:'Private bio', publicationStatus:'approved', approval:''}), null);
});
test('experience enforces required approval, dates, order, IDs and evidence', () => {
  for (const patch of [{approval:''}, {role:''}, {startDate:'2020-13'}, {endDate:'2019-01'}, {evidence:[{label:'Unsafe',url:'http://example.com'}]}]) assert.throws(() => getApprovedExperience([{...entry,...patch}]));
  assert.throws(() => getApprovedExperience([entry,entry]));
  assert.equal(getApprovedExperience([entry,{...entry,id:'new',startDate:'2021-01',endDate:'present'}])[0].id,'new');
  const html = renderToStaticMarkup(<ExperienceList entries={[entry]} />);
  assert.match(html, /<ol/); assert.match(html, /<h3/); assert.match(html, /dateTime="2020-01"/i);
});
test('contact requires explicit channel approval, safe URL, resume permission and local PDF', () => {
  assert.deepEqual(getContactLinks({...site,contactApprovals:{},email:'private@example.com',linkedinUrl:'https://www.linkedin.com/in/test',resumePath:'/resume.pdf'}),[]);
  assert.equal(validResumePath('//external.com/resume.pdf'),false);
  assert.equal(validResumePath('/../secret.pdf'),false);
  assert.equal(validResumePath('/resume.pdf'),true);
  assert.equal(getContactLinks({...site,githubUrl:null,resumePath:'/resume.pdf',contactApprovals:{resumePath:'Approved'}}).length,0);
  assert.equal(getContactLinks({...site,githubUrl:null,linkedinUrl:'http://www.linkedin.com/in/test' as `https://${string}`,contactApprovals:{linkedinUrl:'Approved'}}).length,0);
});

import { validateResume } from '../src/content/validate-resume';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
test('resume build validation rejects missing, unapproved and non-PDF files', () => {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-resume-'));
  const fixture = {...site,resumePath:'/resume.pdf' as const,resumePrivacyReviewed:true,contactApprovals:{resumePath:'Test approval'}};
  try {
    assert.throws(()=>validateResume(fixture,root));
    writeFileSync(join(root,'resume.pdf'),'invalid'); assert.throws(()=>validateResume(fixture,root));
    assert.throws(()=>validateResume({...fixture,resumePrivacyReviewed:false},root));
    writeFileSync(join(root,'resume.pdf'),'%PDF-1.7\n%%EOF'); assert.doesNotThrow(()=>validateResume(fixture,root));
  } finally { rmSync(root,{recursive:true}); }
});
