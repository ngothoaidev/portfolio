# Sprint 03 — Homepage Experience

Implemented 2026-11-08 on `codex/sprint-03-homepage-experience`, created from exact base `5de1d52ddef6d976bb098b0d63296d2bd69c7ad9`. The supplied Sprint 03 document and all existing source/tests were read before implementation. No merge, deployment or Sprint 04 feature is included.

## Verified content and publication decisions

In the implementation conversation, the owner explicitly answered **“Yes, show GitHub”** for `https://github.com/ngothoaidev` and **“I confirm all three suggested areas”** for React/UI, Node.js/APIs/PostgreSQL, and AI/Docker/automation. The GitHub profile was checked with `gh api users/ngothoaidev`; response login was `ngothoaidev`, html_url `https://github.com/ngothoaidev`.

These confirmations support restrained expertise copy and publication of that single profile. They do not establish employer identity, dates, measurable outcomes, completed projects, seniority or availability. No such claims were added. The original production project collection remains empty.

## Work package results

| Package | Result |
| --- | --- |
| HP-01 Hero | Preserves the three-line Instrument Serif full-stack title. Typed introduction describes the owner-confirmed areas; working selected-work and conditional contact anchors replace generic filler. No availability claim or unverified resume CTA. |
| HP-02 Selected Work | Retains filtering and stable featured-first ordering. Only the first published featured entry receives prominent typography/keyline styling. Empty production collection retains the honest empty state. Cover dimensions, alt text, local static delivery and no fabricated case-study URLs remain intact. |
| HP-03 Expertise | Adds an editorial list of three owner-confirmed focus areas, summaries and technology tags, with H3 under the section H2. Local MDX supplies readable introductory prose. No skill levels, percentage bars or metrics. |
| HP-04 Insight | Entirely omitted: no concrete decision/evidence was supplied. No unused insight model/component, blank divider or nav target was created. |
| HP-05 Experience | Entirely omitted: employer, period, role and approved contributions remain unknown. Expertise confirmation is not employment verification. |
| HP-06 Contact/Footer | Publishes only approved GitHub in a keyboard-accessible section, using same-tab native link behavior. Null contact fields produce no links; no destinations means the entire section is absent. Header and secondary hero CTA use the same contact helper. Footer drops the stale Foundation edition label. Noindex remains enabled. |
| HP-07 QA | Local install, lint, typecheck, 15 SSR/unit tests, production build, exported-HTML verification, production/full audit, responsive and keyboard checks executed. GitHub-hosted CI is pending a branch push; it is not claimed as passed. |

## Architecture and design decisions

- Keep the Sprint 02 palette, fonts, spacing/focus/contrast tokens, 4/8/12 grid, shared primitives and Server Components. No new dependency, animation framework or client directive was introduced.
- `site.ts` is the typed identity/hero/metadata/contact source, with only consumed fields. Names and unprovided destinations stay null. `getContactLinks` is shared by Contact, Header and Hero; content review is still required before populating a destination.
- `expertise.ts` is a small typed collection. `verifiedOn: null` suppresses an unverified entry; an empty verified collection renders no section. Dates record owner confirmation, not certification or automated factual verification.
- The homepage reads local MDX for its expertise introduction. Components remain presentational and receive typed records; there is no generic page-builder or section registry.
- Remove the generic About placeholder instead of filling it with an invented biography. No invisible About anchor remains.
- Expertise and contact use the existing Section recipe. List rows use hairlines, typography and whitespace; the narrow header wraps into two rows at 320px instead of overlapping.
- A project receives prominent presentation only after publication filtering. No separate featured-project collection is maintained. No real project or screenshot was available, so populated states are exercised only by isolated test fixtures.
- Static export configuration, real project data/types and noindex are preserved. No new routes or server behavior were added.

## Changed files

| Files | Change |
| --- | --- |
| `src/content/site.ts` | Typed profile, confirmed hero copy/contact and shared contact-link helper |
| `src/content/expertise.ts` (new) | Three owner-confirmed areas and verification filter |
| `src/content/introduction.mdx` | Expertise introduction replacing the generic scaffold text |
| `src/app/page.tsx` | Homepage progression: Hero -> Selected Work -> Expertise -> Contact |
| `src/components/sections/hero.tsx` | Recruiter-facing copy and current anchors |
| `src/components/sections/engineering-expertise.tsx` (new) | Conditional expertise list and MDX slot |
| `src/components/sections/contact.tsx` (new) | Conditional approved contact section |
| `src/components/sections/about.tsx` (removed) | Removes generic unsupported About filler |
| `src/components/sections/selected-work.tsx`, `src/components/work/project-card.tsx` | One optional prominent published feature |
| `src/components/layout/site-header.tsx`, `site-footer.tsx` | Matching visible-section navigation and updated footer |
| `src/app/globals.css` | Hero action grouping, focus-area list, contact and narrow-header rules using existing tokens |
| `tests/homepage.test.tsx` (new), `tests/design-system.test.tsx` | Conditional content, claims/links suppression, prominence and updated navigation assertions |
| `scripts/verify-homepage-export.mjs` (new), `package.json`, `.github/workflows/ci.yml` | Verify real built HTML locally and in CI after build |
| `README.md`, this report, `docs/evidence/sprint-03/` | Architecture, actual output and screenshots |

No dependency or lockfile change was required.

## Executed verification

| Check | Actual result |
| --- | --- |
| `npm ci` | Passed; installed 480 packages from lockfile on pinned Node 24.18.0 |
| `npm run lint` | Passed; zero warnings/errors |
| `npm run typecheck` | Passed |
| `npm test` | Passed; 15 tests, 0 failures (10 existing + 5 homepage tests) |
| `npm run build` | Passed; homepage and not-found prerendered, static output in `out/` |
| `npm run verify:export` | Passed; exported headings, targets, labels, approved contact, noindex and omitted claims |
| `npm audit --omit=dev --audit-level=moderate` | Passed; found 0 vulnerabilities |
| `npm audit --json` | Exit 1; 8 moderate development findings, no high/critical |
| `git diff --check` | Passed |
| GitHub-hosted CI | Not run: implementation is committed locally, not pushed. Workflow includes the new exported-HTML check; no audit/check was weakened. |

The original tests still cover project visibility, stable ordering and cover markup/static compatibility. New tests cover completely omitted contact when empty, only the approved GitHub link, suppression of unverified expertise, semantic expertise structure, and exactly one prominent published featured card after draft filtering. The built-HTML check verifies the actual MDX-composed page rather than only component fixtures. [Actual test/build/export output](evidence/sprint-03/validation-output.txt) is retained.

The development findings are the previously documented minimatch advisory propagated through typescript-eslint/Next lint tooling. The existing [acceptance decision](sprint-01-hardening.md#dependency-audit-decision) remains applicable. No force downgrade or cross-major override was applied. npm also reports ESLint 9's support warning and an esbuild script-review warning; installation, test execution and build succeeded. These warnings are not a clean full-audit result.

### Responsive and accessibility review

In-app Chromium reviewed the actual production export served locally on port 3002. All six saved full-page screenshots were visually inspected; none are invented project screenshots or automated pixel baselines.

| Viewport | Grid | Horizontal overflow | H1/H2 | Missing labels/anchors |
| --- | --- | --- | --- | --- |
| 320x1000 | 4 columns | None | 1 / 3 | 0 / 0 |
| 390x1000 | 4 columns | None | 1 / 3 | 0 / 0 |
| 768x1000 | 8 columns | None | 1 / 3 | 0 / 0 |
| 834x1000 | 8 columns | None | 1 / 3 | 0 / 0 |
| 1024x1000 | 12 columns | None | 1 / 3 | 0 / 0 |
| 1440x1000 | 12 columns | None | 1 / 3 | 0 / 0 |

Screenshots: [320](evidence/sprint-03/homepage-320.jpg), [390](evidence/sprint-03/homepage-390.jpg), [768](evidence/sprint-03/homepage-768.jpg), [834](evidence/sprint-03/homepage-834.jpg), [1024](evidence/sprint-03/homepage-1024.jpg), [1440](evidence/sprint-03/homepage-1440.jpg). Measurements: [responsive results](evidence/sprint-03/responsive-results.json).

Keyboard traversal was Skip -> Portfolio -> Work -> Expertise -> Contact -> View selected work -> Get in touch -> GitHub. Every link had solid visible focus. Enter on Skip transferred focus to `main`. Work, Expertise, Contact and the home logo were activated with Enter. All visible header/hero/contact link targets measured 44px high. See [keyboard results](evidence/sprint-03/keyboard-results.json) and [skip-focus screenshot](evidence/sprint-03/skip-focus.jpg).

Contrast regression tests passed against the unchanged palette: ink/paper 13.24:1, muted/paper 5.74:1, forest/paper 7.51:1, selected ink/sage 11.05:1. No animations/transitions were present in computed styles at any tested width. Reduced-motion CSS and immediate scrolling are retained; a reduced-motion OS preference was not separately emulated.

### Verification limits and remaining owner inputs

- [ ] Push the Sprint 03 branch and run GitHub-hosted CI; remote CI acceptance remains outstanding.
- [ ] Supply real projects, accurate contribution/status summaries, source/demo evidence, cover assets and alt descriptions. Current zero-project state is intentional; real cover aspect ratio/CLS remains untested in a browser.
- [ ] Supply a preferred public name and approved biography if desired. No identity was inferred from Git configuration or account profile metadata.
- [ ] Supply verified email/LinkedIn/resume before adding those contact routes. GitHub publication alone was approved.
- [ ] Supply a concrete engineering decision with evidence before implementing Insight.
- [ ] Supply employer publication permission, role, timeline, contributions and stack before implementing Experience.
- [ ] Run automated axe, screen-reader, Safari/Firefox and physical-device checks before launch. These were not executed here.
- [ ] Revisit accepted development dependency advisories; production audit remains blocking in CI.
- [ ] Obtain explicit launch approval before indexing, canonical-domain work or deployment. Noindex remains in place.

No implementation blocker remains for the evidence-supported homepage. GitHub CI and the listed verification/content inputs are not falsely reported as complete. No Sprint 04 implementation was started.
