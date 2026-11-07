# Sprint 06 — Content polish and technical storytelling

Base `827baf45152f28a5f50064ac6103accbc748bd81`; target `codex/sprint-06-content-storytelling`. Source remains Online-Auction `feature/auction-upgrade` at `303ae3348c8456fc4b5f83fe850b2b14db80a688`.

## Work packages

| Package | Result |
| --- | --- |
| CP-01 | Exhaustive pre-edit rendered text/metadata/label inventory and changed-copy decisions in `sprint-06-content-audit.md`; pre-edit source inventory saved alongside evidence. Explicit owner-approved, source-verified, editorial and pending categories. |
| CP-02 | Short recruiter summary, direct publication-filtered flagship CTA before prose, distinct About reading approach without repeated tag lists, Work proof-oriented introduction and clearer metadata. |
| CP-03 | Plain-language buyer/seller context; dedicated scope/attribution section; three decisions now explain problem, decision, why and cost beside pinned source links. Prior pure execution, inspected integration code and historical lab results stay distinct. |
| CP-04 | Pending contribution checklist and optional typed approved contribution scope; current output has no empty My Role, personal achievement or new identity/contact data. Existing bio/experience/contact/resume gates retained. |
| CP-05 | Generic route uses selected study content/sections; generic SourceLink receives an explicit source base. Finite metadata index and static module registry remain type checked. Auction-specific source binding lives in its content module. Synthetic second study appears in isolated tests only. |
| CP-06 | Existing source-derived architecture SVG retained with truthful caption, alt and dimensions; no copied product capture, new illustration or achievement. Shared CSS only adds readable summary rhythm and CTA placement. |
| CP-07 | 28 portfolio tests plus actual export validation, audits and production Chromium checks. Hosted CI result is checked after push and reported against the exact commit in the handoff. |

## Architecture and validation limits

The finite index contains contentPath, section tuples and sourceBaseUrl. `project-case-studies.ts` statically imports trusted MDX and bundles the corresponding metadata; `satisfies Record<CaseStudySlug, ...>` requires every index key to have a module. Shared selectors reject drafts, unknown keys and content-path mismatches. `dynamicParams=false`, generated published slugs, metadata notFound and page notFound remain intact. No runtime dynamic import or client component was introduced.

Section metadata is checked for nonempty unique IDs and labels. Tests compare literal authored H2 IDs with the index; export checks compare actual rendered H2 IDs with actual rendered TOC links, in order. This is targeted authoring/render validation, **not an MDX AST analysis** or proof of arbitrary future content correctness.

Source inspection rechecked architecture, bidding command order, idempotency, settlement, outbox, pure transition implementation and historical report/raw JSON through GitHub at the immutable SHA. It did not execute source tests. The 19 pure tests refer explicitly to the earlier Sprint 04 agent run; they are different from this sprint's 28 portfolio tests. Database concurrency/fault suites remain source-inspected, not independently passed. The historical 549ms p95 remains only in verification, with hardware/topology/phase/refusal qualifications. No before/after or production-capacity inference.

## Local checks actually executed

- `npm ci`: passed on Node 24.18.0, lockfile unchanged.
- `npm run lint`: passed, zero warnings/errors.
- `npm run typecheck`: passed.
- `npm test`: 28 passed, zero failed (23 prior plus 5 storytelling/registry tests).
- `npm run build`: passed; all existing routes and 404 statically exported.
- `npm run verify:export`: passed; one H1, ordered headings, unique IDs, labels, every local link/anchor, noindex, real TOC agreement, immutable source citations and absence of draft/private scope/contact fixtures.
- `npm audit --omit=dev --audit-level=moderate`: passed, zero vulnerabilities.
- Full `npm audit --json`: eight moderate development findings, saved in evidence. Same accepted minimatch/ESLint chain and upstream support warning; Sprint 01 hardening rationale retained. No downgrade, override or weakened production gate.
- `git diff --check`: passed before commit.

During iteration, lint caught an unused CTA variable, typecheck caught widened tuple fixtures and source inspection caught a Windows encoding conversion. All were corrected before final verification. No unsuccessful intermediate check is claimed as a final pass.

## Production browser QA

Chromium reviewed the actual `out/` served locally on port 3006. Five pages (`/`, `/about/`, `/work/`, `/work/online-auction/`, `/404.html`) at **320, 390, 768, 834, 1024, 1440px**, each 1000px high: 30 combinations, no document horizontal overflow, one H1, loaded intrinsic-size figure and noindex. Unknown study path returned HTTP 404. Evidence: full-page screenshots, Home/detail opening crops, figure crops and `browser-results.json`.

Keyboard Tab showed the skip link with a solid outline and Enter transferred focus to main on each of the four content routes. Browser link activation followed Home flagship → engineering decisions TOC → nested Expertise → About → Work → case study. Export checking additionally verifies all internal destinations and fragments.

Visual inspection covered Home openings at all six widths; About at 390, archive at 834, detail openings at 320/1440, and the source-derived diagram at 320. Final Home CTA placement was adjusted after visual inspection to put the flagship link before the longer summary; production browser QA and screenshots were rerun after the adjustment. Other screenshots document measured responsive coverage without claiming each was individually visually reviewed.

No screen-reader session, axe certification, Safari/Firefox/physical-device testing, Lighthouse or measured Core Web Vitals was performed. These remain future Sprint 07 validation work; none was implemented here. Screenshots are review evidence, not a WCAG or field-performance pass.

## Changed files

- Copy/routes: `src/content/site.ts`, `src/content/projects.ts`, `src/components/sections/hero.tsx`, `src/components/work/work-archive.tsx`, `src/app/about/page.tsx`, `src/app/work/page.tsx`, `content/projects/online-auction.mdx`.
- Registry/evidence/presentation: `src/content/case-study-index.ts`, `project-case-studies.ts`, `online-auction-evidence.ts`, new `online-auction-source-link.tsx`, `validate-projects.ts`, `src/app/work/[slug]/page.tsx`, `src/components/case-study/elements.tsx`, `src/app/globals.css`.
- Checks: new `tests/storytelling.test.tsx`, `scripts/verify-work-export.mjs`.
- Documentation: README, `docs/owner-inputs.md`, `docs/sprint-06-content-audit.md`, this report, `docs/evidence/sprint-06/`.

## Remaining content inputs and launch limitations

Public name, approved biography, education, employment/history/dates, individual Online-Auction contributions and team boundaries, tests personally run, email/LinkedIn, availability, final redacted approved resume and product capture permissions remain unresolved. See `owner-inputs.md` for precise contribution questions and permission gates. GitHub remains the sole public contact. No fabricated record or product screenshot was introduced.

No merge, deployment, indexing enablement, new case study, credential claim or Sprint 07 implementation. Public-launch content approval remains separate from Sprint 06 technical readiness. Working branch only is pushed; hosted CI success is never inferred from these local results.
