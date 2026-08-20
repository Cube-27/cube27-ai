# Cube27 AI Design System

## 1. Authority and intent

The live Cube27 AI demo is the visual and content authority for the launch
microsite. The implementation must preserve its Inference Control Room world,
section order, copy, responsive composition, and restrained operational motion.
This document turns that approved surface into reusable rules for future pages;
it is not permission to redesign it.

The parent Cube27 website is the authority for the legal organization, contact
destination, original logo artwork, and company-level links. The new site is a
Cube27 microsite, not a separate organization.

### Product character

- Precise, resilient, and operational rather than speculative.
- Evidence-led rather than spectacle-led.
- Technical without becoming a command-line or cyberpunk pastiche.
- Dense enough to feel instrumented, with enough quiet to remain legible.

### Visual thesis

The page is a vertical signal path through a production AI system. A persistent
cyan rail, diagnostic labels, topology imagery, and square-edged modules connect
the sections into one operating environment rather than a stack of unrelated
marketing bands.

## 2. Foundations

### Color tokens

| Token                 | Value                     | Use                                |
| --------------------- | ------------------------- | ---------------------------------- |
| `--ai-background`     | `#070b12`                 | Page field and deepest surface     |
| `--ai-surface-1`      | `#0b1722`                 | Primary panels and cards           |
| `--ai-surface-2`      | `#0e1b28`                 | Elevated/active panels             |
| `--ai-surface-3`      | `#112835`                 | CTA and emphasized regions         |
| `--ai-text-primary`   | `#effbff`                 | Headlines and decisive labels      |
| `--ai-text-secondary` | `#b2c8d2`                 | Body copy                          |
| `--ai-text-muted`     | `#8faebb`                 | Supporting copy and metadata       |
| `--ai-signal`         | `#5ee8ff`                 | Active paths, primary CTA, focus   |
| `--ai-signal-hover`   | `#95efff`                 | CTA hover and high-emphasis states |
| `--ai-verified`       | `#b3e85a`                 | Healthy/verified system state      |
| `--ai-assurance`      | `#a8b8ff`                 | Assurance pattern category         |
| `--ai-learning`       | `#f4cd85`                 | Learning pattern category          |
| `--ai-border`         | `rgb(159 212 230 / 0.15)` | Default structural line            |
| `--ai-border-active`  | `rgb(94 232 255 / 0.56)`  | Focused/hovered structural line    |

Colors are semantic. Shared roles consume the variables above. Local raw alpha
values are permitted for image-legibility overlays, translucent instruments,
hairline connectors, and node glows because those opacity variants are not
separate global tokens; they must remain derived from the same cyan/graphite
world rather than introduce a new hue.

### Typography

- **Display and headings:** Space Grotesk Variable, weights 400–700.
- **Body and interface prose:** Geist Variable, weights 400–700.
- **Telemetry and identifiers:** JetBrains Mono Variable, weights 400–600.
- Fonts are self-hosted Latin WOFF2 resources with `font-display: swap`.
- Display copy uses tight but readable tracking, never tighter than `-0.055em`.
- Lead copy uses `1.62–1.65` line height; compact card and step copy uses
  `1.45–1.55` where the measure is shorter.
- Mono is reserved for identifiers, navigation labels, status, measurements,
  and section traces; it never carries paragraph copy.

The responsive ladder is defined with fluid `clamp()` values:

| Role            | Mobile       | Fluid/desktop                       |
| --------------- | ------------ | ----------------------------------- |
| Hero H1         | 2.3125rem    | up to 5.125rem, 0.94 line-height    |
| Section H2      | 2rem         | up to 3.125rem, 0.99 line-height    |
| CTA H2          | 2rem         | up to 3.375rem                      |
| Card H3         | 1.25rem      | 1.45–1.8rem by component            |
| Lead/body       | 0.9375rem    | up to 1.125rem                      |
| Supporting body | 0.8125rem    | 0.9375rem                           |
| Telemetry       | 0.5–0.625rem | uppercase with 0.075–0.1em tracking |

### Spacing and layout

- Base spacing unit: 4px. Repeated component spacing uses the
  8/12/16/24/32/48 scale; section and diagram geometry also uses intentional
  one-off values where it must align with the rail or image composition.
- Desktop content gutters follow the signal rail: left
  `clamp(46px, 7vw, 124px)`, right `clamp(26px, 5.2vw, 88px)`.
- Mobile gutters are 35px left and 20px right; below 370px they become 30px and
  16px. The fixed signal rail remains at least 18px from the viewport edge.
- Primary breakpoints are 760px and 1050px. Components must also remain stable
  at 320px and through the exact boundary widths.
- Sections use generous vertical rhythm (82–145px depending on breakpoint) and
  a 1px structural divider.
- Structural corners are square (`0`). Circles are reserved for compact status
  nodes; the implementation has no pill-shaped surfaces.

### Depth, borders, and texture

- Structure is communicated primarily by 1px tinted borders and surface shifts.
- Elevated panels may use a downward soft shadow; cyan glow is reserved for
  active nodes and verified paths, not every container.
- Backdrop blur is permitted only where the design depicts a translucent
  instrument panel over topology imagery.
- The ambient grid and topology images are operational canvases, not generic
  decoration. Their opacity must never compromise content contrast.
- The ambient grid intentionally uses both horizontal and vertical 48px lines.
  This is part of the pinned Inference Control Room reference and is not an
  accidental generic grid pattern.

## 3. Components

### Page shell and signal rail

The `.site-shell` class, `.ambient-grid`, and `.signal-rail` together own the
graphite field, overflow containment, fixed two-axis background grid, rail,
selection color, and global focus ring. Major sections register to the rail
through `.section-shell[data-rail]`; branches and labels hide at 760px while the
rail remains.

### Header and brand lockup

- Fixed 78px desktop / 68px mobile header with translucent graphite backing.
- The Cube27 lockup uses the approved transparent dark-surface logo. The cube
  and magenta `27` remain unchanged; only the neutral word pixels become the
  light foreground. Never place the logo on a pale rectangle.
- `AI` is a separate Space Grotesk label, not baked into or slashed through the
  master logo.
- Desktop navigation is mono and uppercase. Mobile navigation uses a native
  disclosure with a 44px minimum target and visible focus treatment.

### Section lead

`SectionLead` owns the approved telemetry eyebrow, cyan node, H2, and optional
supporting paragraph. It provides the shared typography ladder and spacing so
future pages do not recreate heading treatments ad hoc.

### Buttons and links

- Primary button: cyan field, dark text, Space Grotesk 700, square corners.
- Header CTA: transparent cyan-tinted panel with a 1px signal border.
- Text link: no container; arrow travel and cyan color provide hover feedback.
- All interactive states inherit the global `:focus-visible` outline. Primary
  buttons move upward 2px on hover; text-link feedback is a 3px gap increase.

### Instrument panels and cards

- Status panels use a top status line, ruled route rows, and a footer trace.
- Engineering posture is a connected three-node system ending in an outcome,
  not a generic equal-card grid.
- Pattern rows use category color only on the icon/verification signal.
- Product cards keep one product, use case, audience, and outcome metric per
  module. Their one-pixel shared grid is the enclosing structure.
- Delivery steps use the signal line as a true sequence; numbered labels remain
  because order carries meaning.

### Images

- The hero topology image is a full-bleed decorative canvas with semantic text
  remaining in HTML. It is the LCP asset and receives responsive sources,
  explicit dimensions, preload, `fetchpriority="high"`, and eager loading.
- Pattern imagery is local, responsive, lazy-loaded, and its diagnostic overlay
  remains live HTML. Product proof is implemented as HTML cards, not imagery.
- No production page may depend on Manus storage or other demo-host URLs.

## 4. Motion and interaction

- The authored moment is the hero signal field: slow rail movement, restrained
  topology presence, and compact content arrival.
- Hover travel is 2px on primary buttons/cards, with 180–200ms transitions and
  exponential ease-out where movement occurs.
- Below-fold content is visible by default; only the hero intro and status panel
  have authored entry animations.
- `prefers-reduced-motion: reduce` removes scroll behavior, looping motion, and
  nonessential transitions.
- Sticky media becomes static in the single-column mobile composition.

## 5. Accessibility and extension rules

- Target WCAG 2.2 AA contrast, keyboard access, semantic landmarks, logical
  heading order, a skip link, 44px touch targets, and resilient 200% zoom.
- Decorative topology imagery has empty alt text and is excluded from the
  accessibility tree. The logo has a concise `Cube27 AI` accessible name.
- Status is never conveyed by color alone; labels such as `ACTIVE` remain.
- Future pages reuse the same page shell, rail, header, footer, typography,
  button, telemetry, and section-lead interfaces. New components must be added
  to this document and consume existing tokens before new tokens are proposed.
- Factual content stays centralized in typed data and machine-readable outputs
  are generated from the same source to prevent drift.
