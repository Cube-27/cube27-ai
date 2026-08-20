# Cube27 AI

Static Astro microsite for [ai.cube27.com](https://ai.cube27.com), deployed on Cloudflare Pages.

## Local development

```sh
pnpm install
pnpm dev
```

## Verification

`pnpm verify` runs formatting, linting, Astro type checks, unit tests, the production build, generated-output validation, internal-link checks, and the production dependency audit. Browser checks run with `pnpm test:e2e`; Lighthouse CI runs with `pnpm lighthouse`.

## Deployment

- Runtime: Node 26.7.0
- Package manager: pnpm 11.22.0
- Build command: `pnpm build`
- Output directory: `dist`
- Production branch: `main`
- Cloudflare Pages project: `cube27-ai`

Product constraints are recorded in [PRODUCT.md](./PRODUCT.md). The planned system is in [docs/design-system.md](./docs/design-system.md) and [docs/implementation-plan.md](./docs/implementation-plan.md).
