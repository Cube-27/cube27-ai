/**
 * Regenerates `.impeccable/design.json`, the machine-readable mirror of
 * DESIGN.md. Keep the two in step: when a token or component changes in one,
 * change it here and re-run `node scripts/build-design-json.mjs`.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

/** oklch lightness ramp for a hue, so tooling can derive tints and shades. */
const ramp = (chroma, hue) =>
  [15, 26, 37, 49, 61, 73, 84, 95].map(
    (lightness) => `oklch(${lightness}% ${chroma} ${hue})`,
  );

const colorMeta = {
  canvas: {
    role: "neutral",
    displayName: "Canvas",
    canonical: "#ffffff",
    tonalRamp: ramp(0.004, 250),
  },
  band: {
    role: "neutral",
    displayName: "Pale Band",
    canonical: "#eef1f8",
    tonalRamp: ramp(0.014, 262),
  },
  "band-deep": {
    role: "neutral",
    displayName: "Deep Band",
    canonical: "#e2e8f4",
    tonalRamp: ramp(0.022, 262),
  },
  ink: {
    role: "neutral",
    displayName: "Ink",
    canonical: "#0c1024",
    tonalRamp: ramp(0.03, 268),
  },
  "ink-2": {
    role: "neutral",
    displayName: "Ink Secondary",
    canonical: "#414a63",
    tonalRamp: ramp(0.033, 265),
  },
  "ink-3": {
    role: "neutral",
    displayName: "Ink Muted",
    canonical: "#5f6884",
    tonalRamp: ramp(0.036, 265),
  },
  dark: {
    role: "neutral",
    displayName: "Dark Band",
    canonical: "#0a0d16",
    tonalRamp: ramp(0.018, 262),
  },
  "dark-2": {
    role: "neutral",
    displayName: "Dark Surface",
    canonical: "#151a2a",
    tonalRamp: ramp(0.024, 264),
  },
  "dark-3": {
    role: "neutral",
    displayName: "Dark Surface Raised",
    canonical: "#1e2436",
    tonalRamp: ramp(0.026, 264),
  },
  "dark-ink": {
    role: "neutral",
    displayName: "Dark Band Ink",
    canonical: "#f2f4fa",
    tonalRamp: ramp(0.008, 262),
  },
  "dark-ink-2": {
    role: "neutral",
    displayName: "Dark Band Ink Muted",
    canonical: "#a8b0c6",
    tonalRamp: ramp(0.03, 268),
  },
  accent: {
    role: "primary",
    displayName: "CUBE27 Crimson",
    canonical: "#a91d4b",
    tonalRamp: ramp(0.17, 8),
  },
  "accent-hover": {
    role: "primary",
    displayName: "Crimson Hover",
    canonical: "#87153c",
    tonalRamp: ramp(0.15, 8),
  },
  "accent-soft": {
    role: "primary",
    displayName: "Crimson Wash",
    canonical: "#fbecf1",
    tonalRamp: ramp(0.03, 8),
  },
  "accent-dark": {
    role: "primary",
    displayName: "Crimson on Dark",
    canonical: "#f2789f",
    tonalRamp: ramp(0.13, 8),
  },
  "hue-blue": {
    role: "secondary",
    displayName: "Product Blue",
    canonical: "#0872ba",
    tonalRamp: ramp(0.13, 245),
  },
  "hue-green": {
    role: "secondary",
    displayName: "Product Green",
    canonical: "#0b7a3c",
    tonalRamp: ramp(0.12, 152),
  },
  "hue-indigo": {
    role: "secondary",
    displayName: "Product Indigo",
    canonical: "#33348f",
    tonalRamp: ramp(0.15, 276),
  },
  "hue-purple": {
    role: "secondary",
    displayName: "Product Purple",
    canonical: "#6d3d80",
    tonalRamp: ramp(0.12, 315),
  },
};

const typographyMeta = {
  display: {
    displayName: "Display",
    purpose: "The homepage proposition and each product page's h1.",
  },
  headline: {
    displayName: "Section Headline",
    purpose: "Section h2 elements rendered through SectionHead.",
  },
  title: {
    displayName: "Title",
    purpose: "Product names and sub-section h3 elements.",
  },
  lead: {
    displayName: "Lead",
    purpose: "The paragraph directly under a headline.",
  },
  body: {
    displayName: "Body",
    purpose: "Card and section explanatory copy.",
  },
  eyebrow: {
    displayName: "Eyebrow",
    purpose:
      "Section and product labels; the one place small type carries accent colour.",
  },
};

const shadows = [
  {
    name: "lift",
    value: "0 18px 40px -18px rgb(12 16 36 / 0.28)",
    purpose: "Hover lift on product cards and primary buttons.",
  },
  {
    name: "lift-soft",
    value: "0 10px 30px -16px rgb(12 16 36 / 0.22)",
    purpose: "Hover lift on capability cards.",
  },
  {
    name: "float-panel",
    value:
      "0 2px 8px rgb(12 16 36 / 0.06), 0 24px 56px -20px rgb(12 16 36 / 0.28)",
    purpose: "Products dropdown and the mobile popover panel.",
  },
  {
    name: "header-lift",
    value: "0 1px 0 rgb(12 16 36 / 0.08)",
    purpose: "Sticky header hairline, driven by a scroll() timeline.",
  },
];

const motion = [
  {
    name: "ease",
    value: "cubic-bezier(0.22, 1, 0.36, 1)",
    purpose: "The single easing curve used across the system.",
  },
  {
    name: "state",
    value: "200ms",
    purpose: "Navigation, tag and link state changes.",
  },
  {
    name: "card",
    value: "320ms",
    purpose: "Card hover lift and surface change.",
  },
  {
    name: "media",
    value: "700ms",
    purpose: "Illustration scale inside a product card on hover.",
  },
  {
    name: "reveal",
    value: "animation-timeline: view(); animation-range: entry 4% cover 20%",
    purpose:
      "Section entry. CSS-only and guarded by @supports; unsupported browsers render at rest.",
  },
  {
    name: "header-scroll",
    value: "animation-timeline: scroll(); animation-range: 0 48px",
    purpose: "Sticky header hairline. CSS-only, no script.",
  },
];

const breakpoints = [
  { name: "navigation", value: "1080px" },
  { name: "split-stack", value: "940px" },
  { name: "single-column", value: "620px" },
];

const components = [
  {
    name: "Primary Button",
    kind: "button",
    refersTo: "button-primary",
    description:
      "The decisive crimson action, used once per band at most. Minimum height 50px.",
    html: '<a class="btn btn--primary" href="#">Explore our products</a>',
  },
  {
    name: "Secondary Button",
    kind: "button",
    refersTo: "button-secondary",
    description:
      "Ink-filled action used for the header CTA and inside tinted cards.",
    html: '<a class="btn btn--secondary" href="#">Start a conversation</a>',
  },
  {
    name: "Quiet Button",
    kind: "button",
    refersTo: "button-quiet",
    description: "The lower-weight partner beside a primary action.",
    html: '<a class="btn btn--quiet" href="#">Bring us a workflow</a>',
  },
  {
    name: "Text Link",
    kind: "link",
    refersTo: "text-link",
    description:
      "Containerless 44px action. The underline draws in from the left; with the stretch modifier it makes an entire card clickable.",
    html: '<a class="tlink" href="#"><span class="tlink__label">Explore product</span></a>',
  },
  {
    name: "Product Card",
    kind: "card",
    refersTo: "product-card",
    description:
      "Full-width split card carrying one product system. The flip modifier alternates which side holds the illustration. Owns a hue through data-hue.",
    html: '<article class="product-card" data-hue="blue"><div class="product-card__media"></div><div class="product-card__body"></div></article>',
  },
  {
    name: "Capability Card",
    kind: "card",
    refersTo: "capability-card",
    description:
      "White card on the deep band, numbered 01-07. The first card spans two columns and renders dark, so seven cards fill two rows exactly.",
    html: '<li class="cap-card"><div class="cap-card__top"><span class="cap-card__icon"></span><span class="cap-card__num">01</span></div><h3 class="t-h4">Grounded Retrieval</h3><p class="t-body"></p></li>',
  },
  {
    name: "Band",
    kind: "layout",
    refersTo: "band",
    description:
      "Full-bleed section surface. One of canvas, tint, deep or dark, with optional rounded shoulders where dark meets the light field. The homepage runs them as a deepening ramp.",
    html: '<section class="band band--dark band--round-top on-dark"><div class="shell"></div></section>',
  },
  {
    name: "Workflow Strip",
    kind: "display",
    refersTo: "workflow-strip",
    description:
      "The ordered steps of a product system, as pills in the product's hue separated by arrows.",
    html: '<ol class="p-flow"><li class="p-flow__step">Observe</li></ol>',
  },
];

const narrative = {
  northStar: "Surfaces, not boxes.",
  overview:
    "CUBE27 AI reads as a sequence of coloured planes. Structure comes from tonal shifts between adjacent surfaces and from generous space, never from hairline borders. The light field is punctuated by full-bleed dark bands that mark the shift from explanation to conviction. Product interfaces, not AI symbolism, carry the meaning.",
  keyCharacteristics: [
    "Light, borderless, generously spaced; depth is tonal, not shadowed.",
    "One accent, the crimson of the CUBE27 27, reserved for action.",
    "Four product hues, each drawn from a quadrant of the CUBE27 mark.",
    "Large Geist headlines over calm Inter explanation. No third face.",
    "Motion that is felt rather than watched, and which costs no JavaScript.",
  ],
  rules: [
    {
      name: "The Accent Rarity Rule",
      detail:
        "Crimson means action or active state. It is never a decorative fill and never carries paragraph text.",
    },
    {
      name: "The Hue Ownership Rule",
      detail:
        "A product hue belongs to its product everywhere it appears. Crimson is never a product hue, so action never competes with identity.",
    },
    {
      name: "The Two-Voice Rule",
      detail:
        "Geist states and Inter explains. No third family, no monospace, no italics.",
    },
    {
      name: "The Real-Surface Contrast Rule",
      detail:
        "Check a colour pairing against the surface it will actually sit on, not against white.",
    },
    {
      name: "The Zero-Script Rule",
      detail:
        "The site ships no first-party JavaScript. New behaviour must be HTML or CSS, and is asserted by the e2e suite.",
    },
  ],
  dos: [
    "Express structure with a surface change and space before reaching for anything else.",
    "Extend band, shell, SectionHead, Button, TextLink and the card vocabulary before adding a new primitive.",
    "Keep new motion CSS-only, guarded by @supports, and inert under reduced motion.",
    "Record new tokens and components in both DESIGN.md and this file.",
  ],
  donts: [
    "Add borders as a structural device, or return to zero-radius boxes.",
    "Use crimson as decoration, or a product hue as an action colour.",
    "Add an inline style attribute or inline script; the CSP blocks both and validate-build fails the build.",
    "Introduce a third font family, a monospace face, or italics.",
    "Show brains, glowing network nodes, robots or generic purple AI gradients.",
    "Expose the internal build names behind the four product systems.",
  ],
};

const design = {
  schemaVersion: 2,
  generatedAt: new Date().toISOString(),
  title: "Design System: CUBE27 AI",
  extensions: { colorMeta, typographyMeta, shadows, motion, breakpoints },
  components,
  narrative,
};

const out = path.join(ROOT, ".impeccable/design.json");
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, `${JSON.stringify(design, null, 2)}\n`);
console.log(`${path.relative(ROOT, out)} regenerated.`);
