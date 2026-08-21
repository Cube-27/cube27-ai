# CUBE27 AI — Rebuild

The site was rebuilt from scratch. Nothing from the previous build survives
except the toolchain, the deployment configuration, and the CUBE27 mark itself.
This is the record of what was built and why; `DESIGN.md` and `PRODUCT.md` are
the living documents from here.

## What changed

The old site was a single dark page — the "Inference Control Room": midnight
graphite, cyan signal, hairline borders, zero radius, monospace telemetry, a
fixed signal rail, an ambient grid, and product proof reduced to four small
cards at the bottom behind a wall of RAG/fine-tuning/caching language. It read
as an AI engineering consultancy.

The new site leads with what CUBE27 makes.

|           | Before                                 | After                    |
| --------- | -------------------------------------- | ------------------------ |
| Routes    | 1                                      | 5                        |
| Story     | Engineering posture first              | Product systems first    |
| Field     | All dark                               | Light, with dark bands   |
| Structure | 1px borders, zero radius               | Tinted surfaces, rounded |
| Type      | Space Grotesk + Geist + JetBrains Mono | Geist + Inter            |
| Accent    | Cyan `#5ee8ff`                         | CUBE27 crimson `#a91d4b` |
| Client JS | Reveal + header + menu scripts         | One bundled menu module  |

## Decisions

| Question       | Decision                                               |
| -------------- | ------------------------------------------------------ |
| Scope          | Homepage + 4 product pages                             |
| Product naming | Generic only; internal build names never exposed       |
| Theme          | Light-first, punctuated by full-bleed dark bands       |
| Imagery        | Generated abstract art + inline-SVG product interfaces |
| Fonts          | Geist headings, Inter body. No mono, no third face     |
| Proof / About  | Deferred — no content exists for them                  |

## Information architecture

```
/                                    Homepage
/products/ai-visibility/             AI Visibility & Growth Intelligence
/products/commerce-intelligence/     Commerce Intelligence & Monitoring
/products/supplier-operations/       Supplier Order Operations
/products/bid-operations/            Bid & Proposal Operations
```

Nav: `Products ▾ | Capabilities | How we build | Start a conversation`

The old site was one page with hash anchors, so there was no URL debt to
redirect. Capabilities and How we build are homepage sections with stable
anchors (`/#capabilities`, `/#how-we-build`) and can be promoted to standalone
pages later without changing their link targets.

All CTAs route to `https://www.cube27.com/contact/` with UTM parameters. There
is no on-site form; the deploy is static and the CSP's `form-action` already
anticipated that destination.

## Homepage

1. **Hero** — "AI products for complex operational work." Two actions, and the
   generated abstract field.
2. **Product systems** — the largest section. Four full-width split cards,
   alternating which side carries the visual. Each owns a hue from the CUBE27
   mark and carries an illustration of its own interface.
3. **Seven capabilities** — renamed to outcome language (Grounded Retrieval,
   Model Adaptation, Performance & Cost Control, Controlled Automation, Human
   Feedback Loops, Agent Evaluation, AI Observability). Four-column grid with
   the first card spanning two and rendered dark.
4. **One production philosophy** — the connecting section. Four steps on a dark
   band with a rounded shoulder.
5. **Final call** — continues the dark run into the footer.

## Product pages

One data-driven template: hero with the product's illustration → problem framing
→ core capabilities → workflow strip → "Built by CUBE27, adaptable to your
workflow" → closing statement on a dark band. All copy is per-product content in
`src/data/products.ts`.

## Imagery

**The hero field** is drawn, not photographed: `HeroField.astro` emits four
bundles of fine bezier strands, fanned and pinched along a shared curve, and
lets them drift across the full width of the landing page behind the centred
proposition. Each strand is a sum of sines with whole-number cycle counts, so a
layer tiles seamlessly and the motion is one composited `transform`.

**The social preview card** is still raster, generated in-repo by
`scripts/generate-art.mjs` and deterministic by seed. The same script still
writes the retired hero raster, which nothing imports.

**Product illustrations** are inline SVG, not screenshots: a visibility board, a
change feed, a reconciliation ladder, a tender document with extracted
requirements. They read the active `data-hue`, weigh nothing, and stay crisp at
any density. They are honest compositions of real workflow shapes.

## Almost zero JavaScript

The site ships one bundled module, 147 bytes. This started as a CSP problem —
the policy allows neither inline scripts nor inline styles, and Astro was
inlining the header script — and became a better answer than the one it
replaced:

- **Section reveals** use `animation-timeline: view()` behind an `@supports`
  guard. Unsupported browsers render content at rest; there is no hidden state
  to get stuck in and no flash.
- **The sticky header's hairline** uses `animation-timeline: scroll()`.
- **The mobile menu** is a native `popover`, which supplies outside-click
  dismissal, Escape, and focus handling for free. The one thing it cannot do is
  close on a link that only changes the hash: that never unloads the document,
  so the panel would stay in the top layer over the section it just jumped to.
  `popovertarget` is not allowed on an anchor, so this is the single case that
  earned a script. It is bundled, never inlined, and the CSP is untouched.
- **The hero field** is four bundles of SVG strands drifting on `transform`
  alone, each layer holding two tiles of a wave that repeats once per tile, so
  translating it by exactly one tile loops without a seam.
- **The products menu** opens on `:hover` and `:focus-within`.

This is asserted, not assumed: one e2e test fails if any first-party script
beyond `analytics.js` and that one module is requested, or if the module grows
past 1 KB, and another exercises the site with JavaScript disabled.

## Verification

`pnpm verify` runs format, lint, type check, unit tests, build, build
validation, link check and dependency audit. `pnpm test:e2e` runs 20 Playwright
tests. `pnpm lighthouse` runs all five routes.

Current state: **all five routes score 100 for performance, accessibility,
best practices and SEO.**

Guards worth knowing about, because they will fail a build:

- `validate-build` rejects an inline `style` attribute or inline `<script>` on
  any route — both are CSP violations that Lighthouse catches as console errors.
- Three separate layers reject the internal build names: unit tests on the
  content model, e2e on rendered text, `validate-build` on HTML and the crawler
  manifests.
- `validate-build` rejects any reference to Space Grotesk or JetBrains Mono.
- The compiled stylesheet has an 88 KB budget.
- axe runs against all five routes at WCAG 2.2 AA tags.
- No route may scroll horizontally at any of six viewports from 360px up.

## Deferred

**Proof** and **About**. The redesign brief lists both in the navigation but
supplies no copy for either, and the repo holds no case studies, outcome metrics
or team content. Shipping empty shells would weaken the story rather than
complete it. Proof is the weakest link in the narrative until real outcomes
exist to put on it — that is the next content problem to solve, not a build
problem.
