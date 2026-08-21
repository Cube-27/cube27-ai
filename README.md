# CUBE27 AI

Static Astro site for [ai.cube27.com](https://ai.cube27.com), deployed on
Cloudflare Pages. Five routes: the homepage and one page per product system.

The site ships **no first-party JavaScript**. Section reveals, the sticky
header and the mobile menu are all CSS or native platform features. See
[docs/rebuild.md](./docs/rebuild.md) for why.

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

Abstract art is generated in-repo and is deterministic by seed:

```sh
node scripts/generate-art.mjs          # rewrites the hero and social preview
ART_SEED=1234 node scripts/generate-art.mjs   # sample a different composition
```

To use externally generated renders instead, see
[docs/image-briefs.md](./docs/image-briefs.md) for paste-ready prompts, the
palette, and the swap procedure.

## Verification

`pnpm verify` runs formatting, linting, Astro type checks, unit tests, the
production build, generated-output validation, internal-link checks, and the
production dependency audit.

`pnpm test:e2e` runs the Playwright suite: axe accessibility audits and
horizontal-overflow checks on every route across six viewports, navigation
behaviour, a no-JavaScript pass, and a guard that no first-party script ships.

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
- [docs/image-briefs.md](./docs/image-briefs.md) — prompts for external imagery
