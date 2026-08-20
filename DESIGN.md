---
name: Cube27 AI
description: A production-AI control room built from signal paths, operational evidence, and restrained instrumentation.
colors:
  background: "#070b12"
  surface-1: "#0b1722"
  surface-2: "#0e1b28"
  surface-3: "#112835"
  text-primary: "#effbff"
  text-secondary: "#b2c8d2"
  text-muted: "#8faebb"
  signal: "#5ee8ff"
  signal-hover: "#95efff"
  verified: "#b3e85a"
  assurance: "#a8b8ff"
  learning: "#f4cd85"
  border: "rgb(159 212 230 / 0.15)"
  border-active: "rgb(94 232 255 / 0.56)"
typography:
  display:
    fontFamily: '"Space Grotesk Variable", "Space Grotesk", sans-serif'
    fontSize: "clamp(42px, 5.45vw, 82px)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  headline:
    fontFamily: '"Space Grotesk Variable", "Space Grotesk", sans-serif'
    fontSize: "clamp(31px, 3.4vw, 50px)"
    fontWeight: 500
    lineHeight: 0.99
    letterSpacing: "-0.052em"
  title:
    fontFamily: '"Space Grotesk Variable", "Space Grotesk", sans-serif'
    fontSize: "25px"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.05em"
  body:
    fontFamily: '"Geist Variable", Geist, sans-serif'
    fontSize: "clamp(15px, 1.15vw, 18px)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: '"JetBrains Mono Variable", "JetBrains Mono", monospace'
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  square: "0"
  circular: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.background}"
    rounded: "{rounded.square}"
    padding: "13px 18px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
    textColor: "{colors.background}"
  button-header:
    backgroundColor: "rgb(94 232 255 / 0.055)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.square}"
    padding: "11px 16px"
    height: "44px"
  card-instrument:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.square}"
    padding: "21px"
---

# Design System: Cube27 AI

## Overview

**Creative North Star: "The Inference Control Room"**

Cube27 AI reads as one traced production system, not a sequence of generic marketing bands. Midnight graphite, signal cyan, status colors, hairline routes, technical imagery, and compact telemetry create an instrumented environment; generous section height and plain-language headings keep it calm and legible.

The visual thesis is a vertical signal path. The fixed `.signal-rail`, section branches from `.section-shell[data-rail]`, ruled modules, and diagnostic labels connect evidence across the page. The fixed `.ambient-grid` is an intentional two-axis, 48px control-room reference—not accidental “graph paper” decoration—and remains subtle at `opacity: 0.2` under a vertical mask.

**Key Characteristics:**

- Dark, flat operating field with translucent instruments only over imagery.
- Square modules, one-pixel structure, and sparse cyan/chartreuse glow.
- Large human-readable display type paired with mono telemetry.
- Asymmetric rail-aligned gutters and decisive mobile stacking.

## Colors

The palette assigns color by system meaning: cyan is the active path, chartreuse is verified health, lavender is assurance, and amber is learning. The frontmatter values map directly to the `--ai-*` properties in `src/styles/globals.css`.

### Primary

- **Signal Cyan** (`signal`, `signal-hover`): primary actions, active paths, focus, linked geometry, and the single emphasized word in the hero.

### Secondary

- **Verified Chartreuse** (`verified`): healthy state dots and completion marks; always paired with a label or icon.
- **Assurance Lavender** (`assurance`) and **Learning Amber** (`learning`): category-only accents in production-pattern icons.

### Neutral

- **Midnight Graphite** (`background`): global page field.
- **Instrument Surfaces** (`surface-1` through `surface-3`): progressively stronger panels and calls to action.
- **Primary / Secondary / Muted Text**: ordered reading hierarchy; paragraph copy uses secondary or muted, never instrumentation colors.
- **Structural / Active Borders** (`border`, `border-active`): default rules and activated boundaries.

**The Signal Rarity Rule.** Cyan identifies action, routing, or active state; it is not a general fill color.

**The Semantic Status Rule.** Chartreuse, lavender, and amber keep their implemented meanings and never carry paragraph text.

## Typography

**Display Font:** Space Grotesk Variable, with Space Grotesk and sans-serif fallbacks.  
**Body Font:** Geist Variable, with Geist and sans-serif fallbacks.  
**Label/Mono Font:** JetBrains Mono Variable, with JetBrains Mono and monospace fallbacks.

**Character:** Space Grotesk makes the proposition direct and contemporary; Geist keeps explanations neutral; JetBrains Mono makes navigation, IDs, labels, and traces feel measured. Fonts load locally through `src/styles/fonts.css`.

### Hierarchy

- **Display:** `hero-intro h1`; each responsive size is 4px below the original scale, using `clamp(34px, calc(5.45vw - 8px), 74px)` on desktop, `clamp(31px, calc(11.8vw - 8px), 46px)` on mobile, and 29px below 370px.
- **Headline:** `.section-lead h2`; 32px at and below 760px.
- **CTA headline:** `.final-cta h2`; `clamp(32px, 3.8vw, 54px)` with unit line height.
- **Title:** component-specific Space Grotesk at 14–34px; product names use `clamp(26px, 2.35vw, 34px)`.
- **Body:** hero copy uses the normative body token; section and card copy step down to 11–17px with 1.45–1.62 line height.
- **Label:** `.eyebrow`, navigation, route IDs, and telemetry use 7–10px mono, usually uppercase with 0.055–0.1em tracking.

**The Three-Voice Rule.** Space Grotesk speaks, Geist explains, and JetBrains Mono measures; do not swap those roles.

## Layout

`.site-shell` owns the isolated page field and clipped overflow. Desktop content aligns to asymmetric custom-property gutters: `--gutter-left: clamp(46px, 7vw, 124px)` and `--gutter-right: clamp(26px, 5.2vw, 88px)`. The fixed rail sits at `left: clamp(18px, 3.1vw, 58px)`; desktop sections connect to it with a branch and `data-rail` label. Sections use `clamp(84px, 10vw, 145px)` vertical padding and a one-pixel divider.

Responsive behavior is implemented at three max-width breakpoints:

- **1050px:** desktop navigation/CTA become native `<details>` navigation; the delivery split tightens while preserving its vertical path; final CTA becomes two columns.
- **760px:** gutters become 35px/20px, header 68px, section branches hide, content becomes one column, sticky imagery becomes static, hero entry animations are removed, and primary CTAs expand full width.
- **370px:** gutters tighten to 30px/16px and the hero display settles at 29px.

Treat 1050px and 760px as inclusive boundaries. Preserve stability at 320px and zoom; connected diagrams reorient rather than simply shrink.

## Elevation & Depth

The system is flat by default. Depth comes from tonal surface shifts, one-pixel shared grids, image overlays, and sparse luminous nodes. `.hero-status-panel` is the main elevated instrument (`0 22px 70px rgb(0 0 0 / 0.3)` plus 12px backdrop blur); the open mobile menu uses `0 28px 50px rgb(0 0 0 / 0.38)`. Cyan glows belong to nodes, rail signals, and active geometry—not resting cards.

**The Instrument-Only Blur Rule.** Backdrop blur is reserved for translucent controls laid over topology imagery or the fixed header.

## Shapes

The structural language is square: buttons, cards, panels, icon frames, diagnostic tags, and menu surfaces have zero radius. Circles are reserved for status dots and live signal nodes; the final CTA’s rotated squares form a diamond pulse. Borders are normally one pixel and cool-tinted. Do not introduce softly rounded containers or pills.

## Components

### Shell, rail, and header

- `.site-shell`, `.ambient-grid`, and `.signal-rail` are a required page-level trio for this world.
- `Header.astro` has no props. It renders fixed desktop navigation and a semantic `<details>` mobile menu. Header height is 78px desktop / 68px mobile; interactive targets are at least 44px.
- `Logo.astro` accepts `compact?: boolean` (default `false`). It preserves the transparent dark-surface Cube27 mark and adds `AI` as live Space Grotesk text.

### Section lead and icon

- `SectionLead.astro` accepts `eyebrow: string`, `title: string`, and optional `copy?: string`. It owns `.section-lead`, `.eyebrow`, `.section-crest`, H2, and `.section-copy`.
- `SystemIcon.astro` accepts a typed `name` from `activity`, `bot`, `brain`, `clipboard`, `database`, `gauge`, `messages`, `search`, or `shield`, plus optional `size?: number` (default 18). Invalid names fail at build time. Icons use 1.65px strokes and are decorative.

### Buttons and links

- `.primary-button`: cyan field, dark text, Space Grotesk 700 at 13px, 13px/18px padding, 48px minimum height; hover lightens and rises 2px over 180ms.
- `.primary-button-large`: raises minimum height to 54px and inline padding to 22px.
- `.header-cta`: 44px cyan-tinted outline instrument; hover increases tint and border strength.
- `.text-link`: containerless 44px action; hover changes to signal-hover and increases icon gap from 8px to 11px.
- Global `:focus-visible` is a 2px signal outline with 4px offset. Do not remove it in component rules.

### Instrument panels and evidence modules

- `.hero-status-panel` is a translucent three-part instrument: `.panel-topline`, ruled `.panel-routes`, and `.panel-footer`.
- `.posture-system` is a connected three-node diagram plus `.posture-outcome`; below 760px the connection becomes vertical.
- `.pattern-row` is a compact icon/title/detail/completion row. Category color stays on `.pattern-icon`; the completion mark stays verified.
- `.product-readable-grid` is a shared one-pixel 2×2 grid that becomes one column below 760px. Each `.product-readable-card` keeps code/category, name, use case, audience, and outcome metric together.
- `.method-layout` pairs the delivery statement with an ordered vertical signal path. `.delivery-track` keeps four stacked steps on desktop and mobile; below 760px the statement and path stack while the timeline remains intact.

### States, motion, and accessibility

- Above 760px, entry motion is limited to hero content: `arrive` (650ms) and `arrive-right` (680ms with 180ms delay), both using `--ease-out`. Mobile renders the LCP-region content immediately. The rail node drifts over 5s.
- Resting content remains visible. `prefers-reduced-motion: reduce` disables smooth scrolling and collapses animations/transitions to 0.01ms.
- Keep semantic landmarks, logical headings, the skip link, native disclosure navigation, empty alt text for decorative imagery, text labels for status, and forced-color overrides for signal dots.

### Images

- `hero-topology.png` is the full-bleed LCP canvas: responsive AVIF/WebP, explicit intrinsic dimensions, preloaded, eager, and high priority; semantic content stays in HTML.
- `patterns-assembly.png` is a local responsive, lazy-loaded decorative image with live HTML diagnostics. It becomes 220px-tall and non-sticky below 760px.
- Never put essential copy in an image, add a remote demo dependency, or place the approved logo on a pale backing panel.

## Do's and Don'ts

### Do:

- **Do** extend the existing `.site-shell` / rail / `SectionLead` / button / evidence-module vocabulary before adding a new primitive.
- **Do** use semantic `--ai-*` properties for shared roles; local alpha overlays and gradients are allowed when they express image legibility or instrument translucency.
- **Do** preserve square shared-grid construction and recompose connected systems at the implemented breakpoints.
- **Do** keep the ambient two-axis grid; it is a pinned Inference Control Room exception and must stay low-contrast and non-interactive.
- **Do** add new reusable components or tokens to both this file and `.impeccable/design.json`.

### Don't:

- **Don't** turn the system into a neon cyberpunk interface; glows remain sparse and functional.
- **Don't** use cyan, chartreuse, lavender, or amber as arbitrary decoration or body text.
- **Don't** round structural modules, add pill-shaped controls, or float independent generic cards inside sections.
- **Don't** hide below-fold content behind JavaScript or motion, and don't bypass the global focus/reduced-motion behavior.
- **Don't** change the Cube27 cube, magenta `27`, proportions, or transparent dark-surface treatment.
