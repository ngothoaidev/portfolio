# Sprint 01 — Repository & Content Foundation

## Audit

The repository was empty, on an unborn master branch, with no application, dependencies, content, or local agent instructions. Work is isolated on `codex/sprint-01-foundation`.

## Scope and implementation plan

1. Set up Next.js App Router, strict TypeScript, Tailwind CSS, ESLint, and local MDX compilation.
2. Establish warm paper, ink, forest, typography, and responsive 12-column layout tokens.
3. Build a semantic landing shell and an honest empty state, with an MDX introduction.
4. Define typed content and an un-routed project authoring template; document missing source material.
5. Run lint, typecheck, and static production build.

The initial user request authorizes Sprint 01 only. No later sprint, publication, or merge is included.

## Dependencies

Runtime: Next.js, React, MDX compiler integration, and self-hosted Fontsource packages for Instrument Serif, Geist, and IBM Plex Mono. Tooling: TypeScript, ESLint with Next.js rules, Tailwind and its PostCSS plugin. Exact resolved versions are recorded in package-lock.json.

## Required owner input

- Display name, factual biography, location if desired, and contact links.
- Actual projects, personal contributions, technical decisions, evidence URLs, and any supported measurements.
- Professional experience and resume, if included in a later sprint.
- Production domain and approval to index and publish.

## Deferred

Project detail routes, populated case studies, writing index, resume, contact functionality, social metadata images, analytics, deployment, and browser-based visual QA. No professional history or project achievements are asserted by this scaffold.

## Verification results

- `npm run lint`: passed, zero warnings.
- `npm run typecheck`: passed with strict TypeScript.
- `npm run build`: passed; homepage and not-found page prerendered, static output in `out/`.
- `npm audit --omit=dev`: zero production dependency vulnerabilities.
- Full `npm audit`: eight moderate findings propagated through the development ESLint/TypeScript-ESLint chain, rooted in minimatch. Suggested complete remediation requires a major configuration downgrade; left for deliberate dependency review.
- Browser visual and interaction checks have not been run. Responsive styling and accessibility primitives are implemented but not browser-verified.

No deployment, commit, merge, or subsequent sprint was performed.
