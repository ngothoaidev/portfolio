import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { startPreview, routes, labelFor } from './preview.mjs';
const output = process.env.QA_OUTPUT ?? 'docs/evidence/sprint-07/final';
await mkdir(output, { recursive: true });
const preview = await startPreview();
let browser;
const summary = [];
try {
  browser = await chromium.launch();
  for (const route of routes) for (const width of [320, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 } });
    const page = await context.newPage();
    await page.goto(preview.origin + route);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    await writeFile(`${output}/axe-${labelFor(route)}-${width}.json.gz`, gzipSync(JSON.stringify(result)));
    summary.push({ route, width, browser: browser.version(), axe: result.testEngine.version, violations: result.violations, incomplete: result.incomplete.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) })), passes: result.passes.map(rule => rule.id), inapplicable: result.inapplicable.map(rule => rule.id) });
    await context.close();
  }
  await writeFile(`${output}/axe-summary.json`, JSON.stringify(summary, null, 2));
  const blocking = summary.flatMap(run => run.violations.filter(rule => ['critical','serious'].includes(rule.impact)));
  console.log(`axe: ${summary.length} scans; ${summary.reduce((n,run)=>n+run.violations.length,0)} violations; ${blocking.length} critical/serious. Raw reports include incomplete rules for manual review.`);
  if (blocking.length) process.exitCode = 1;
} finally { await browser?.close(); await preview.close(); }
