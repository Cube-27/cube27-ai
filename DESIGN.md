---
name: CUBE27 AI
description: A light field of tinted surfaces without borders, carrying the four hues of the CUBE27 mark, punctuated by full-bleed dark bands.
colors:
  canvas: "#ffffff"
  band: "#eef1f8"
  band-deep: "#e2e8f4"
  ink: "#0c1024"
  ink-2: "#414a63"
  ink-3: "#5f6884"
  dark: "#0a0d16"
  dark-2: "#151a2a"
  dark-3: "#1e2436"
  dark-ink: "#f2f4fa"
  dark-ink-2: "#a8b0c6"
  accent: "#a91d4b"
  accent-hover: "#87153c"
  accent-soft: "#fbecf1"
  accent-dark: "#f2789f"
  hue-blue: "#0872ba"
  hue-green: "#0b7a3c"
  hue-indigo: "#33348f"
  hue-purple: "#6d3d80"
typography:
  display:
    fontFamily: '"Geist Variable", Geist, system-ui, sans-serif'
    fontSize: "clamp(30px, 4vw, 56px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.038em"
  headline:
    fontFamily: '"Geist Variable", Geist, system-ui, sans-serif'
    fontSize: "clamp(24px, 2.9vw, 40px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  title:
    fontFamily: '"Geist Variable", Geist, system-ui, sans-serif'
    fontSize: "clamp(18px, 1.7vw, 24px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.026em"
  lead:
    fontFamily: '"Inter Variable", Inter, system-ui, sans-serif'
    fontSize: "clamp(16px, 1.2vw, 18px)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: '"Inter Variable", Inter, system-ui, sans-serif'
    fontSize: "clamp(14px, 1vw, 16px)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  eyebrow:
    fontFamily: '"Inter Variable", Inter, system-ui, sans-serif'
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "26px"
  2xl: "40px"
  3xl: "68px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
    height: "50px"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
    height: "50px"
  button-quiet:
    backgroundColor: "rgb(12 16 36 / 0.06)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
    height: "50px"
  product-card:
    backgroundColor: "var(--card-soft)"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(28px, 3.2vw, 54px)"
  capability-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "clamp(24px, 2.2vw, 32px)"
---

# Design System: CUBE27 AI

## Overview

**Creative North Star: "Surfaces, not boxes."**

CUBE27 AI reads as a sequence of coloured planes. Structure comes from tonal
shifts between adjacent surfaces and from generous space — never from hairline
borders. A card is a card because it sits on a different surface than the thing
behind it. Product interfaces, not AI symbolism, carry the meaning.

The field is light: white canvas, pale blue-grey bands, and four muted product
tints. It is punctuated by full-bleed near-black bands with rounded shoulders
that mark the shift from explanation to conviction — the production philosophy,
each product's closing statement, the final call, and the footer.

**Key characteristics:**

- Light, borderless, generously spaced; depth is tonal, not shadowed.
- One accent — the crimson of the CUBE27 `27` — reserved for action.
- Four product hues, each drawn from a quadrant of the CUBE27 mark.
- Large Geist headlines over calm Inter explanation. No third face.
- Motion that is felt rather than watched, and which costs no JavaScript.
- The landing page opens on a drawn field of drifting light rather than a
  photograph, with the proposition centred on top of it.

## Colors

### Field

- **Canvas** `#ffffff` — the default plane, and the surface of cards that sit on
  a tinted band.
- **Band** `#eef1f8` and **Band Deep** `#e2e8f4` — pale blue-grey planes that
  separate sections without a rule.
- **Dark** `#0a0d16`, with **Dark 2/3** for raised cards inside a dark band.

### Ink

`ink` for headings and emphasis, `ink-2` for paragraphs, `ink-3` for supporting
detail. On dark bands, `dark-ink` and `dark-ink-2` take those roles.

**Every pairing in this system clears WCAG AA at its intended size.** `ink-3`
was darkened specifically so it survives on `band`, not only on canvas. Check
any new pairing against the surface it will actually sit on, not against white.

### Action

**Accent** `#a91d4b` is the crimson of the `27` in the parent mark. On dark
bands it lifts to `accent-dark` `#f2789f`, because the base crimson only reaches
2.7:1 there.

**The Accent Rarity Rule.** Accent means action or active state: primary
buttons, text links, eyebrows, focus rings. It is never a decorative fill and
never carries paragraph text.

### Product hues

Each product owns one quadrant hue of the CUBE27 cube — `blue`, `green`,
`indigo`, `purple` — exposed through `data-hue` as `--card-soft`, `--card-mid`
and `--card-deep`. The soft tint is the card and hero surface, the mid is used
in the product illustration, the deep is used for the product's name and links.

**The Hue Ownership Rule.** A hue belongs to its product everywhere it appears:
homepage card, page hero, capability hover, workflow pills. Crimson is never a
product hue, so action never competes with identity.

## Typography

**Display:** Geist Variable. **Body:** Inter Variable. There is no third face,
no monospace, and no italic in the system.

### The ladder

Every size in the system comes from one ladder of even pixel values, declared as
tokens in `:root`. **There are no ad-hoc font sizes** — `grep "font-size:"` over
`globals.css` should return nothing but `var(--t-*)`.

| Token    | Value | Used for                                                |
| -------- | ----- | ------------------------------------------------------- |
| `--t-12` | 12px  | eyebrows, capability numbers, mobile nav labels         |
| `--t-14` | 14px  | small print, tags, breadcrumbs, header CTA, footer base |
| `--t-16` | 16px  | body base, nav links, buttons, text links, footer links |
| `--t-18` | 18px  | top of the lead and h4 ranges                           |
| `--t-20` | 20px  | the wordmark                                            |
| `--t-24` | 24px  | top of the h3 range                                     |
| `--t-40` | 40px  | top of the h2 range                                     |
| `--t-56` | 56px  | top of the display range                                |

Fluid steps interpolate between rungs: `--t-display` `clamp(30px, 4vw, 56px)`,
`--t-h2` `clamp(24px, 2.9vw, 40px)`, `--t-h3` `clamp(18px, 1.7vw, 24px)`,
`--t-h4` and `--t-lead` `clamp(16px, 1.2vw, 18px)`, `--t-body`
`clamp(14px, 1vw, 16px)`.

The display cap is 56px because the heroes are half-width columns: above that,
a 45-character headline breaks to four lines. Any change to `--t-display`
should be checked against the longest product headline, not the shortest.

Geist states, Inter explains. Headings run 500 weight with tight negative
tracking; body runs 400 at 1.6 line height. Eyebrows are Inter 600 at 13px with
a short accent rule drawn by `::before` — the one place small type carries
accent colour.

**The Two-Voice Rule.** Do not introduce a third family, and do not set body
copy in Geist or headings in Inter. The wordmark is the one deliberate
exception: it is Inter 800, not Geist, so the lockup reads as a mark rather
than as a heading.

## Layout

`.shell` centres content at `1360px` with `--pad-x: clamp(20px, 5vw, 72px)`.
`.band` supplies `clamp(72px, 8vw, 132px)` vertical rhythm and takes one of four
surface modifiers: `--canvas`, `--tint`, `--deep`, `--dark`. `--round-top` and
`--round-bottom` add the 28px shoulder where a dark band meets the light field.

**The homepage runs a deepening ramp** — canvas, tint, deep, dark — so the page
darkens as it moves from what we make, to how it works, to the call to act.
Reordering bands should preserve that direction.

**`SectionHead` is the only container for a heading + subtitle pair**, on every
page and in every band. It owns the eyebrow, the headline measure (`26ch`, set
in `ch` so it scales with the heading's own size), the lead, the alignment and
the spacing between them. Anything that follows the pair — buttons, extra copy —
goes in its default slot and inherits the same alignment. No page defines its
own heading measure.

It defaults to centred; `align="start"` is for the two heroes, the final call
and each product's closing statement, whose copy is paired with something beside
it rather than stacked above it. `.cap-outro` and `.p-flow` centre with the
heads they follow. The lead is not metered — it fills the container, which is
`92ch` by default and unbounded with `wide`.

Breakpoints:

- **1080px** — desktop nav and header CTA give way to the popover menu; the
  hero, product hero, problem split, CTA and adapt blocks become one column;
  the capability grid drops from four columns to two.
- **940px** — product split cards stack, media first regardless of alternation.
- **620px** — band rhythm tightens, buttons go full width, the capability grid
  becomes one column, the footer stacks.

Stability is required at 320px and at 200% zoom. No page may scroll
horizontally at any width; this is asserted in the e2e suite across six
viewports on all five routes.

## Elevation & Depth

Flat by default. Shadows appear only in motion — the hover lift on cards and
buttons, the header's scroll-driven hairline, the floating nav and mobile
panels. Product illustrations sit as white cards inside a tinted product card,
which is the primary depth cue in the system.

## Shapes

Rounded throughout: `14px` on cards, `20px` on large panels, `28px` on band
shoulders, and full pills on every button, tag and workflow step. The previous
system's zero-radius square language is retired and must not return.

## Components

### Shell

- `Layout.astro` owns head metadata, per-route canonical and JSON-LD, the two
  font preloads, the skip link, `Header` and `Footer`. Pages supply only their
  bands.
- `Header.astro` takes no props. Desktop shows a hover/focus Products menu;
  below 1080px a popover panel replaces it. **The mobile menu is a native
  `popover`**, which supplies outside-click dismissal, Escape and focus handling
  with no script.
- `Footer.astro` closes the dark run that begins at the final CTA.

### Primitives

- `Button.astro` — `href`, `variant` (`primary`, `secondary`, `quiet`,
  `on-dark`, `ghost-dark`), `arrow`. Minimum height 50px, 44px in the header.
- `TextLink.astro` — `href`, `stretch`. The underline draws in from the left on
  hover and the arrow travels up-right. `stretch` makes the whole card
  clickable via `::after`, so the card needs no nested interactive elements.
- `SectionHead.astro` — `eyebrow`, `title`, `lead`, `level`, `wide`.
- `Icon.astro` — a typed `name` from `src/lib/icons.ts`. Unknown names fail at
  build time. Icons are decorative and always `aria-hidden`.

### Product visuals

`src/components/visuals/` holds four inline-SVG compositions — a visibility
board, a change feed, a reconciliation ladder, a tender document with extracted
requirements — plus `ProductVisual.astro`, which maps a product's `visual` key
to one of them. They read the active `data-hue`, so each renders in its
product's colour.

They carry no `label` on the homepage, where the adjacent copy already says
everything, and take one on the product hero, where the illustration is the
subject. **Never place essential copy only inside one of these.**

### Bands and cards

- `.product-card` is a full-width split; `--flip` alternates which side carries
  the visual. Every product gets equal weight and no row is left with an orphan.
- `.site-footer__top` puts the brand on the left and pushes both link columns to
  the right, aligned to the shell edge so they line up with the base row.
- `.cap-grid` is four columns with the first card spanning two and rendered
  dark, so seven cards fill two rows exactly with one deliberate focal surface.
  Its cards are white on the deep band — the one section where the cards, not
  the band, carry the lightest surface — and each is numbered `01`–`07`.
- `.p-caps` is `auto-fit` independent cards, because capability counts differ
  per product and a part-filled last row must still look intentional.

## Motion

**First-party JavaScript is a budget, not a ban.** The site ships exactly one
bundled module — six lines that close the mobile menu when a link inside it
only changes the hash, which the popover API cannot do on its own. The e2e
suite asserts that this module is the only one and that it stays under 1 KB.
Nothing is ever inlined, so the CSP still needs no `unsafe-inline`.

- The hero field is four bundles of drifting strands, each a layer holding two
  tiles of a wave that repeats exactly once per tile. Sliding a layer left by
  half its own width returns it to where it started, so the loop has no seam.
  Only `transform` animates, so the compositor carries the whole field and no
  frame repaints.
- Section entry uses `animation-timeline: view()` behind an `@supports` guard.
  Where the timeline is unsupported, content simply renders at rest — there is
  no hidden state to get stuck in and no flash.
- The header's hairline uses `animation-timeline: scroll()`.
- `data-reveal-delay` staggers a group by shifting `animation-range`, not by
  `animation-delay`, which has no meaning on a scroll timeline.
- Hover lifts, the text-link underline draw, and the popover's
  `@starting-style` entry are ordinary transitions.
- `prefers-reduced-motion: reduce` collapses all of it to 0.01ms and disables
  smooth scrolling. The reveal timelines are additionally scoped inside a
  `no-preference` query, so they never run at all, and the hero field settles
  into the still composition it is drawn for.

## Accessibility

Target is WCAG 2.2 AA, and the e2e suite runs axe against every route at those
tags. Keep semantic landmarks, one `h1` per page, the skip link, visible
`:focus-visible` rings (accent on light, `accent-dark` on dark), 44px minimum
touch targets, empty `alt` on decorative imagery, and the `forced-colors`
overrides that restore borders to borderless cards.

## Do's and Don'ts

### Do

- **Do** express structure with a surface change and space before reaching for
  anything else.
- **Do** check a new colour pairing against the surface it will actually sit on.
- **Do** extend `.band`, `.shell`, `SectionHead`, `Button`, `TextLink` and the
  card vocabulary before adding a new primitive.
- **Do** keep new motion CSS-only, guarded by `@supports`, and inert under
  reduced motion.
- **Do** record new tokens and components in this file and in
  `.impeccable/design.json`.

### Don't

- **Don't** add borders as a structural device, or return to zero-radius boxes.
- **Don't** use crimson as decoration, or a product hue as an action colour.
- **Don't** add an inline `style` attribute or an inline `<script>` — the CSP
  blocks both, and `validate-build` fails the build on either.
- **Don't** introduce a third font family, a monospace face, or italics.
- **Don't** show brains, glowing network nodes, robots or generic purple AI
  gradients. The imagery is material and the illustrations are interfaces.
- **Don't** expose the internal build names behind the four product systems.
