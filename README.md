# Editorial portfolio

Sprint 03 homepage experience for a Full-stack Software Engineer portfolio. Next.js App Router, TypeScript, Tailwind CSS, and local MDX. Uses Node.js **24.18.0**, pinned in `.nvmrc`, `.node-version`, and `package.json`. Switch to that version before installing.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production checks:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:export
```

`npm run build` exports static files to `out/`. Fonts are bundled locally; no runtime Google Fonts request is required.

## Content

- `src/content/site.ts`: site identity and metadata; unknown details remain null.
- `src/content/projects.ts`: typed project records, empty pending verified material.
- `src/content/introduction.mdx`: build-compiled homepage introduction.
- `content/templates/project.mdx`: authoring prompts, excluded from routes.
- `docs/sprint-01.md`: initial scope, audit, dependencies, and owner inputs.
- `docs/sprint-01-hardening.md`: architecture, content contracts, audit decision, verification, and remaining work.

Keep draft content out of public routes. MDX is executable trusted repository content; never compile untrusted user submissions. Add case study routing in a separately approved sprint.

The unfinished site uses noindex metadata. Before launch, verify all claims, fill identity/contact information, add a production canonical URL and sitemap, and explicitly enable indexing. No domain, email address, employment, or project metrics are fabricated.

## Architecture

Server Components render at build time with `output: 'export'`. There are no APIs, databases, remote content requests, or client components. Shared visual tokens live in `src/app/globals.css`; MDX component mapping lives in `src/mdx-components.tsx`.

Implementation references: [Next.js MDX](https://nextjs.org/docs/app/guides/mdx), [static exports](https://nextjs.org/docs/app/guides/static-exports), and [Tailwind setup](https://tailwindcss.com/docs/installation/framework-guides/nextjs).


## Sprint 01 hardening

The homepage composes `SiteShell`, `Hero`, `SelectedWork`, and `About`. Layout components own navigation and the main landmark; sections own their headings. `ProjectCard` renders published records supplied by `SelectedWork`. All remain Server Components.

CSS separates primitive palette values from semantic surface, text, border, focus, and selection aliases. Tailwind colors reference the semantic aliases. The editorial grid uses four columns below 768px, eight from 768–1023px, and twelve from 1024px.

GitHub Actions uses the pinned Node version and `npm ci`, then runs lint, typecheck, component regression tests, build, and production dependency audit. Development audit findings are reported separately with a documented acceptance decision. CI has not yet been executed on GitHub for these local changes.


## Sprint 02 design system

See [the design audit](docs/sprint-02-design-audit.md) and [implementation/verification report](docs/sprint-02-design-system.md).

`src/app/tokens.css` owns the palette, semantic color roles, space/type scales, layout rhythm and focus/border treatments. `globals.css` applies CSS recipes without global heading styling. Use the small primitives in `src/components/ui` and `src/components/layout`; keep body text in semantic HTML/MDX rather than wrapping every paragraph.

`DisplayHeading` owns the H1. `SectionHeading` defaults to H2, with H3 for project titles. `Eyebrow` supports paragraph or inline metadata. `Container` is shared by home and 404, and `Section` shares the work/about editorial grid. `TextLink` preserves native anchor behavior and an optional decorative arrow; `TechTag` is noninteractive metadata. No Button, standalone Divider, dark mode, feedback system, or client-side design-system runtime is needed by the current pages.

Baseline and final browser evidence is checked in under `docs/evidence/sprint-02/`. These images document human visual review and are not automated pixel baselines. Actual project content is still empty.


## Sprint 03 homepage experience

See [the Sprint 03 report](docs/sprint-03-homepage.md) for evidence, decisions and remaining owner inputs.

The homepage now composes Hero, SelectedWork, EngineeringExpertise and Contact. The three expertise domains and public GitHub link were explicitly confirmed by the owner. Missing identity, employment, case studies, email, LinkedIn and resume remain omitted. The generic About scaffold was removed. Local MDX supplies the expertise introduction.

- `src/content/site.ts` owns hero/site metadata and approved contact destinations; unknown destinations stay null. `getContactLinks` drives both contact rendering and navigation visibility.
- `src/content/expertise.ts` holds the three typed owner-confirmed areas. A null `verifiedOn` excludes an area; no verified areas means no section.
- `getPublishedProjects` remains the single selection source. The first published featured project can be prominent; the actual collection is still empty.
- `npm run verify:export` checks the generated homepage after build for headings, labels, anchor targets, consented contact, noindex and excluded unsupported content. CI runs it after the production build.

Do not infer employment, project completion or public contact consent from account metadata. Review content and verification dates before changing publication fields. No `/work/[slug]`, notes, backend, CMS or contact form exists.
