# CUBE27 AI

Static Astro site for [ai.cube27.com](https://ai.cube27.com), deployed on
Cloudflare Pages. Five routes: the homepage and one page per product system.

The site ships **one 147-byte module** of first-party JavaScript, and nothing
else. Section reveals, the header's colour shift on scroll and opening the mobile
menu are all CSS or native platform features. See
[docs/rebuild.md](./docs/rebuild.md) for why, and for the one case that needed
a script.

## Local development

```sh
pnpm install
pnpm dev
```

## Content

All page copy lives in typed modules under `src/data/` — `products.ts`,
`capabilities.ts`, `home.ts`, `site.ts`. Pages, JSON-LD, `llms.txt` and
`llms-full.txt` are all generated from those, so they cannot drift apart.

## Imagery

The homepage opens on a full-bleed architectural photograph,
`src/assets/images/hero-architecture.jpg`, served through Astro's `<Picture>`
in AVIF and WebP. `public/social-preview.jpg` is a 1200x630 crop of the same
frame, so the share card and the first viewport show one image.

Replacing the hero means replacing both: drop the new frame into
`src/assets/images/`, point `Hero.astro` at it, and re-crop the preview.

## Verification

`pnpm verify` runs formatting, linting, Astro type checks, unit tests, the
production build, generated-output validation, internal-link checks, and the
production dependency audit.

`pnpm test:e2e` runs the Playwright suite: axe accessibility audits and
horizontal-overflow checks on every route across six viewports, navigation
behaviour, a no-JavaScript pass, and a guard that only `analytics.js` and the
menu module ship as first-party scripts.

`pnpm lighthouse` runs all five routes and requires 100 for accessibility,
best practices and SEO, and 95+ for performance.

## Deployment

- Runtime: Node 26.7.0
- Package manager: pnpm 11.22.0
- Build command: `pnpm build`
- Output directory: `dist`
- Production branch: `main`
- Cloudflare Pages project: `cube27-ai`

The Content-Security-Policy in `public/_headers` allows neither inline styles
nor inline scripts; `validate-build` fails the build on either.

## Documents

- [DESIGN.md](./DESIGN.md) — the design system and its rules
- [PRODUCT.md](./PRODUCT.md) — product constraints and commitments
- [docs/rebuild.md](./docs/rebuild.md) — what was rebuilt and why
