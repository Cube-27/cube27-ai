# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 static site, TypeScript, Tailwind CSS v4, and Cloudflare Pages. No
client framework and no first-party JavaScript in the shipped output.

## Users

Buyers evaluating whether CUBE27 can build or adapt an AI system for a specific
operational workflow. Business, operations, commerce, marketing and technical
stakeholders read the same pages; the copy does not fork by persona.

## Product Purpose

Show that CUBE27 builds AI products for complex operational work. Four product
systems lead, seven production capabilities explain how they stay reliable, and
one shared philosophy connects them. Success is a qualified visitor reaching the
parent CUBE27 contact page with a workflow in mind.

## Positioning

CUBE27 builds focused AI systems for workflows where teams spend too much time
collecting information, reconciling data, reviewing documents or figuring out
what changed — and adapts those systems to how a customer's team already works.

## Operating Context

Five routes: the homepage plus one page per product system. Capabilities and
the production philosophy are homepage sections with stable anchors, so either
can become a standalone page later without changing its link target.

## Capabilities and Constraints

- English-only static site at `https://ai.cube27.com`.
- No CMS, contact backend, authentication, accounts, or request-time data.
- All conversation CTAs route to the parent CUBE27 contact page with UTM
  parameters. There is no on-site form.
- The Content-Security-Policy in `public/_headers` allows neither inline styles
  nor inline scripts. `validate-build` fails the build on either.
- The site must remain fully usable with JavaScript disabled.
- Technical SEO/AEO output (`llms.txt`, `llms-full.txt`, JSON-LD, sitemap) is
  generated from the same typed content model as the pages.

## Brand Commitments

- CUBE27 AI is part of CUBE27, not a separate legal organization.
- The CUBE27 mark is used unmodified. Its crimson is the site's action colour
  and its four quadrant hues are the four product hues.
- Geist is the display face and Inter is the body face. There is no third face
  and no monospace.
- The four product systems are presented under generic names. The internal
  build names behind them are never exposed; this is enforced in the unit
  tests, the e2e suite, and `validate-build`.

## Evidence on Hand

- Four shipped internal systems provide the capability lists, workflows and
  operational detail behind the four public product systems.
- Parent brand, organization, SEO and Cloudflare reference: `C:\Projects\cube27`.
- Abstract imagery is generated in-repo by `scripts/generate-art.mjs` and is
  deterministic by seed. External replacements can be dropped into
  `src/assets/images/`; briefs are in `docs/image-briefs.md`.

## Product Principles

- Lead with what we make, then explain how it stays reliable.
- Show the workflow before describing it: every product carries an illustration
  of its own interface.
- Keep page copy, structured data and crawler manifests generated from one
  source so they cannot drift.
- Ship no client JavaScript unless a requirement genuinely cannot be met in
  HTML and CSS.
- Build shared primitives so a new page extends the system rather than
  restating it.

## Deferred

**Proof** and **About** are not part of the site. There is no case-study or team
content to put on them, and an empty page would weaken the story rather than
complete it. Navigation links appear when the pages exist.

## Accessibility & Inclusion

WCAG 2.2 AA, verified by axe across all five routes in the e2e suite and by
Lighthouse at a required score of 100. Keyboard navigation, visible focus,
reduced-motion support, 44px touch targets, semantic landmarks, one `h1` per
page, no horizontal scroll at any width from 320px up, and stability at 200%
zoom.
