import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';
const pages = ['index.html','about/index.html','work/index.html','work/online-auction/index.html','404.html'];
const metadata = [];
for (const file of pages) {
  const html = await readFile(join('out',file),'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description, `${file}: metadata`);
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /rel="canonical"|property="og:url"|name="twitter:site"|target="_blank"/);
  assert.match(html, /rel="icon"/);
  assert.doesNotMatch(html, /href="(?:javascript:|file:|data:|\/\/)/i);
  metadata.push({file,title,description,robots:'noindex, nofollow',canonical:'Not configured: no approved origin',social:'No invented identity or absolute origin'});
}
assert.equal(new Set(metadata.slice(0,4).map(page=>page.title)).size,4,'Content titles must differ');
assert.equal(new Set(metadata.slice(0,4).map(page=>page.description)).size,4,'Content descriptions must differ');
const assets = [];
async function walk(directory) {
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    const path=join(directory,entry.name);
    if(entry.isDirectory()) await walk(path);
    else {
      const bytes=await readFile(path);
      assert.ok(!path.endsWith('.map'),'Public source map: '+path);
      assert.ok(!/\.(pdf|env)$/i.test(path),'Unapproved public file: '+path);
      const text=bytes.toString('utf8');
      assert.doesNotMatch(text, /AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|Private ownership assertion|Private employer|Synthetic approved scope/);
      assets.push({path:path.replaceAll('\\','/'),type:extname(path),bytes:(await stat(path)).size,gzipBytes:gzipSync(bytes).length});
    }
  }
}
await walk('out');
const report={metadata,assets,security:'Targeted signatures and forbidden fixtures only; not a proof of absence of every secret. Deployment headers/HTTPS are not enabled by this script.'};
if(process.env.QA_OUTPUT) await writeFile(`${process.env.QA_OUTPUT}/export-inspection.json`,JSON.stringify(report,null,2));
console.log(`PASS export readiness: distinct content metadata, noindex, safe link schemes, icon, ${assets.length} files inspected; no maps, PDFs or targeted secret/draft signatures.`);
