/**
 * Procedural abstract art for CUBE27 AI.
 *
 * Each composition is a set of "strand bundles": many fine bezier strokes
 * fanned and tapered along a shared curve, so the bundle reads as a twisted
 * sculptural ribbon rather than a blurred blob. Bundles are composited with a
 * screen blend, which makes overlaps glow the way layered light does.
 *
 * Deterministic: a given seed always renders the same image, so committed
 * output can be regenerated and reviewed as a diff.
 *
 * Usage: node scripts/generate-art.mjs
 *
 * The forms are material, not symbolic — no brains, network nodes, robots or
 * generic purple AI gradients.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();

/**
 * Hues taken from the quadrants of the CUBE27 mark, lifted for luminance and
 * weighted so the crimson of the "27" stays the dominant voice.
 */
const HUES = [
  [214, 44, 96], // magenta
  [214, 44, 96],
  [236, 72, 128], // magenta, lifted
  [72, 74, 196], // indigo
  [72, 74, 196],
  [26, 150, 226], // blue
  [150, 96, 200], // purple
  [30, 168, 108], // green
];

const GROUND = ["#070a13", "#0d1428", "#150f2e"];

/** Deterministic PRNG (mulberry32). */
const makeRandom = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const mixHue = (a, b, t) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(
    a[1] + (b[1] - a[1]) * t,
  )},${Math.round(a[2] + (b[2] - a[2]) * t)})`;

/**
 * One bundle of fanned strands. `pinch` values below 1 pull an end of the
 * bundle together, which is what makes the fan read as a twist.
 */
const bundle = (random, width, height) => {
  const between = (min, max) => min + (max - min) * random();
  const strands = Math.round(between(48, 88));

  const y0 = between(-0.1, 1.1) * height;
  const y1 = between(-0.1, 1.1) * height;
  const spread = between(0.16, 0.62) * height;
  const bow = between(-0.5, 0.5) * height;

  const x0 = -0.2 * width;
  const x1 = 1.2 * width;
  const c1x = x0 + width * between(0.3, 0.55);
  const c2x = x0 + width * between(0.6, 0.95);
  const c1y = y0 + bow;
  const c2y = y1 - bow;

  const pinchStart = between(0.06, 0.95);
  const pinchEnd = between(0.06, 0.95);
  // The fan widening or collapsing mid-curve is what reads as a fold.
  const fanC1 = between(0.35, 1.5);
  const fanC2 = between(0.35, 1.5);
  const twist = between(-0.45, 0.45) * spread;

  const from = HUES[Math.floor(random() * HUES.length)];
  let to = HUES[Math.floor(random() * HUES.length)];
  if (to === from) to = HUES[(HUES.indexOf(from) + 2) % HUES.length];

  const strokeWidth = between(1.6, 3.4).toFixed(2);
  const blur = random() < 0.32 ? between(6, 26).toFixed(1) : 0;
  // Kept high: the strands are already thin and screen-blended, so anything
  // lower drains the composition rather than adding depth.
  const opacity = between(0.9, 1);
  // Soft elliptical footprint: the bundle dissolves toward the frame instead of
  // running edge to edge, which is what leaves the composition room to breathe.
  const mask = {
    cx: between(0.18, 0.82).toFixed(3),
    cy: between(0.18, 0.82).toFixed(3),
    r: between(0.62, 0.98).toFixed(3),
  };

  const paths = [];
  for (let i = 0; i < strands; i += 1) {
    const f = i / (strands - 1);
    const offset = (f - 0.5) * spread;
    // Slight per-strand jitter keeps the fan from looking mechanically ruled.
    const jitter = (random() - 0.5) * spread * 0.035;
    const fade = 0.5 + 0.5 * Math.sin(f * Math.PI);

    const d =
      `M${x0.toFixed(1)} ${(y0 + offset * pinchStart + jitter).toFixed(1)} ` +
      `C${c1x.toFixed(1)} ${(c1y + offset * fanC1 + twist + jitter).toFixed(1)} ` +
      `${c2x.toFixed(1)} ${(c2y + offset * fanC2 - twist + jitter).toFixed(1)} ` +
      `${x1.toFixed(1)} ${(y1 + offset * pinchEnd + jitter).toFixed(1)}`;

    paths.push(
      `<path d="${d}" stroke="${mixHue(from, to, f)}" stroke-opacity="${fade.toFixed(3)}"/>`,
    );
  }

  return { paths, strokeWidth, blur, opacity, mask };
};

const bundleSvg = (width, height, item) => {
  const filter = Number(item.blur)
    ? `<filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${item.blur}"/></filter>`
    : "";
  const mask = `<radialGradient id="mg" cx="${item.mask.cx}" cy="${item.mask.cy}" r="${item.mask.r}">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.68" stop-color="#ffffff" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#000000"/>
    </radialGradient>
    <mask id="m"><rect width="${width}" height="${height}" fill="url(#mg)"/></mask>`;
  const group = `<g fill="none" stroke-width="${item.strokeWidth}" stroke-linecap="round" mask="url(#m)"${
    Number(item.blur) ? ' filter="url(#b)"' : ""
  }>${item.paths.join("")}</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${filter}${mask}</defs>${group}</svg>`;
};

const groundSvg = (width, height) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${GROUND[0]}"/>
        <stop offset="0.55" stop-color="${GROUND[1]}"/>
        <stop offset="1" stop-color="${GROUND[2]}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
  </svg>`;

const vignetteSvg = (width, height) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="v" cx="0.55" cy="0.42" r="0.8">
        <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.3"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#v)"/>
  </svg>`;

/** Low-amplitude grain, centred on mid-grey so overlay neither lifts nor sinks. */
const grain = async (width, height) => {
  const pixels = Buffer.allocUnsafe(width * height * 3);
  const random = makeRandom(99);
  for (let i = 0; i < pixels.length; i += 3) {
    const value = 121 + Math.round(random() * 14);
    pixels[i] = value;
    pixels[i + 1] = value;
    pixels[i + 2] = value;
  }
  return sharp(pixels, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer();
};

/**
 * sharp's composite() has no opacity option — passing one is silently ignored —
 * so an overlay's strength has to be scaled into its own alpha channel first.
 */
const withOpacity = (image, opacity) =>
  image
    .ensureAlpha()
    .composite([
      {
        input: Buffer.from([255, 255, 255, Math.round(opacity * 255)]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

const render = async ({ width, height, seed, count, out, quality = 94 }) => {
  const random = makeRandom(seed);
  const bundles = Array.from({ length: count }, () =>
    bundle(random, width, height),
  );

  const layers = await Promise.all(
    bundles.map(async (item) => ({
      input: await withOpacity(
        sharp(Buffer.from(bundleSvg(width, height, item))),
        item.opacity,
      ),
      blend: "screen",
    })),
  );

  const composed = sharp(Buffer.from(groundSvg(width, height))).composite([
    ...layers,
    { input: Buffer.from(vignetteSvg(width, height)) },
    {
      input: await withOpacity(sharp(await grain(width, height)), 0.09),
      blend: "overlay",
    },
  ]);

  await mkdir(path.dirname(out), { recursive: true });
  const buffer = await composed.jpeg({ quality, mozjpeg: true }).toBuffer();

  await writeFile(out, buffer);
  console.log(
    `${path.relative(ROOT, out)}  ${width}x${height}  ${(buffer.length / 1024).toFixed(0)} KB`,
  );
};

const HERO_SEED = Number(process.env.ART_SEED ?? 8823);

await render({
  width: 1600,
  height: 1280,
  seed: HERO_SEED,
  count: 6,
  out: path.join(ROOT, "src/assets/images/hero-field.jpg"),
});

await render({
  width: 1200,
  height: 630,
  seed: 4501,
  count: 5,
  quality: 88,
  out: path.join(ROOT, "public/social-preview.jpg"),
});
