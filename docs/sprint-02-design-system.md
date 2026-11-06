# Sprint 02 — Editorial Design System

Implemented 2026-11-07 on `codex/sprint-02-design-system`, created directly from `e8cfd54c7e5ad1a37d2a2213da10798132bf85eb`. The supplied Sprint 02 specification was read in full before changes. No merge, deployment, content route, or Sprint 03 feature is included.

## Work packages and decisions

| Package | Result |
| --- | --- |
| DS-01 | Audited base components/CSS and captured baseline widths 320, 390, 768, 1024 and 1440 before implementation; see design audit |
| DS-02 | One tokens.css defines primitives, semantic roles, spacing/type scale, responsive rhythm, hairlines and focus; Tailwind v4 aliases consume the same roles |
| DS-03 | DisplayHeading, SectionHeading and Eyebrow recipes replace heading-level styling; readable body CSS and MDX heading mapping preserve semantics |
| DS-04 | Container reduces home/404 duplication; Section shares work/about label/content structure; hero retains its own distinctive grid |
| DS-05 | Shared TextLink/TechTag, navigation affordances, 44px link height, labelled project status and consistent project presentation |
| DS-06 | Existing tests retained; six focused design-system tests added; clean install, lint, typecheck, tests, build, audit and production browser QA executed |

### Token architecture

Palette values live only in tokens.css. Semantic background/surface share paper intentionally: this design has no raised-card surface. Foreground, muted, accent, border, focus and selection roles remain independent aliases. No feedback states exist in the product, so no speculative success/warning/error palette was added.

Space primitives feed semantic grid gaps, gutters, section/hero padding, comfortable tap heights and focus offset. The type scale uses the three existing local font families. Display and section sizes stay fluid; small mono metadata is slightly enlarged with lower tracking. Shared border treatments stay CSS borders; an unused Divider component would add no value. No actionable button exists, so no Button or disabled-button API was introduced. TextLink is an actual anchor, never a disabled pseudo-button; it wraps long labels and keeps its underline at rest. Navigation exposes an underline on hover/focus as well as a visible focus ring. Status labels convey meaning with text, not hue.

### Components and content boundary

The component tree remains SiteShell -> Hero / SelectedWork / About. SiteShell owns header, focusable main and footer. Section owns the work/about grid and accessible label reference; each caller owns its actual heading. DisplayHeading always renders H1; SectionHeading permits only H2/H3 where current uses need them. Eyebrow permits p/span. Container permits div/main for the two actual uses. No polymorphic component framework, variant library, client directive, or additional package was added.

Next's built-in Link handles the logo's real home URL `/`. TextLink handles native anchors and external destinations in the same tab. External card names include their project title; arrows are hidden from assistive technology. No nonexistent case-study route is inferred from the content reference. Publication filtering, stable featured ordering, development status, and content types are unchanged; the actual project collection remains empty.

Project covers retain intrinsic dimensions with width:100% and height:auto, and `unoptimized` preserves static exports. Only synthetic, isolated tests exercise covers because there are no verified project assets to show. No project screenshot or achievement was fabricated.

## Changed file inventory

- `src/app/tokens.css` (new): authoritative token definitions and responsive token overrides.
- `src/app/globals.css`: typography, layout, interaction, section and project recipes.
- `src/components/ui/typography.tsx`, `text-link.tsx`, `tech-tag.tsx` (new): small server-rendered UI recipes.
- `src/components/layout/container.tsx`, `section.tsx` (new): shared layout structure.
- Existing layout `site-header.tsx`, `site-footer.tsx`, `site-shell.tsx`: apply tokens/primitives and home navigation.
- Existing sections `hero.tsx`, `selected-work.tsx`, `about.tsx`: adopt recipes without changing factual content or selection logic.
- `src/components/work/project-card.tsx`: consistent headings, metadata, tags and accessible links.
- `src/mdx-components.tsx`: shared H2/H3 mapping, with caller overrides preserved.
- `src/app/not-found.tsx`: same container/type/link recipes and focusable main.
- `tests/design-system.test.tsx` (new): semantics, navigation, main landmark, native link semantics, statuses and contrast.
- `.github/workflows/ci.yml`: workflow display name updated; existing required checks already execute the expanded tests.
- `README.md`, this report, `sprint-02-design-audit.md`, and `docs/evidence/sprint-02/`: architecture and recorded evidence.

Dependencies, lockfile, Next export configuration, content types, and actual content were not changed.

## Executed verification

| Command | Result |
| --- | --- |
| `npm ci` | Passed on pinned Node 24.18.0; installed lockfile dependencies |
| `npm run lint` | Passed, zero warnings |
| `npm run typecheck` | Passed |
| `npm test` | Passed, 10 tests (4 existing + 6 new) |
| `npm run build` | Passed; `/` and not-found prerendered to `out/` |
| `npm audit --omit=dev --audit-level=moderate` | Passed; zero production vulnerabilities |
| `npm audit --json` | Exit 1; same 8 moderate development findings, accepted separately below |
| `git diff --check` | Passed |

The original project regression tests still verify draft suppression/empty state, published rendering/verified links, stable featured ordering, and cover dimensions/alt text without fabricated case-study URLs. New tests check heading composition, navigation destinations, the focusable main landmark, native link behavior/decorative arrows, all three textual development statuses, tags and palette contrast.

### Production browser review

Final QA ran against the actual `out/` export served locally with Python, not only the dev server. Every requested width was captured and visually inspected. Measurements are in [responsive-results.json](evidence/sprint-02/responsive-results.json).

| Viewport | Columns | Horizontal overflow | H1 count | Missing section labels |
| --- | --- | --- | --- | --- |
| 320 x 1000 | 4 | None | 1 | 0 |
| 390 x 1000 | 4 | None | 1 | 0 |
| 768 x 1000 | 8 | None | 1 | 0 |
| 834 x 1000 | 8 | None | 1 | 0 |
| 1024 x 1000 | 12 | None | 1 | 0 |
| 1440 x 1000 | 12 | None | 1 | 0 |

Screenshots: [320](evidence/sprint-02/final-320.jpg), [390](evidence/sprint-02/final-390.jpg), [768](evidence/sprint-02/final-768.jpg), [834](evidence/sprint-02/final-834.jpg), [1024](evidence/sprint-02/final-1024.jpg), [1440](evidence/sprint-02/final-1440.jpg).

Keyboard traversal was Skip -> Portfolio -> Work -> About -> Explore work, all with solid visible focus. Enter on Skip transferred focus to `main`. Work/About anchors and the logo were activated with Enter. The exported [404 page](evidence/sprint-02/not-found.jpg) rendered one H1 and a working return-home link. All current header/hero link targets measured 44px high. The page has no missing hash targets. See [keyboard results](evidence/sprint-02/keyboard-results.json) and [skip-focus screenshot](evidence/sprint-02/keyboard-skip-focus.jpg).

Contrast ratios calculated from source palette: ink/paper **13.24:1**, muted/paper **5.74:1**, forest/paper **7.51:1**, selected ink/sage **11.05:1**. Normal text exceeds 4.5:1 and the paper-background focus ring exceeds 3:1. The skip link uses a paper ring with outer ink separation on its inverse surface. Subtle borders are decorative structural separators, not control boundaries.

Computed animation/transition counts were zero at all six widths. There is no smooth scrolling or decorative motion; reduced-motion CSS explicitly keeps scrolling immediate. An OS/browser reduced-motion preference was not emulated, so that preference-specific check is source-reviewed rather than claimed as a browser run.

## Remaining issues / verification limits

- [ ] Upstream development audit: same minimatch advisory through typescript-eslint, plus ESLint 9's support warning. The Sprint 01 [acceptance rationale](sprint-01-hardening.md#dependency-audit-decision) remains applicable. No force-fix, major override or mismatched downgrade was applied.
- [ ] GitHub-hosted CI has not executed for this local Sprint 02 commit; local equivalent commands passed.
- [ ] Automated axe audit, screen-reader use, Firefox/Safari and physical-device checks were not executed.
- [ ] Cover proportions are covered by markup regression and CSS inspection, not a browser with real project assets. Review populated cards, long real titles and real covers when owner-verified content becomes available.
- [ ] Saved screenshots are visual-review evidence; no unstable automated pixel-comparison baseline was introduced.

There is no implementation blocker. Real content, future case-study routes, recruiting content, canonical domain/indexing approval, analytics, contact functionality and deployment remain outside this sprint and require their own approved scope. No Sprint 03 implementation was started.
