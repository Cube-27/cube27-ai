---
name: CUBE27 AI
description: A light field of tinted surfaces without borders, carrying the four hues of the CUBE27 mark, punctuated by full-bleed dark bands.
colors:
  canvas: "#ffffff"
  band: "#eef1f8"
  band-deep: "#e2e8f4"
  hero: "#eef1f8"
  ink: "#0c1024"
  ink-2: "#414a63"
  ink-3: "#5f6884"
  dark: "#0a0d16"
  dark-2: "#151a2a"
  dark-3: "#1e2436"
  dark-ink: "#f2f4fa"
  dark-ink-2: "#a8b0c6"
  dark-ink-3: "#767f99"
  s-3: "#d6def0"
  s-dark-1: "#232733"
  s-dark-2: "#2f3442"
  s-dark-3: "#3a4054"
  accent: "#a91d4b"
  accent-hover: "#87153c"
  accent-soft: "#fbecf1"
  accent-dark: "#f2789f"
  hue-blue: "#0872ba"
  hue-green: "#0b7a3c"
  hue-indigo: "#33348f"
  hue-purple: "#6d3d80"
typography:
  fontFamily: '"Geist Variable", Geist, system-ui, sans-serif'
  scale: [13, 14, 15, 16, 17, 18, 20, 23, 26, 30, 34, 40, 44, 54]
  breakpoints: { phone: 0, tablet: 640, desktop: 1080 }
  display:
    fontSize: { phone: "34px", tablet: "44px", desktop: "54px" }
    lineHeight: { phone: "40px", tablet: "48px", desktop: "56px" }
    fontWeight: 500
    letterSpacing: { phone: "-0.04em", desktop: "-0.045em" }
  headline:
    fontSize: { phone: "26px", tablet: "30px", desktop: "40px" }
    lineHeight: { phone: "32px", tablet: "36px", desktop: "44px" }
    fontWeight: 500
    letterSpacing: "-0.034em"
  title:
    fontSize: { phone: "20px", tablet: "23px", desktop: "26px" }
    lineHeight: { phone: "24px", tablet: "28px", desktop: "32px" }
    fontWeight: 500
    letterSpacing: "-0.028em"
  lead:
    fontSize: { phone: "18px", tablet: "20px", desktop: "20px" }
    lineHeight: "28px"
    fontWeight: 400
    letterSpacing: "-0.018em"
  cardTitle:
    fontSize: { phone: "16px", tablet: "17px", desktop: "18px" }
    lineHeight: "24px"
    fontWeight: 500
    letterSpacing: "-0.02em"
  body:
    fontSize: { phone: "15px", tablet: "16px", desktop: "16px" }
    lineHeight: "24px"
    fontWeight: 400
    letterSpacing: "-0.011em"
  eyebrow:
    fontSize: { phone: "13px", tablet: "14px" }
    lineHeight: "20px"
    fontWeight: 500
    letterSpacing: "0.06em"
    textTransform: "uppercase"
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
- Large Geist headlines over calm Geist explanation, separated by weight and
  colour rather than by a second face.
- Motion that is felt rather than watched, and which costs no JavaScript.
- The landing page opens on a tinted hero plane, with the proposition centred
  on top of it.

## Colors

### Grounds and elevation

The system has two **grounds** — light and dark — and each carries the same
four-rung **elevation** ladder. A component asks for a height above its ground,
never for a colour, so the same card works on either.

| Rung    | Light               | Dark           | Used for              |
| ------- | ------------------- | -------------- | --------------------- |
| `--s-0` | canvas `#ffffff`    | dark `#0a0d16` | the plane itself      |
| `--s-1` | band `#eef1f8`      | `#232733`      | a resting card        |
| `--s-2` | band-deep `#e2e8f4` | `#2f3442`      | hover, a raised card  |
| `--s-3` | `#d6def0`           | `#3a4054`      | an inset chip or tile |

`.band--dark` and `.on-dark` rebind `--s-*`, `--ink-*`, `--fill-*` and
`--c-accent-current` in **one place**. Anything nested inside then resolves
correctly without naming a dark colour itself.

**A dark island on a light band must carry `.on-dark` in the markup** and name
`--s-dark-*` explicitly — the wide first capability card is the one instance.
Without the class its contents resolve against the band's ground, not its own.

### Ink

Three rungs on each ground, one for one, addressed through `--ink-1/-2/-3`:

| Role      | Light     | Dark      | Used for                            |
| --------- | --------- | --------- | ----------------------------------- |
| `--ink-1` | `#0c1024` | `#f2f4fa` | headings, primary text              |
| `--ink-2` | `#414a63` | `#a8b0c6` | body, leads, tags                   |
| `--ink-3` | `#5f6884` | `#767f99` | card numbers, captions, small print |

The dark side previously had only two rungs against the light side's three,
which is why small type on dark bands got its colour picked by hand.

### Fills

`--fill-1` (6%) and `--fill-2` (10%) are the tint fills for quiet controls —
the quiet button, the nav toggle, tags. They are **alpha, not mixed colours**,
so a single token works on any ground once `.on-dark` flips the channel from
ink to white.

### Accent

Crimson `#a91d4b` is the action colour on light grounds; `#f2789f` is its
counterpart on dark. **Components reference `--c-accent-current` and nothing
else.** Crimson on `--c-dark` measures 1.6:1 — unreadable — and pairing the two
by hand at every call site is how that ships. The rebind makes it structural.

### Product hues

Four hues from the quadrants of the mark — blue, green, indigo, purple — each
with `soft`, `mid` and `deep`. Applied with `data-hue` on a section, which sets
`--card-soft`, `--card-mid` and `--card-deep`. A hue is an identity, never an
action colour.

### The contrast floor

Body text must clear 4.5:1 against the surface it actually sits on, not against
the page. The pairs that do **not** clear it, and must never be written:

| Foreground       | Surface      | Ratio | Use instead       |
| ---------------- | ------------ | ----- | ----------------- |
| `--c-accent`     | `--c-dark`   | 1.6:1 | `--c-accent-dark` |
| `--c-ink-3`      | `--s-dark-1` | 2.4:1 | `--ink-3`         |
| `--c-dark-ink-2` | `--c-canvas` | 2.0:1 | `--ink-2`         |

Addressing colour through `--ink-*`, `--s-*` and `--c-accent-current` makes all
three unreachable, which is the point of the indirection.

## Typography

**One family: Geist Variable.** There is no second face, no monospace, and no
italic in the system. `--font-body` is an alias of `--font-display`, so the two
role names survive in the CSS without implying two downloads.

### The ladder

Every size comes from one ladder of tokens in `:root`, each rung roughly 1.12x
the one below it. **There are no ad-hoc font sizes** — `grep "font-size:"` over
`globals.css` returns nothing but `var(--t-*)`.

`13 · 14 · 15 · 16 · 17 · 18 · 20 · 23 · 26 · 30 · 34 · 40 · 44 · 54`

The ladder has no gap along its length. That matters more than the exact
values: a hole in the middle forces a heading to borrow a size from a role it
does not belong to, which is how the old scale ended up with a card-title
override in the capabilities grid.

### Roles step; they do not interpolate

Each role is a plain token redefined at two breakpoints — 640px and 1080px —
and every step lands on a rung of the ladder. No viewport width renders a size
that is not on the ladder.

| Role    | Phone | Tablet | Desktop | Line height  |
| ------- | ----- | ------ | ------- | ------------ |
| display | 34    | 44     | 54      | 40 / 48 / 56 |
| h2      | 26    | 30     | 40      | 32 / 36 / 44 |
| h3      | 20    | 23     | 26      | 24 / 28 / 32 |
| lead    | 18    | 20     | 20      | 28           |
| h4      | 16    | 17     | 18      | 24           |
| body    | 15    | 16     | 16      | 24           |
| meta    | 13    | 14     | 14      | 20           |

**Why not `clamp()`.** A clamp interpolates, so it produces off-ladder sizes at
most widths, and its floor pins the small roles at their phone size across
every laptop. Under the previous scale `--t-body` was `clamp(14px, 1vw, 16px)`,
which does not reach 16px until a 1600px viewport: desktop body copy was
rendering at its mobile size on every normal laptop. The same floor held
`--t-h4` and `--t-lead` at 16px from 390px to roughly 1500px.

**Lead is larger than h4.** A lead is a subtitle under a display heading; an h4
titles a card. They were previously the same `clamp()` expression — identical
to the pixel — which left weight and colour carrying a distinction they could
not hold on their own.

### Line heights are absolute, on a 4px grid

`56 / 48 / 44 / 40 / 36 / 32 / 28 / 24 / 20`. Unitless ratios put line boxes on
fractional pixels, so text in adjacent cards of the same grid never shares a
baseline. Absolute values on a common grid make the columns line up.

### Two weights

**400 and 500, nothing else.** Size, colour, and the surface a heading sits on
carry the hierarchy. A third weight blurs it rather than sharpening it — this
is why `.t-h4` no longer sets 600 and the eyebrow dropped from 600 to 500.

Eyebrows are 13/14px, weight 500, uppercase with `0.06em` tracking and a short
accent rule drawn by `::before` — the one place small type carries accent
colour. The tracking and the case do the work that the extra weight used to.

**The wordmark** is the one deliberate exception to the role system: Geist 800
at 20px, so the lockup reads as a mark rather than as a heading.

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

- `Layout.astro` owns head metadata, per-route canonical and JSON-LD, the Geist
  font preload, the skip link, `Header` and `Footer`. Pages supply only their
  bands.
- `Header.astro` takes no props. Desktop shows a hover/focus Products menu;
  below 1080px a full-height sheet replaces it. **The mobile menu is a native
  `popover`**, which supplies outside-click dismissal, Escape and focus handling
  with no script.

**The mobile menu is a sheet, not a dropdown.** It covers the viewport
(`inset: 0`, `100dvh`), so it carries its own header row — the same lockup and
the same 46px control in the same position — and the close button lands exactly
where the thumb opened it. Group labels step _down_ to 14px muted and the
destinations step _up_ to 20px: on a sheet the links are the content, and the
label only files them. Feedback is on `:active`, never a hover rectangle, since
a thumb cannot hover. The CTA is full width and pinned to the bottom.

Give `display` to `:popover-open`, never to `[popover]`. An author `display` on
the base selector beats the UA stylesheet's closed-state `display: none` and
leaves the sheet showing on page load.

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

- Section entry uses `animation-timeline: view()` behind an `@supports` guard.
  Where the timeline is unsupported, content simply renders at rest — there is
  no hidden state to get stuck in and no flash.
- The header's background and hairline both use `animation-timeline: scroll()`.
  It rests on the colour of the section beneath it and resolves to canvas over
  the first 48px of scroll, so the first viewport has no bar across the top.
  `body:has(.hero)` sets `--header-rest`; pages without a tinted first section
  leave it at canvas and the animation moves the hairline only.

**Never write scroll-driven animations with the `animation` shorthand.** The
CSS minifier folds the following `animation-timeline` into it, emitting
`animation: linear both name scroll()`, which no browser parses — the whole
declaration is dropped and the animation silently does not run. Use
`animation-name` / `animation-timing-function` / `animation-fill-mode`
longhands, which cannot be merged that way. Both the header lift and every
`[data-reveal]` shipped dead for exactly this reason.

- `data-reveal-delay` staggers a group by shifting `animation-range`, not by
  `animation-delay`, which has no meaning on a scroll timeline.
- Hover lifts, the text-link underline draw, and the popover's
  `@starting-style` entry are ordinary transitions.
- `prefers-reduced-motion: reduce` collapses all of it to 0.01ms and disables
  smooth scrolling. The reveal timelines are additionally scoped inside a
  `no-preference` query, so they never run at all.

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
- **Do** check a new colour pairing against the surface it will actually sit
  on, and against the contrast floor table above.
- **Do** extend `.band`, `.shell`, `SectionHead`, `Button`, `TextLink` and the
  card vocabulary before adding a new primitive.
- **Do** keep new motion CSS-only, guarded by `@supports`, and inert under
  reduced motion.
- **Do** record new tokens and components in this file and in
  `.impeccable/design.json`.
- **Do** set type from a role token (`--t-h2`, `--t-lead`, …), and add a
  breakpoint step to `:root` if a role needs to move — never a `font-size` on
  the component.

### Don't

- **Don't** add borders as a structural device, or return to zero-radius boxes.
- **Don't** use crimson as decoration, or a product hue as an action colour.
- **Don't** name a plane, an ink or an accent by its light/dark value in a
  component. Address `--s-*`, `--ink-*` and `--c-accent-current`; if a rule
  needs an `.on-dark` counterpart, the token is wrong, not the rule.
- **Don't** hardcode a hex for a surface. Every one that existed was picked by
  hand and none of them was findable by name.
- **Don't** add an inline `style` attribute or an inline `<script>` — the CSP
  blocks both, and `validate-build` fails the build on either.
- **Don't** introduce a second font family, a monospace face, or italics, and
  don't add a third weight — 400 and 500 are the whole system.
- **Don't** set type with `clamp()`. Roles step between breakpoints so every
  rendered size stays on the ladder; a clamp interpolates off it and its floor
  pins small roles at their phone size across laptop widths.
- **Don't** use unitless line heights. They land on fractional pixels and stop
  adjacent cards in a grid from sharing a baseline.
- **Don't** show brains, glowing network nodes, robots or generic purple AI
  gradients. The imagery is material and the illustrations are interfaces.
- **Don't** expose the internal build names behind the four product systems.
