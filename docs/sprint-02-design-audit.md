# Sprint 02 design audit (DS-01)

Base: `e8cfd54c7e5ad1a37d2a2213da10798132bf85eb`. Reviewed before implementation.

## Inventory and decisions

| Area | Finding | Sprint 02 decision |
| --- | --- | --- |
| Palette | Primitive palette and semantic colors already exist; typography/spacing still repeat raw values | Preserve palette; consolidate tokens in tokens.css and expose Tailwind aliases |
| Typography | Global h1/h2/h3 rules couple semantics to presentation; MDX h2 is manually rendered | Add small DisplayHeading, SectionHeading and Eyebrow recipes; use CSS body defaults |
| Rhythm | Repeated 1/1.5/2/3rem values and independent borders | Shared space scale, layout rhythm, hairline and focus treatment |
| Layout | Container style repeated on home and 404; work/about repeat section structure | Add Container and editorial Section; keep hero as its own semantic section |
| Navigation | Logo targets main; navigation hides underline with only color change on hover | Home link uses `/`; underline on hover/focus and comfortable link targets |
| Interactions | Text links and project links use different presentation; whitespace nowrap risks long labels | Shared wrapping TextLink recipe with decorative arrow; native anchor semantics |
| Cards | Correct publication filtering and stable featured ordering; status already uses words | Preserve behavior/types, add TechTag recipe and shared link/metadata styles |
| Accessibility | Skip link and visible focus exist; small metadata is .65rem with .1em tracking | Slightly larger metadata with restrained tracking; retain focus and heading order |
| Scope | No button action, independent divider, feedback form, or multiple content routes | Do not add unused Button/Divider components, feedback palette, or new routes |

The hero's serif/italic three-line identity, asymmetric offset, paper/ink/forest palette and border-led sections are preserved. No real project records or identity claims are introduced.

## Baseline evidence

Captured from the unchanged base with the in-app Chromium browser. Full-page JPGs are human review evidence, not pixel-test baselines. The Next.js development indicator is framework tooling, not a design element.

- [320px](evidence/sprint-02/baseline-320.jpg)
- [390px](evidence/sprint-02/baseline-390.jpg)
- [768px](evidence/sprint-02/baseline-768.jpg)
- [1024px](evidence/sprint-02/baseline-1024.jpg)
- [1440px](evidence/sprint-02/baseline-1440.jpg)

Implementation and measured verification are recorded separately in `sprint-02-design-system.md` after execution.
