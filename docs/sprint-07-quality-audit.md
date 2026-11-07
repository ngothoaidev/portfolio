# Sprint 07 — Accessibility, performance and SEO audit

Audit date: 2026-11-08 (Asia/Bangkok). Exact base `d49c251741f4f95c9ad342a75fbae7f8b3d627a5`; only `codex/sprint-07-quality-audit` is pushed. No merge, deployment, indexing enablement or Sprint 08 implementation.

Recommendation: **Technical Ready for Sprint 07 review within the executed coverage; not Launch Ready.** No unresolved critical/serious axe finding or deterministic regression failure remains. Native screen-reader announcements, browser-chrome traversal, native zoom and WebKit keyboard traversal remain explicitly **NOT TESTED**, with owner-run steps in `launch-readiness.md`. They are open manual validation/launch gates, not passes inferred from automation.

## Reproducible baseline and environment

Read the sprint brief, prior reports, owner inputs, source/tests and Sprint 06 QA evidence. Created the target branch from the exact base before changes. On Node **24.18.0** / npm **11.16.0**, Windows 11 build 26200, Ryzen 7 8845H / 13.81GB RAM, ran clean installation, lint, typecheck, 28 tests, build, export verification and both audits. Baseline commands passed except the separately reported full development audit (exit 1). Raw stdout/stderr, exit codes and environment are committed under `evidence/sprint-07/baseline/`. The initial log filename for `verify:export` contained a Windows-invalid colon; reran and saved it as `verify-export.txt` rather than pretending the missing log existed.

All audits use production **out/**, never Next dev. `scripts/qa/static-server.mjs` binds loopback, serves correct MIME, gzip, trailing-slash 308 redirects and exported 404.html with HTTP 404 for absent URLs. Hashed static assets simulate immutable caching; HTML/router payloads revalidate. No deployment or host-security header is implied. Scripts start an ephemeral server and close it after their browser exits. `npm run preview:export` exposes the same simulation on 3007 (`PORT` overrides).

Tools: Playwright **1.65.0**, Chromium **158.0.8127.18**, Firefox **159.0**, WebKit **27.2**, axe-core/playwright and axe engine **4.14.0**, Lighthouse **13.6.0**. Test dependencies are development-only and exact-version pinned in the lockfile. Browser installation output is retained.

Reproduce after `npm ci; npm run build` using separate commands: `npx playwright install chromium firefox webkit`, `npm run qa:a11y`, `npm run qa:browsers`, `npm run qa:lighthouse`. Set `QA_OUTPUT` to a fresh evidence directory. Linux CI installs Chromium with its OS dependencies. To reproduce the pre-fix Windows export, use the base SHA and `next build` without normalization, with the pinned audit tools/scripts copied into that isolated checkout; do not confuse the corrected branch build with a baseline.

## Findings and dispositions, highest priority first

| Priority | Finding / affected surface | Evidence and disposition |
| --- | --- | --- |
| P0 | Critical/serious automated accessibility defects | None in 10 baseline or 10 final axe scans (all 5 pages at 320 and 1440). Zero moderate/minor violations and zero incomplete rules in those scans. No exception or suppressed rule. This does not establish WCAG certification. |
| P1 resolved | Windows Next 16.4.5 static router segment payload 404s | Baseline Lighthouse console audit records requested flat names such as `/about/__next.about.__PAGE__.txt`; Windows exporter emitted `about/__next.about/__PAGE__.txt`. Inspected installed export/index.js and segment-value-encoding.js: slash flattening misses Windows separators. Build now copies byte-identical flat aliases only where nested segment files exist. Already-flat Linux builds need zero aliases. Regression fixture and final live navigation/network checks pass; final Lighthouse console audits have no failed-resource errors. No package patch or host-only rewrite hides the problem. |
| P1 resolved | Font-swap layout shifts on About/Work mobile | Baseline CLS About 0.143, Work 0.143; final both 0.000. Same approved Fontsource Latin WOFF2 families/weights/styles now use Next local font preload plus metric-adjusted fallback. Palette/layout/copy unchanged. No remote font request. |
| P1 coverage gap | Actual screen-reader pairing, native browser zoom/chrome | **NOT TESTED** after attempted Narrator startup; see exact interruption below and owner-run script. DOM/axe results do not stand in for speech or native zoom. |
| P1 coverage gap | WebKit keyboard traversal on this Windows build | Tab and Alt+Tab left ordinary links unfocused in isolated probe. Marked **NOT TESTED**, not repaired by adding artificial tabindex to semantic anchors. WebKit responsive, reflow and click/back/fragment checks ran successfully. Actual Safari/physical devices **NOT TESTED**. |
| P2 resolved | Missing tab icon / favicon console 404 | Added tiny source SVG derived from the existing paper/forest accent-dot treatment via Next file convention. It is a UI icon, not a product screenshot or personal image. Final console audit clean and Best Practices 100. |
| P2 tracked | 8 moderate development dependency findings | Same minimatch 10.2.6 / typescript-eslint tooling chain; production audit zero. Registry recheck: latest typescript-estree 8.72.1 still requests minimatch ^10.2.2; latest 10.x is 10.2.6. No compatible same-major fix available. npm proposes mismatched eslint-config-next 15.5.29; no forced downgrade/override applied. Existing Sprint 01 accepted-risk rationale retained. Exact advisory graph saved in full audit JSON. |
| P2 tracked | 404 inherits root title/description | Audited and retained: meaningful visible missing-page H1, noindex/nofollow, exported fallback and correct HTTP 404. Four content-page titles/descriptions are distinct. No experimental global-not-found route introduced merely for a noindexed error-page title. |
| P2 tracked | Unused/legacy framework JS, render-blocking/network insights, timing variance | Lighthouse reports these diagnostics; raw reports retained. No blanket disabled audit, speculative client rewrite or arbitrary timing CI budget. Detail mobile score changed 98 → 95 and TBT 177 → 250ms; do not call that an across-the-board performance improvement. All measured score targets still met. |

## QA-01 — Automated accessibility

`qa:a11y` runs WCAG 2 A/AA, 2.1 A/AA, 2.2 AA and best-practice axe tags without exclusions on Home/About/Work/detail and 404 at 320/1440 x 1000. Reports retain every rule's pass/inapplicable result, targets, violations and incomplete data. Raw JSON is losslessly gzipped; summaries remain readable JSON. Both stages: 10 scans, **0 violations, 0 incomplete**, no untriaged serious/critical findings.

Audited heading order, one H1/main, named landmarks, skip link, native link purpose, target size, alt, contrast and focusable region semantics. The figure's scrollable region has an explicit label and tab stop and did not trigger an axe violation. Its alt/caption/region speech verbosity remains an actual screen-reader review item rather than guessed remediation. Existing palette contrast tests continue to pass.

The script exits nonzero for any critical/serious result; missing Chromium or scanner errors fail execution. CI runs it after static build into a fresh artifacts/accessibility directory and uploads raw/summary artifacts, avoiding stale committed reports. It is separate from non-deterministic Lighthouse metrics and unavailable speech review.

## QA-02 and QA-03 — Interaction, reflow and engines

Final engine matrix: all **five pages × six widths × three engines = 90** route/width checks at 1000px viewport height. Widths: **320, 390, 768, 834, 1024, 1440 CSS px**. All have one H1/main, no document horizontal overflow, local fonts loaded, decoded images, no missing CSS/JS/SVG/font/router-text responses, visible navigation and no running animations under emulated reduced motion. `document.fonts` legitimately lists unused faces as unloaded; used families are confirmed loaded. Loaded images are inspected after scrolling lazy figures into view, not before the browser has been asked to fetch them.

Chromium and Firefox: Tab/Enter skip link on all five pages; forward and reverse tab traversal through every href and figure tab stop, with unique-control coverage to detect traps; solid visible outlines and in-viewport focus rectangles. Keyboard stops are recorded per element in browser-results.json. Browser-chrome entry is **NOT TESTED**; reverse traversal within the document passed. Native anchors retain Enter activation; Space is not rebound to fake button behavior. Chromium/Firefox use Tab/Shift+Tab and Enter to activate the flagship, case TOC and nested Expertise link; WebKit uses click for those functional checks. Browser Back is checked through the automation history API; unknown slug returns 404 and slashless About redirects 308. These navigation checks ran in all three engines.

At 640 and 320 CSS px (1280px desktop width divided by 200%/400%), each engine/all pages passed equivalent reflow without overflow. These are **CSS viewport reflow equivalents**, explicitly not native browser UI zoom. Browser-chrome zoom is **NOT TESTED** because UI automation ended. No font-size-only simulation is presented as native zoom.

Initial browser harness findings were not all site defects: it sampled lazy images before scrolling and stopped when WebKit Tab did not focus links. Original raw matrix is retained as browser-initial.json. Corrected harness scrolled/decoded images and recorded WebKit keyboard as NOT TESTED, then reran. It did not change source markup to hide those limitations. The final matrices report zero assertion failures while preserving this coverage gap. An additional forward-only attempt to reach the header after a deep Firefox fragment hit the browser-chrome boundary; preserved as browser-keyboard-initial.json. Retested using the normal Shift+Tab path back to the header, without programmatic focus injection.

Targeted screenshots only: Home 320/full and 1440/opening, skip focus 320, and figure 320 in Chromium/Firefox/WebKit. Visually inspected Home and skip states plus Firefox/WebKit figure/captions; editorial typography, colors and layout remain consistent. Other widths are measured browser coverage, not individually screenshot-certified layouts.

### Screen-reader attempt and limitation

No NVDA installation/running process was found in the standard Program Files probe. Narrator **10.0.26100.8972** launched; observed its updates/home UI. Edge **156.0.4314.58** was available. Before pairing it with the production route, Computer Use returned: “Computer Use has been stopped for this turn because it could not determine the current browser URL on Windows with enough confidence to enforce policy.” Stopped all native app input; no real announcement was captured. Screen-reader result: **NOT TESTED** for landmarks, headings, links, figure and reading order. Process cleanup returned Access denied, so Narrator may remain active; owner-run exit/check instructions are included in launch-readiness.md. No DOM tree is misrepresented as spoken output.

## QA-04 — Lighthouse and asset measurements

Two comparable stages, one cold browser run per route/profile in each stage (16 raw reports total), serial runs without concurrent browser suites. Each run starts fresh Chrome, storage reset enabled, no warm-cache claim. The localhost server uses the same gzip/cache policy in both stages. OS cache, CPU scheduling and absence of real WAN/HTTPS limit extrapolation; no statistically significant improvement or median is claimed from these single samples. Reports contain runtime benchmark index, user agents, full config and fetch times.

Mobile: Lighthouse default simulated slow 4G, RTT 150ms / throughput 1638.4Kbps / CPU factor 4, 412×823, DPR1.75. Desktop: standard desktop profile, RTT40ms / 10240Kbps / CPU factor1, 1350×940, DPR1. Use configSettings in each raw report for every request-level setting. No diagnostic category disabled to inflate scores; desktop uses Lighthouse's standard desktop config. No field CWV or INP test is claimed.

All final content routes meet the requested lab targets (P≥90, A≥95, BP≥95). SEO scores retain the indexing restriction and are not a launch score.

| Route | Profile | Performance before → after | Accessibility | Best Practices before → after | SEO | Final LCP ms | CLS before → after | Final TBT ms |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | mobile | 97 → 97 | 100 | 96 → 100 | 60 | 750 | 0.000 → 0.000 | 195 |
| `/` | desktop | 100 → 100 | 100 | 96 → 100 | 60 | 260 | 0.025 → 0.000 | 11 |
| `/about/` | mobile | 91 → 96 | 100 | 96 → 100 | 60 | 810 | 0.143 → 0.000 | 226 |
| `/about/` | desktop | 100 → 100 | 100 | 96 → 100 | 60 | 260 | 0.000 → 0.000 | 1 |
| `/work/` | mobile | 91 → 98 | 100 | 96 → 100 | 60 | 810 | 0.143 → 0.000 | 179 |
| `/work/` | desktop | 100 → 100 | 100 | 96 → 100 | 60 | 260 | 0.000 → 0.000 | 3 |
| `/work/online-auction/` | mobile | 98 → 95 | 100 | 96 → 100 | 63 | 810 | 0.000 → 0.000 | 250 |
| `/work/online-auction/` | desktop | 99 → 100 | 100 | 96 → 100 | 63 | 260 | 0.082 → 0.000 | 11 |

Raw reports: `evidence/sprint-07/{baseline,final}/lighthouse-*.json.gz`; comparison: `before-after.json`. Use `node:zlib.gunzipSync` to read the unchanged raw LHR JSON, or load the decompressed JSON in the Lighthouse report viewer. Axe uses the same lossless compression strategy.

Asset inspection: 12 exported JS files total 601,303 raw bytes (whole export, not a per-route transfer budget), one CSS file 23,267 bytes, five WOFF2 fonts 84,120 bytes; full file/raw/gzip inventory in final/export-inspection.json. Figure SVG remains unchanged, small and intrinsically sized. Static source maps absent. Trusted MDX remains local Server Component content; Next's router/runtime JS still ships for navigation. No heavy UI/animation/analytics package was added to production. No arbitrary Lighthouse timing threshold is added to CI.

## QA-05 — SEO with indexing disabled

Final export inspection records all titles/descriptions. Four content routes have distinct meaningful metadata; lang=en, one H1, logical headings, working local links/fragments, no unsupported identity/availability keywords, no automatic new-tab links or file/javascript/data URLs. The 404 inherits root metadata as tracked above, while showing a genuine missing-page heading and HTTP 404. Noindex/nofollow stays in root and every exported document (Next additionally injects noindex in 404). Canonical, metadataBase, absolute social origin, public sitemap and robots.txt remain absent because no origin is approved. These are deliberate launch configuration gates, not omissions to “fix” by inventing a domain. Lighthouse is-crawlable is expected to fail with the current restriction.

## QA-06 — Dependencies, privacy and static-host readiness

Final production audit: **0 vulnerabilities**, blocking at moderate severity unchanged. Full audit: **8 moderate development findings**, same reviewed exception, no high/critical. New audit tools are development-only; no compatible advisory fix was established. ESLint support deprecation and existing action runtime warnings remain tooling follow-up, not silently suppressed by lowering the production gate.

All 19 unique published external anchor destinations returned HTTP **200** to HEAD during this audit; exact URLs/results saved in external-links.json. No login/bidding/payment/demo journey or long-term uptime is implied. Pinned source links still point to `303ae3348c8456fc4b5f83fe850b2b14db80a688`.

Export inspection checked every emitted file for public maps, PDFs/env files, targeted credential/private-key signatures and known draft/private fixtures; none found. It is a targeted leak inspection, not proof of absence of every possible secret. No identity, employer, contribution, contact or resume record was populated. Unknown study isn't emitted. Approved-only content tests and pinned-source/export assertions remain intact.

Static simulation verifies slash redirects, gzip/MIME, no directory listing, method rejection and real 404 fallback; unit tests cover payload bytes and server behavior. HTTPS, CSP, HSTS, nosniff, Referrer-Policy and deployed caching are **NOT TESTED/NOT ENABLED**. The draft `launch-readiness.md` explains host responsibilities without implementing them or asserting a production domain.

## QA-07 — Final gates and handoff

- Clean baseline npm ci, lint, typecheck, 28 tests, production build/export passed before fixes.
- Final lint/typecheck: passed. Final unit tests: **30 passed**, including two meaningful normalization/static-host regressions. An initial test import failed because the audit CLI had top-level await under tsx/CJS; fixed CLI entry, saved initial failure, reran successfully.
- Final production build/export and noindex/content/metadata/asset verification: passed. Windows payload alias count 4; Linux flat build expects 0.
- Axe: 10 final scans, 0 violations, 0 incomplete. Browser matrix: 90 combinations, zero assertion failures, explicit WebKit keyboard/native zoom/AT exclusions.
- Production audit: passed, zero vulnerabilities. Full audit: exit1 / eight accepted moderate dev findings.
- git diff --check: passed before commit. Hosted GitHub CI is checked after push for the exact Sprint 07 SHA and reported in the final handoff; local results never imply hosted success.

Changed implementation: fonts.ts, layout.tsx, tokens.css, icon.svg; package scripts/dev lockfile; scripts/qa static preview, segment normalization, axe/browser/Lighthouse/export/external-link/capture scripts; two quality regression tests; CI axe gate/artifact upload; README and audit/launch/evidence documents. No source project case study or approved personal content changed.

Remaining launch blockers: unresolved owner content approvals in owner-inputs.md, approved HTTPS origin/host/header configuration, real AT/native-zoom/Safari review, and host/field performance verification. No Sprint 08 configuration, deployment, public indexing or merge is performed.

Reference methods: [Playwright accessibility guidance](https://playwright.dev/docs/accessibility-testing), [Lighthouse](https://github.com/GoogleChrome/lighthouse), [WebKit link focus preference](https://developer.apple.com/documentation/webkit/wkpreferences/tabfocuseslinks), [Microsoft Narrator commands](https://support.microsoft.com/en-gb/accessibility/windows/narrator/appendix-b-narrator-keyboard-commands-and-touch-gestures). Installed Next static-export/local-font/icon guides and exporter implementation were read before their changes.
