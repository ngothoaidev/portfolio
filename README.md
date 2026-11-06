# Editorial portfolio

Sprint 01 foundation for a Full-stack Software Engineer portfolio. Next.js App Router, TypeScript, Tailwind CSS, and local MDX. Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production checks:

```sh
npm run lint
npm run typecheck
npm run build
```

`npm run build` exports static files to `out/`. Fonts are bundled locally; no runtime Google Fonts request is required.

## Content

- `src/content/site.ts`: site identity and metadata; unknown details remain null.
- `src/content/projects.ts`: typed project records, empty pending verified material.
- `src/content/introduction.mdx`: build-compiled homepage introduction.
- `content/templates/project.mdx`: authoring prompts, excluded from routes.
- `docs/sprint-01.md`: scope, audit, dependencies, and owner inputs.

Keep draft content out of public routes. MDX is executable trusted repository content; never compile untrusted user submissions. Add case study routing in a separately approved sprint.

The unfinished site uses noindex metadata. Before launch, verify all claims, fill identity/contact information, add a production canonical URL and sitemap, and explicitly enable indexing. No domain, email address, employment, or project metrics are fabricated.

## Architecture

Server Components render at build time with `output: 'export'`. There are no APIs, databases, remote content requests, or client components. Shared visual tokens live in `src/app/globals.css`; MDX component mapping lives in `src/mdx-components.tsx`.

Implementation references: [Next.js MDX](https://nextjs.org/docs/app/guides/mdx), [static exports](https://nextjs.org/docs/app/guides/static-exports), and [Tailwind setup](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
