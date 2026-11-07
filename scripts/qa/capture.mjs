import {chromium,firefox,webkit} from 'playwright';
import {startPreview} from './preview.mjs';
const preview=await startPreview();
try {
 for(const [name,type] of Object.entries({chromium,firefox,webkit})) {
  const browser=await type.launch();const page=await browser.newPage({viewport:{width:320,height:1000}});
  await page.goto(preview.origin+'/');await page.evaluate(()=>document.fonts.ready);
  if(name==='chromium') {
    await page.screenshot({path:'docs/evidence/sprint-07/final/home-320.jpg',fullPage:true});
    await page.keyboard.press('Tab');await page.screenshot({path:'docs/evidence/sprint-07/final/skip-focus-320.jpg'});
    await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>document.activeElement.blur());await page.screenshot({path:'docs/evidence/sprint-07/final/home-1440.jpg'});
  }
  await page.goto(preview.origin+'/work/online-auction/');await page.locator('figure img').scrollIntoViewIfNeeded();await page.locator('figure img').evaluate(img=>img.decode());
  await page.locator('figure').screenshot({path:`docs/evidence/sprint-07/final/figure-${name}-320.jpg`});
  await browser.close();
 }
}finally{await preview.close();}
