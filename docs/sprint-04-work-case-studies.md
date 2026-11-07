# Sprint 04 — Work Archive & Engineering Case Studies

Date: 2026-11-08. Branch: `codex/sprint-04-work-case-studies`. Base: `fa2fcb7ff460e5662df118cb2f1e1e7a8d39739e`. The complete supplied specification was read before implementation.

## Work packages

- **WK-01:** Audited the exact Online-Auction `feature/auction-upgrade` branch. Head `303ae3348c8456fc4b5f83fe850b2b14db80a688` was checked after clone and rechecked remotely before commit. Created the [claim-to-evidence matrix](content-audit-online-auction.md) before writing the narrative. Inspected architecture, feature matrix, ADR, commands, worker, state machine, SSE, representative integration tests, raw load JSON and existing seeded UI screenshot.
- **WK-02:** Added static `/work/` with page metadata, published count, stable ordering, H2 card titles and an explicit empty state.
- **WK-03:** Added `/work/[slug]` with finite `generateStaticParams`, `dynamicParams=false`, unknown-slug notFound guards, page metadata, back-to-work link and explicit trusted MDX import registry. Only `/work/online-auction/` is currently registered. No related-work block is shown because no other published study exists.
- **WK-04:** Added shared CaseStudyHeader, TOC, EvidenceFigure and DecisionBlock recipes. Body width is 70ch; mobile is linear. A genuine source-derived architecture SVG fits narrow screens, with alt text and an explicit caption. No syntax library was added because this study needs only inline code.
- **WK-05:** Authored local MDX with overview, problem, constraints, architecture, decisions, implementation, verification, outcomes and limitations. Evidence links are pinned to the audited source revision. The study distinguishes source implementation, inspected test code, independently executed pure tests and historical reported measurements.
- **WK-06:** Published one in-progress Online-Auction record. Its scope is source analysis, not an inferred personal role. Home/archive cards resolve the finite registry before emitting case-study links. Global nav uses real archive and homepage fragment URLs. Home, archive and detail all import a build-validated catalog; root noindex and approved contact remain intact.
- **WK-07:** Executed clean install, lint, typecheck, 19 portfolio tests, build, homepage/work export validation and dependency audits. Browser-tested both routes at all requested widths and keyboard navigation from nested routes. CI is run after pushing this branch; its actual run is reported in the handoff rather than pre-claimed here.

## Personal attribution and assets

The user directed review of their GitHub codebase without specifying a personal contribution boundary. Repository ownership is not proof of authorship of every feature. Accordingly the published study uses implementation-focused, impersonal wording and explicitly states that individual contribution scope is not asserted. No employer, performance improvement, ownership percentage or personal achievement is invented. A later owner-approved scope can replace that qualification.

The public repository's seeded lot screenshot was inspected for inventory/provenance but not copied: it contains demo content and placeholder product imagery, and screenshot reproduction permission was not separately established. The portfolio uses an authored architecture diagram grounded in source, clearly captioned as not a product screenshot. No stock cover was substituted.

## Changed files

- Routes: `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`; validated-catalog import in `src/app/page.tsx`.
- Content: `src/content/projects.ts`, new `case-study-index.ts`, `project-case-studies.ts`, `project-catalog.ts`, `validate-projects.ts`, `online-auction-evidence.ts`; trusted `content/projects/online-auction.mdx`.
- Presentation: `src/components/work/work-archive.tsx`, `project-card.tsx`, `src/components/case-study/elements.tsx`, `src/components/layout/site-header.tsx`, `src/components/sections/selected-work.tsx`, `src/app/globals.css`.
- Asset: `public/work/online-auction-architecture.svg`.
- Checks: `tests/work.test.tsx`, navigation assertions in `tests/design-system.test.tsx`, `scripts/verify-work-export.mjs`, updated `scripts/verify-homepage-export.mjs` and `package.json` export-check script.
- Documentation: README, this report, evidence matrix, `docs/evidence/sprint-04/`.

No new dependency, lockfile change, backend, CMS, runtime data access, deployment configuration or indexing change was introduced.

## Evidence sources and limits

Source URL: https://github.com/ngothoaidev/Online-Auction/tree/303ae3348c8456fc4b5f83fe850b2b14db80a688

Key evidence paths: `docs/architecture.md`, `docs/adr/0002-architecture-decisions.md`, `docs/feature-matrix.md`, `backend/services/auctionCommands.js`, `idempotency.js`, `settlement.js`, `outbox.js`, `realtime.js`, `backend/domain/orderTransitions.js`, integration `bidding.test.js`, `settlement.test.js`, `outbox.test.js`, `faults.test.js`, and `docs/validation/report-t23.md` / `load-t23.json`.

The independent source test run was **19/19** for dependency-free bidding and order-transition suites. The initial broader unit attempt passed 22 tests but could not load three dependency-requiring files; it is not reported as a complete passing suite. Database integration, E2E, load and Lighthouse were not reproduced. Historical p95 549ms appears only as a repository-reported single-machine baseline, with environment and rule-refusal context, not a fresh audit result or capacity promise.

The demo returned HTTP 200 on 2026-11-08. The web browsing tool could not access it, so a direct HTTP GET supplied the link check. No uptime, full user journey, payment or hosted-commit correspondence was verified. Real provider payments and AI feature completion are not claimed.

## Actual portfolio verification

| Check | Result |
| --- | --- |
| `npm ci` | Passed, lockfile installation |
| `npm run lint` | Passed, zero warnings/errors |
| `npm run typecheck` | Passed |
| `npm test` | 19 passed, 0 failed |
| `npm run build` | Passed: `/`, `/work/`, `/work/online-auction/` and not-found exported |
| `npm run verify:export` | Passed: actual HTML, MDX headings/figure, one H1, all internal route/fragment targets, noindex and unknown-slug absence |
| `npm audit --omit=dev --audit-level=moderate` | Passed, zero production vulnerabilities |
| Full `npm audit --json` | 8 moderate development findings, accepted lint-tool-chain advisory; see saved JSON and Sprint 01 acceptance rationale |
| Unknown slug HTTP check | `/work/not-a-project/` returned 404 from the static preview server |
| `git diff --check` | Passed before commit |

Actual [portfolio output](evidence/sprint-04/portfolio-validation-output.txt), [source-unit output](evidence/sprint-04/source-unit-output.txt), [audit JSON](evidence/sprint-04/dependency-audit.json) are saved. The existing CI workflow calls the expanded export verification after build; no audit gate is weakened.

## Browser QA

In-app Chromium inspected the actual `out/` production export, served locally on port 3004. Archive and detail were tested at **320, 390, 768, 1024 and 1440px**, all with 1000px viewport height. Measurements and full-page screenshots are under `docs/evidence/sprint-04/`; archive and case opening screenshots were visually inspected at all five widths. The refined diagram was additionally inspected at 320 and 1440.

- No document horizontal overflow at any width; every route has one H1 and one main. Archive card uses H2 and detail uses ordered H2/H3 headings.
- Diagram loaded with alt text, intrinsic dimensions and caption; final figure clientWidth equals scrollWidth even at 320px. Long revision hashes wrap; no wide code or tables are used.
- Keyboard skip link transferred focus to `main`. First nine detail stops were Skip, Home, Work, Expertise, Contact, Back to work, Audited source, Demo and Overview, each with solid visible focus. TOC Architecture activation was checked.
- Nested Expertise navigation reached `/#expertise`; Work navigation reached archive and its card link reached `/work/online-auction/`. Export checks validate all internal targets, including Contact, regardless of the current route.
- Existing color-contrast tests pass against unchanged paper/ink/forest primitives. No animations were found. Reduced-motion CSS remains immediate; a separate OS preference was not emulated.

Measured evidence: [initial route measurements](evidence/sprint-04/responsive-results.json), [final refined detail measurements](evidence/sprint-04/detail-final-results.json), [keyboard results](evidence/sprint-04/keyboard-results.json). Images: `archive-{width}.jpg`, `detail-{width}.jpg`, `detail-opening-{width}.jpg`, `diagram-320.jpg`, `diagram-1440.jpg`, `detail-skip-focus.jpg`.

## Remaining limitations

- Personal contribution attribution remains deliberately unspecified; no sole-author claim is made. Owner confirmation is needed before adding first-person achievements.
- Source integration tests, performance runs and real payment flows were not independently executed. Historical report claims remain qualified.
- No product screenshots are republished. Additional media needs approval/provenance and descriptive alt text.
- Portfolio Lighthouse/Core Web Vitals, automated axe, screen-reader, Safari/Firefox and physical-device checks were not run. Intrinsic figure dimensions and browser overflow checks are not a measured CLS or field-CWV result.
- Eight moderate development dependency advisories and ESLint action/tooling warnings remain separate from the clean production audit.
- Unknown static paths require correct host 404 handling; Python preview verified absence, not a future hosting configuration.

No merge, deployment, indexing enablement or Sprint 05 work was performed.
