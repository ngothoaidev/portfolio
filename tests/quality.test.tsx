import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { normalizeExport } from '../scripts/qa/normalize-export.mjs';
import { createStaticServer } from '../scripts/qa/static-server.mjs';

test('static payload normalization preserves bytes and already-flat exports', async () => {
  const prefix = join(tmpdir(),'portfolio-export-test-');
  const root = await mkdtemp(prefix);
  try {
    await mkdir(join(root,'about','__next.about'),{recursive:true});
    await writeFile(join(root,'about','__next.about','__PAGE__.txt'),'trusted static payload');
    await writeFile(join(root,'about','__next._tree.txt'),'existing tree');
    assert.equal(await normalizeExport(root),1);
    assert.equal(await readFile(join(root,'about','__next.about.__PAGE__.txt'),'utf8'),'trusted static payload');
    assert.equal(await readFile(join(root,'about','__next._tree.txt'),'utf8'),'existing tree');
  } finally { assert.ok(resolve(root).startsWith(resolve(prefix))); await rm(root,{recursive:true}); }
});

test('static preview serves MIME, slash redirect, router payload and true 404 fallback', async () => {
  const prefix = join(tmpdir(),'portfolio-host-test-');
  const root = await mkdtemp(prefix);
  const server = createStaticServer(root);
  try {
    await mkdir(join(root,'about'));
    await writeFile(join(root,'about','index.html'),'<h1>About</h1>');
    await writeFile(join(root,'404.html'),'<h1>Missing</h1>');
    await writeFile(join(root,'payload.txt'),'router');
    await new Promise<void>(resolve => server.listen(0,'127.0.0.1',resolve));
    const address=server.address(); assert.ok(address && typeof address!=='string');
    const base=`http://127.0.0.1:${address.port}`;
    const slash=await fetch(base+'/about',{redirect:'manual'}); assert.equal(slash.status,308); assert.equal(slash.headers.get('location'),'/about/');
    const page=await fetch(base+'/about/'); assert.match(page.headers.get('content-type')!,/text\/html/); assert.equal(await page.text(),'<h1>About</h1>');
    const payload=await fetch(base+'/payload.txt'); assert.equal(payload.status,200); assert.match(payload.headers.get('content-type')!,/text\/plain/);
    const missing=await fetch(base+'/does-not-exist/'); assert.equal(missing.status,404); assert.equal(await missing.text(),'<h1>Missing</h1>');
    assert.equal((await fetch(base+'/about/',{method:'POST'})).status,405);
  } finally {
    if(server.listening) await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));
    assert.ok(resolve(root).startsWith(resolve(prefix))); await rm(root,{recursive:true});
  }
});
