import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from 'playwright';
import desktopConfig from 'lighthouse/core/config/lr-desktop-config.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { startPreview, routes, labelFor } from './preview.mjs';
const output = process.env.QA_OUTPUT ?? 'docs/evidence/sprint-07/final';
await mkdir(output, { recursive: true });
const preview = await startPreview();
const summary = [];
try {
  for (const route of routes.slice(0,4)) for (const profile of ['mobile','desktop']) {
    const chrome = await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--disable-dev-shm-usage','--no-sandbox']});
    try {
      const result = await lighthouse(preview.origin+route,{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']},profile==='desktop'?desktopConfig:undefined);
      if (!result) throw new Error('No Lighthouse result');
      await writeFile(`${output}/lighthouse-${labelFor(route)}-${profile}.json.gz`,gzipSync(JSON.stringify(result.lhr)));
      const {lhr}=result;
      summary.push({route,profile,version:lhr.lighthouseVersion,fetchTime:lhr.fetchTime,environment:lhr.environment,settings:lhr.configSettings,scores:Object.fromEntries(Object.entries(lhr.categories).map(([id,cat])=>[id,Math.round(cat.score*100)])),metrics:{LCP:lhr.audits['largest-contentful-paint'].numericValue,CLS:lhr.audits['cumulative-layout-shift'].numericValue,TBT:lhr.audits['total-blocking-time'].numericValue},findings:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue})),runtimeError:lhr.runtimeError});
      console.log(`${route} ${profile}: ${JSON.stringify(summary.at(-1).scores)}`);
    } catch (error) { summary.push({route,profile,status:'NOT TESTED',error:error.stack});process.exitCode=1; }
    finally { await chrome.kill(); }
    await writeFile(`${output}/lighthouse-summary.json`,JSON.stringify(summary,null,2));
  }
} finally { await preview.close(); }
