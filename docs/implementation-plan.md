# Cube27 AI Astro Microsite Plan

## Summary

Build `https://ai.cube27.com` as a static Astro 7 microsite deployed through
Cloudflare Pages. Preserve the demo's exact content, section order, control-room
visual direction, and interactions; only normalize typography, spacing,
responsive behavior, accessibility, and reusable design-system rules.

The implementation begins with `docs/design-system.md`, this plan, and
`PRODUCT.md`. No application code is created before those records exist.

## Implementation changes

- Scaffold Astro with TypeScript, Tailwind CSS v4, `@astrojs/sitemap`,
  `schema-dts`, Sharp, ESLint, Prettier, Playwright, axe, and Lighthouse CI.
  Use static output without a Cloudflare adapter or React hydration.
- Build Astro components for the layout, navigation, hero, engineering posture,
  production patterns, product systems, delivery path, final CTA, and footer.
  Keep all demo wording unchanged and centralize it in typed readonly data.
- Preserve the desktop and mobile composition: graphite field, signal rail,
  asymmetric hero, cyan topology imagery, telemetry panels, square modules,
  product grid, delivery trace, and restrained motion. Remove Manus-specific
  code, branding, dependencies, analytics, and runtime assets.
- Use Space Grotesk for display, Geist for body copy, and JetBrains Mono for
  telemetry, self-hosted as Latin variable WOFF2 assets.
- Reuse the three approved demo images as local source assets and generate
  responsive AVIF/WebP variants. Preload the hero and lazy-load later imagery.
- Copy the parent site's transparent Cube27 logo and mark. Create a dark-surface
  variant by changing only the neutral `CUBE` pixels to the light foreground;
  preserve the cube, magenta `27`, geometry, proportions, and transparency.
- Keep CTA wording unchanged and route primary actions to the parent contact
  page with consistent AI-site UTM parameters. Link parent legal pages.
- Treat CSS tokens and shared Astro components as the stable interface for
  future pages. Generate implementation-grounded `DESIGN.md` after review.

## SEO, AEO, performance, and Cloudflare

- Configure `https://ai.cube27.com`, the exact demo title and description,
  canonical, robots, Open Graph, Twitter Card, favicon, manifest, and a local
  1200x630 social preview.
- Generate truthful Organization, WebSite, WebPage, Service, OfferCatalog, and
  ItemList JSON-LD using only visible content and parent organization facts.
- Generate `/robots.txt`, `/llms.txt`, `/llms-full.txt`, sitemap index, and a
  `/sitemap.xml` redirect from the same typed content source. Allow normal and
  approved answer-engine crawlers including OAI-SearchBot.
- Deliver no first-party hydration JavaScript. Use native/CSS navigation and
  progressive motion with reduced-motion fallbacks. Load parent GA4
  `G-B2GPL54QD9` asynchronously through a local external initializer.
- Target LCP <=2.5s, INP <=200ms, and CLS <=0.1 at the 75th percentile.
- Add Cloudflare security/cache headers, Node 26.7.0, pnpm 11.22.0, and a static
  Pages configuration using production branch `main`, `pnpm build`, and `dist`.
- Configure `ai.cube27.com`, noindex the Pages hostname, and submit the sitemap
  after DNS/TLS is active.

## Verification and release

- `pnpm verify` runs formatting, linting, Astro checks, tests, build, generated
  output validation, link checking, and production dependency audit.
- Validate exact metadata, JSON-LD, sitemap, robots/LLM manifests, heading order,
  and absence of Manus URLs, React hydration, Framer Motion, and remote assets.
- Run Playwright/axe at 390x844, 768x1024, 1050/1051 boundaries, and 1440x1000;
  cover keyboard, mobile navigation, anchors, CTAs, reduced motion, zoom, touch
  targets, and overflow.
- Require Lighthouse >=95 Performance and 100 Accessibility, Best Practices,
  and SEO, with no first-party hydration and mobile initial transfer below
  450KB excluding analytics.
- Compare desktop and mobile screenshots with the demo, run the Impeccable
  detector and independent finish review, then record `DESIGN.md`.
- Add `origin`, commit the verified site, push `main`, run GitHub Actions, connect
  Cloudflare Pages, and verify the production hostname and response headers.

## Assumptions

- V1 is an English-only single page with no CMS, contact backend, or SSR routes.
- The demo design, copy, products, and three technical images are approved for
  public reuse.
- Only typography consistency, reusable-system extraction, the transparent
  logo treatment, removal of Manus branding, and the CTA destination may differ.
- Cube27 AI is part of the existing Cube27 legal organization.
- SEO/AEO work improves truthful discoverability but cannot guarantee rankings,
  citations, or rich-result placement.
