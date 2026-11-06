# Editorial portfolio

Sprint 01 foundation for a Full-stack Software Engineer portfolio. Next.js App Router, TypeScript, Tailwind CSS, and local MDX. Uses Node.js **24.18.0**, pinned in `.nvmrc`, `.node-version`, and `package.json`. Switch to that version before installing.

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
