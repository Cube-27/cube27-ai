import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const read = (name) => readFile(path.join(dist, name), "utf8");
const exists = async (name) => {
  try {
    await access(path.join(dist, name));
    return true;
  } catch {
    return false;
  }
};

const SITE_URL = "https://ai.cube27.com";

/** Astro escapes text nodes, so expectations must be compared escaped. */
const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ROUTES = [
  {
    file: "index.html",
    url: `${SITE_URL}/`,
    title: "CUBE27 AI — AI products for complex operational work",
    heading: "AI products for complex operational work.",
    types: ["Organization", "WebSite", "WebPage", "Service", "ItemList"],
  },
  {
    file: "products/ai-visibility/index.html",
    url: `${SITE_URL}/products/ai-visibility/`,
    title: "AI Visibility & Growth Intelligence — CUBE27 AI",
    heading: "Understand why AI recommends one brand over another.",
    types: ["BreadcrumbList", "Service", "WebPage"],
  },
  {
    file: "products/commerce-intelligence/index.html",
    url: `${SITE_URL}/products/commerce-intelligence/`,
    title: "Commerce Intelligence & Monitoring — CUBE27 AI",
    heading: "Know when the market changes.",
    types: ["BreadcrumbList", "Service", "WebPage"],
  },
  {
    file: "products/supplier-operations/index.html",
    url: `${SITE_URL}/products/supplier-operations/`,
    title: "Supplier Order Operations — CUBE27 AI",
    heading: "One flow from purchase order to reconciliation.",
    types: ["BreadcrumbList", "Service", "WebPage"],
  },
  {
    file: "products/bid-operations/index.html",
    url: `${SITE_URL}/products/bid-operations/`,
    title: "Bid & Proposal Operations — CUBE27 AI",
    heading: "From tender document to submission workspace.",
    types: ["BreadcrumbList", "Service", "WebPage"],
  },
];

/** Internal build names that must never ship. */
const INTERNAL_NAMES = ["CiteLadder", "Invoro", "SalesERP", "RFPmanager"];

const documents = [];

for (const route of ROUTES) {
  if (!(await exists(route.file))) {
    expect(false, `${route.file} is missing`);
    continue;
  }
  const html = await read(route.file);
  documents.push({ route, html });

  expect(
    html.includes(`<title>${escapeHtml(route.title)}</title>`),
    `${route.file}: exact title is missing`,
  );
  expect(
    html.includes(`rel="canonical" href="${route.url}"`),
    `${route.file}: self canonical is missing`,
  );
  expect(
    html.includes(`property="og:url" content="${route.url}"`),
    `${route.file}: og:url is missing`,
  );
  expect(
    html.includes(
      `property="og:image" content="${SITE_URL}/social-preview.jpg"`,
    ),
    `${route.file}: Open Graph image is missing`,
  );
  expect(
    html.includes('name="twitter:card" content="summary_large_image"'),
    `${route.file}: Twitter card metadata is missing`,
  );
  expect(
    html.includes(escapeHtml(route.heading)),
    `${route.file}: page heading is missing`,
  );
  expect(
    html.includes('type="application/ld+json"'),
    `${route.file}: JSON-LD is missing`,
  );
  for (const type of route.types) {
    expect(
      html.includes(`"@type":"${type}"`),
      `${route.file}: JSON-LD type ${type} is missing`,
    );
  }
  expect(
    (html.match(/<h1[\s>]/g) ?? []).length === 1,
    `${route.file}: expected exactly one h1`,
  );
  expect(
    html.includes('rel="preload"') && html.includes('as="font"'),
    `${route.file}: font preloads are missing`,
  );
  for (const name of INTERNAL_NAMES) {
    expect(
      !html.includes(name),
      `${route.file}: internal build name ${name} leaked`,
    );
  }
  // The CSP allows neither inline styles nor inline scripts.
  expect(
    !/\sstyle="/.test(html),
    `${route.file}: an inline style attribute would be blocked by the CSP`,
  );
  expect(
    !/<script(?![^>]*(src=|type="application\/ld\+json"))/.test(html),
    `${route.file}: an inline script would be blocked by the CSP`,
  );
  // Space Grotesk and JetBrains Mono were retired with the previous design.
  expect(
    !/Space Grotesk|JetBrains Mono/.test(html),
    `${route.file}: a retired font family is still referenced`,
  );
}

// The hero opens on the drawn field, not on a raster: nothing above the fold
// may cost a round trip, and the four drifting bundles must all be present.
const home = documents.find((doc) => doc.route.file === "index.html")?.html;
expect(
  home !== undefined && /<div class="hero-field"/.test(home),
  "homepage hero field is missing",
);
expect(
  home !== undefined && (home.match(/hero-field__layer--/g) ?? []).length === 4,
  "homepage hero field does not carry its four layers",
);
const heroStart = home?.indexOf('<section class="hero">') ?? -1;
const heroSection =
  heroStart === -1
    ? ""
    : home.slice(heroStart, home.indexOf("</section>", heroStart));
expect(
  heroStart !== -1 && !/<(img|picture|source)[\s>]/.test(heroSection),
  "the hero opens on a raster image again",
);

// Crawler and sitemap surfaces.
expect(await exists("sitemap-index.xml"), "sitemap-index.xml is missing");
expect(await exists("robots.txt"), "robots.txt is missing");
expect(await exists("404.html"), "404.html is missing");
expect(await exists("social-preview.jpg"), "social-preview.jpg is missing");

const sitemap = await read("sitemap-0.xml");
for (const route of ROUTES) {
  expect(sitemap.includes(route.url), `sitemap is missing ${route.url}`);
}

const llms = await read("llms.txt");
const llmsFull = await read("llms-full.txt");
for (const route of ROUTES.slice(1)) {
  expect(llms.includes(route.url), `llms.txt is missing ${route.url}`);
  expect(llmsFull.includes(route.url), `llms-full.txt is missing ${route.url}`);
}
for (const name of INTERNAL_NAMES) {
  expect(!llms.includes(name), `llms.txt leaked ${name}`);
  expect(!llmsFull.includes(name), `llms-full.txt leaked ${name}`);
}

// No stylesheet or script may be inlined: the CSP allows neither.
expect(
  !/<style[\s>]/.test(home),
  "an inline <style> block would be blocked by the CSP",
);

// Asset budget for the render-blocking stylesheet.
const astroDir = path.join(dist, "_astro");
const assets = await readdir(astroDir);
const cssFiles = assets.filter((name) => name.endsWith(".css"));
expect(cssFiles.length > 0, "no compiled stylesheet was emitted");
for (const file of cssFiles) {
  const { size } = await stat(path.join(astroDir, file));
  expect(
    size < 90_000,
    `stylesheet ${file} is ${(size / 1024).toFixed(0)} KB, over the 88 KB budget`,
  );
}

if (failures.length > 0) {
  console.error("Build validation failed:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`Build validation passed across ${ROUTES.length} routes.`);
