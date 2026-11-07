import { chromium, firefox, webkit } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { startPreview, routes } from './preview.mjs';
const output = process.env.QA_OUTPUT ?? 'docs/evidence/sprint-07/final';
await mkdir(output, { recursive: true });
const preview = await startPreview();
const results = { engines: [], responsive: [], keyboard: [], reflow: [], navigation: [] };
let failures = 0;
try {
  for (const [engine, launcher] of Object.entries({ chromium, firefox, webkit })) {
    let browser;
    try { browser = await launcher.launch(); }
    catch (error) { results.engines.push({ engine, status: 'NOT TESTED', reason: error.message }); if (engine === 'chromium') failures++; continue; }
    results.engines.push({ engine, status: 'TESTED', version: browser.version() });
    try {
      const context = await browser.newContext({ reducedMotion: 'reduce' });
      const page = await context.newPage();
      let assetErrors = [];
      page.on('response', response => { if (response.status() >= 400 && /\.(css|js|svg|woff2?|txt)($|\?)/.test(response.url())) assetErrors.push({ url: response.url(), status: response.status() }); });
      for (const width of [320,390,768,834,1024,1440]) for (const route of routes) {
        assetErrors = [];
        await page.setViewportSize({ width, height:1000 });
        const response = await page.goto(preview.origin + route);
        await page.evaluate(() => document.fonts.ready);
        for (const image of await page.locator('img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(img => img.decode()); }
        await page.evaluate(() => scrollTo(0,0));
        const facts = await page.evaluate(() => ({ overflow:document.documentElement.scrollWidth>innerWidth, h1:document.querySelectorAll('h1').length, main:document.querySelectorAll('main').length, fonts:[...document.fonts].map(font=>({family:font.family,status:font.status})), images:[...document.images].map(img=>({src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0})), reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches, animations:document.getAnimations().filter(a=>a.playState==='running').length, scrollBehavior:getComputedStyle(document.documentElement).scrollBehavior }));
        const ok=response.status()===200&&!facts.overflow&&facts.h1===1&&facts.main===1&&facts.images.every(i=>i.loaded)&&!assetErrors.length&&facts.fonts.filter(f=>f.status==='loaded').length>=3&&facts.reducedMotion&&facts.animations===0;
        results.responsive.push({engine,route,width,status:response.status(),...facts,assetErrors,pass:ok});if(!ok)failures++;
      }
      if (engine === 'webkit') results.keyboard.push({engine,status:'NOT TESTED',reason:'This Windows WebKit build does not focus links with Tab or Alt+Tab; isolated default-link probe reproduced it. Native Safari keyboard preferences and traversal require owner review.'});
      for (const route of routes) {
        if (engine !== 'webkit') {
        await page.setViewportSize({width:1280,height:1000});await page.goto(preview.origin+route);await page.keyboard.press('Tab');
        const skip = await page.evaluate(()=>({text:document.activeElement.textContent,outline:getComputedStyle(document.activeElement).outlineStyle}));
        await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main');
        await page.goto(preview.origin+route);
        const stops=[];
        const count=await page.locator('a[href], [tabindex="0"]').count();
        for(let i=0;i<count;i++) {
          await page.keyboard.press('Tab');
          const stop=await page.evaluate(()=>{const el=document.activeElement;const rect=el.getBoundingClientRect();const css=getComputedStyle(el);return {index:[...document.querySelectorAll('a[href], [tabindex="0"]')].indexOf(el),tag:el.tagName,text:el.textContent.trim().slice(0,100),href:el.getAttribute('href'),outline:css.outlineStyle,width:rect.width,height:rect.height,visible:rect.bottom>0&&rect.top<innerHeight&&rect.left>=0&&rect.right<=innerWidth+1};});
          stops.push(stop);
        }
        let reversePass=true;
        for(let i=stops.length-2;i>=0;i--) { await page.keyboard.press('Shift+Tab'); const index=await page.evaluate(()=>[...document.querySelectorAll('a[href], [tabindex="0"]')].indexOf(document.activeElement)); if(index!==stops[i].index)reversePass=false; }
        const ok=skip.text==='Skip to content'&&reversePass&&new Set(stops.map(s=>s.index)).size===count&&stops.every(s=>s.tag!=='BODY'&&s.outline==='solid'&&s.visible);
        results.keyboard.push({engine,route,skip,stops,reversePass,pass:ok});if(!ok)failures++;
        }
        // Reflow equivalence: 1280 physical pixels / zoom, without pretending this is browser UI zoom.
        for (const factor of [2,4]) { await page.setViewportSize({width:1280/factor,height:1000});await page.goto(preview.origin+route);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);results.reflow.push({engine,route,equivalentZoom:factor*100,cssWidth:1280/factor,overflow,method:'CSS viewport reflow equivalence, not browser UI zoom'});if(overflow)failures++; }
      }
      async function activate(href, locator) {
        if(engine==='webkit') { await locator.click(); return; }
        const max=await page.locator('a[href], [tabindex="0"]').count()+3;
        for(let i=0;i<max;i++) {
          await page.keyboard.press(href.startsWith('/#') ? 'Shift+Tab' : 'Tab');
          if(await page.evaluate(()=>document.activeElement.getAttribute('href'))===href) { await page.keyboard.press('Enter'); return; }
        }
        throw new Error('Keyboard could not reach '+href);
      }
      await page.goto(preview.origin+'/');await activate('/work/online-auction/',page.getByRole('link',{name:'Read Online-Auction case study',exact:true}).first());await page.waitForURL('**/work/online-auction/');
      await activate('#architecture',page.getByRole('link',{name:'Architecture',exact:true}));await page.waitForURL('**/#architecture');
      await activate('/#expertise',page.locator('nav a[href="/#expertise"]'));await page.waitForURL('**/#expertise');
      await page.goBack();await page.waitForURL('**/work/online-auction/#architecture');
      const missing=await page.goto(preview.origin+'/work/not-a-project/');assert.equal(missing.status(),404);assert.match(await page.locator('h1').innerText(),/missing/i);
      const redirect=await context.request.get(preview.origin+'/about',{maxRedirects:0});assert.equal(redirect.status(),308);
      results.navigation.push({engine,activation:engine==='webkit'?'click':'Tab/Enter',pass:true,unknownSlug:missing.status(),trailingSlash:redirect.status()});
      await context.close();
    } catch(error) { results.engines.find(e=>e.engine===engine).failure=error.stack;failures++; }
    finally { await browser.close(); }
  }
} finally { await preview.close(); }
await writeFile(`${output}/browser-results.json`,JSON.stringify(results,null,2));
console.log(`Browsers: ${results.engines.map(e=>`${e.engine} ${e.version??e.status}`).join(', ')}; ${results.responsive.length} route/width checks; failures=${failures}`);
if(failures)process.exitCode=1;
