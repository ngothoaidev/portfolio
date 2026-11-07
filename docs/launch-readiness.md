# Draft launch-readiness checklist — no launch authorization

This document records host-dependent and owner-run follow-up from Sprint 07. It does not implement Sprint 08, select a host/domain, deploy, or authorize indexing.

## Host verification still required

- Obtain the explicitly approved production HTTPS origin before adding metadataBase, canonical URLs, absolute social URLs, robots.txt or sitemap. Keep noindex/nofollow until explicit indexing approval.
- Serve `out/` exactly: trailing slash redirects, correct MIME for CSS/JS/SVG/WOFF2/TXT, exported 404.html with **HTTP 404**, and no SPA catch-all returning 200. Test unknown study URLs.
- Preserve all `_next` assets and router `.txt` payload names. `npm run build` normalizes Windows segment aliases. Verify direct loads, client transitions, fragments and browser back after upload; a static-host rewrite cannot be assumed from local results.
- Enable and verify HTTPS before HSTS; choose HSTS lifetime/subdomain policy only for the approved host. No HSTS header has been enabled here.
- Configure X-Content-Type-Options: nosniff, a reviewed Referrer-Policy and host-appropriate CSP. Derive/test a CSP compatible with Next's emitted inline scripts and router payloads; no restrictive untested CSP is added to the application. Check console, page transitions and fonts with final headers.
- Apply immutable long caching to content-hashed `_next/static/` assets; revalidate HTML and unhashed router payloads to avoid mismatched builds. Configure compression and Vary: Accept-Encoding. The loopback preview simulates these choices; deployed behavior is **NOT TESTED**.
- Recheck all external links, privacy/content approvals and production/full dependency audits before launch. HTTP 200 is not a proof of functional demo journeys or uptime.

## Owner-run assistive test — NOT TESTED in this environment

Narrator 10.0.26100.8972 was started and its introductory window was observed. Edge 156.0.4314.58 was available, but Computer Use stopped before a pairing test because it could not confidently determine Edge's URL. No spoken landmark, heading, link or figure announcement was captured. The process cleanup attempt returned Access denied; Narrator may remain open. Use **Ctrl+Windows+Enter** to toggle Narrator off if necessary.

1. Start NVDA with Firefox/Chrome, or Narrator with Edge. Record software/browser versions and reading mode.
2. Open the production export preview. From browser chrome, Tab to Skip to content; Enter should focus main and reading should begin with the main heading.
3. Use heading and landmark shortcuts to review Home, About, Work and the case study. Expect one H1 per route, a main landmark, distinct navigation labels and logical H2/H3 order.
4. Review links by name. Follow the flagship study, a TOC link, nested Expertise/Contact links and Back. Confirm focus and reading position make sense without a mouse.
5. At the case-study figure, listen to region/image/caption announcements. Its region currently repeats the alt as a label; decide with actual speech whether the duplicate wording is burdensome before changing semantics. No fabricated screen-reader result is recorded.
6. Confirm no trap across header, CTA, cards, TOC, source citations, figure region and contact. Enter activates links; Space should scroll rather than pretending links are buttons.
7. Record observed announcements and defects. Automated axe zero violations is not a replacement for this check.

## Native zoom / browser chrome — NOT TESTED

Use a 1280px-wide desktop browser window. From its menu set 200% and 400%, record the percentage and CSS viewport width, then repeat every route. Confirm readable text, visible focus, no lost content, and one-dimensional scrolling at 320 CSS px. Reset zoom to 100%. The automated audit verified 640/320 CSS viewport reflow equivalents; it did **not** exercise native browser zoom controls or navigation from browser chrome. Those controls were unavailable after Computer Use stopped.

WebKit 27.2 on Windows rendered all routes, loaded assets and passed click/back/fragment checks. Tab and Alt+Tab did not focus even ordinary links in an isolated probe; its keyboard traversal is **NOT TESTED**. Verify Safari with its normal full keyboard access setting on an actual supported platform. Physical devices and installed Safari are also **NOT TESTED**.

## Content and launch blockers

Existing `owner-inputs.md` remains authoritative: public identity/bio, education, employer/date/contribution publication permission, individual project ownership, additional approved contact strategy, redacted resume and product screenshot provenance remain unresolved. Noindex is retained. No field Core Web Vitals or INP exists without real user data; repeat lab measurements on the approved host before drawing deployment conclusions.

Narrator shortcut reference: [Microsoft keyboard commands](https://support.microsoft.com/en-gb/accessibility/windows/narrator/appendix-b-narrator-keyboard-commands-and-touch-gestures).
