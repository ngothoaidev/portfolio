# Editorial portfolio

Sprint 04: homepage, work archive and source-backed engineering case studies. Next.js App Router, TypeScript, Tailwind v4, trusted local MDX, Server Components and static export. Node **24.18.0** is pinned in `.nvmrc`, `.node-version` and package engines.

```sh
npm ci
npm run dev
```

Local development: http://localhost:3000. Checks:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:export
npm audit --omit=dev --audit-level=moderate
```

`out/` contains static HTML/assets for `/`, `/work/`, `/work/online-auction/` and 404. No server, database, CMS, runtime content fetch or custom client component is required. Fonts are local. Root noindex remains enabled; no canonical deployment domain is fabricated.

## Content and routing

- `src/content/site.ts`, `expertise.ts`, `introduction.mdx`: owner-confirmed homepage material and approved GitHub contact; unknown identity/contact fields remain absent.
- `src/content/projects.ts`: typed records with separate publication/development state. Online-Auction is published as an impersonal source-audited study of an in-progress implementation, without attributing all code to the portfolio owner.
- `src/content/case-study-index.ts`: finite content-path allowlist and selectors. Cards only link to published registered studies.
- `src/content/project-case-studies.ts`: explicit static MDX imports; no arbitrary import paths or untrusted MDX execution.
- `src/content/project-catalog.ts`, `validate-projects.ts`: build-time validation of duplicate slugs, required metadata, evidence dates/URLs, registered content and actual cover assets. Home/archive/detail all consume this validated catalog.
- `content/projects/online-auction.mdx`: substantive case study. `content/templates/project.mdx` remains an un-routed authoring template.

To add a case study, audit evidence first; add its trusted MDX import and matching path allowlist; then publish the project record. Drafts remain absent. `generateStaticParams` emits only published registered slugs and `dynamicParams=false` rejects unknown slugs. A static host must serve its normal 404 for absent files and may use exported `404.html`; do not configure an SPA catch-all fallback for unknown case studies.

## Design and evidence

`src/app/tokens.css` owns primitive/semantic colors, spacing, type and layout tokens. `globals.css` applies recipes. Shared typography, Container, Section, TextLink and TechTag remain small server-rendered components. Case-study Header, TOC, EvidenceFigure and DecisionBlock support the current content; no heavy syntax or animation library was introduced.

Global navigation uses `/work/`, `/#expertise` and `/#contact` so nested routes work. Archive cards use H2; homepage cards use H3 under their section heading. The case study uses one H1 and ordered H2/H3 headings.

- [Sprint 04 implementation and verification](docs/sprint-04-work-case-studies.md)
- [Online-Auction claim-to-evidence matrix](docs/content-audit-online-auction.md)
- [Sprint 03](docs/sprint-03-homepage.md), [Sprint 02](docs/sprint-02-design-system.md), [Sprint 01](docs/sprint-01-hardening.md)

Screenshots under `docs/evidence/` record actual browser review; they are not pixel-test baselines. The authored SVG in `public/work/` is a source-derived architecture figure, not an invented product screenshot.
