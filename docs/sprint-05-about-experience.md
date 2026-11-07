# Sprint 05 — About, experience and recruiter conversion

Implemented AB-01–AB-07 from exact base `129738a29dc2d8db4ddf92eb440a3afe1c6c6b2e` on `codex/sprint-05-about-experience`.

- Static Server Component `/about/` uses the existing shell, display typography, editorial grid and tokens. Three approved focus areas, source-backed reading approach, Work/case-study links and approved GitHub CTA.
- Typed profile approval records and reusable semantic experience list. Drafts render nothing; approved records validate required text, approval reference, IDs, month precision, date order and HTTPS evidence. Reverse chronological order. Empty collection has no section or navigation target. Homepage retains its existing four-section sequence and correct numbering; no optional preview is introduced.
- Single contact-source function requires channel approvals and validates profile URLs/local PDF paths. Resume build guard checks permission/privacy review, existence and PDF signature/trailer. It cannot substitute for owner review of PDF contents.
- About navigation across all existing pages; no client component or menu JavaScript. No changes to noindex, deployment, canonical, sitemap or project attribution.
- Approval/source matrix and missing inputs are in `owner-inputs.md`.

## Verification

`npm ci` passed after stopping the workspace Next dev process that held a native dependency file open. Initial build exposed a Windows source encoding error; corrected to UTF-8. Initial export assertion incorrectly expected navigation on the standalone 404 page; corrected to scope navigation assertions to pages with the shared header. Final checks recorded in evidence output.

Production Chromium: four routes (`/`, `/about/`, `/work/`, `/work/online-auction/`) at 320, 390, 768, 834, 1024, 1440px, 1000px viewport height. All 24 route/width combinations returned 200, had one H1, About navigation and no horizontal overflow. Full-page screenshots and machine results in `evidence/sprint-05/`. About at 320 and 1440 visually inspected: no clipping, clear hierarchy, wrapped navigation and readable columns/stack. Keyboard Tab exposed the skip link with solid outline; Enter focused main. Browser activation checked nested Expertise → About → Work. Export verification checks every local route/anchor, noindex, heading hierarchy, unique IDs and omitted private channels. Remaining screenshots are captured evidence, not claimed as individually visually inspected.

Limitations: Chromium only; no physical device, screen reader, axe, Lighthouse/CWV or Safari/Firefox testing. Resume is absent; future PDF privacy inspection requires owner input. Eight moderate development dependency findings remain reviewed tooling risks; production audit gate remains blocking. No merge, deploy, indexing enablement or Sprint 06 work.

Final local results: npm ci PASS; lint PASS; typecheck PASS; 23 tests PASS; production static build PASS; export verifier PASS; production audit PASS (zero vulnerabilities). Full dependency audit records eight moderate development findings in saved JSON. git diff --check PASS after whitespace cleanup. CI status is reported against the pushed commit in the handoff; no success is inferred from local checks.
