import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

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

const html = await read("index.html");
expect(
  html.includes("<title>Cube27 AI — Production AI Systems</title>"),
  "exact title is missing",
);
expect(
  html.includes(
    'name="description" content="Cube27 designs grounded, governed, and observable AI systems for real-world operations."',
  ),
  "exact description is missing",
);
expect(
  html.includes('rel="canonical" href="https://ai.cube27.com/"'),
  "self canonical is missing",
);
expect(
  html.includes(
    'property="og:image" content="https://ai.cube27.com/social-preview.jpg"',
  ),
  "Open Graph image is missing",
);
expect(
  html.includes('name="twitter:card" content="summary_large_image"'),
  "Twitter card metadata is missing",
);
expect(html.includes('type="application/ld+json"'), "JSON-LD is missing");
for (const type of [
  "Organization",
  "WebSite",
  "WebPage",
  "Service",
  "ItemList",
  "OfferCatalog",
]) {
  expect(html.includes(`"@type":"${type}"`), `JSON-LD type ${type} is missing`);
}
expect(
  html.includes('rel="preload" as="image"'),
  "hero image preload is missing",
);
expect(
  !/manus|manus-storage/i.test(html),
  "generated HTML contains a Manus reference",
);
expect(
  !/client:(load|idle|visible|media|only)|astro-island/i.test(html),
  "first-party hydration markup is present",
);
expect(
  !/react|framer-motion/i.test(html),
  "React or Framer Motion leaked into generated HTML",
);

for (const file of [
  "robots.txt",
  "llms.txt",
  "llms-full.txt",
  "sitemap-index.xml",
  "_headers",
  "_redirects",
  "site.webmanifest",
]) {
  expect(await exists(file), `${file} was not generated`);
}

const robots = await read("robots.txt");
expect(
  robots.includes("OAI-SearchBot\nAllow: /"),
  "OAI-SearchBot is not explicitly allowed",
);
expect(
  robots.includes("https://ai.cube27.com/sitemap-index.xml"),
  "robots sitemap URL is incorrect",
);

const llms = await read("llms-full.txt");
for (const name of ["Invoro", "CiteLadder", "SalesERP", "RFPmanager"]) {
  expect(llms.includes(name), `${name} is absent from llms-full.txt`);
}

const social = await sharp(path.join(dist, "social-preview.jpg")).metadata();
expect(
  social.width === 1200 && social.height === 630,
  "social preview must be 1200×630",
);

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(absolute)));
    else files.push(absolute);
  }
  return files;
};
const distFiles = await collectFiles(dist);
const jsFiles = distFiles.filter(
  (file) => file.endsWith(".js") && !file.endsWith("analytics.js"),
);
const jsBytes = (await Promise.all(jsFiles.map((file) => stat(file)))).reduce(
  (sum, item) => sum + item.size,
  0,
);
expect(
  jsBytes === 0,
  `expected zero first-party JavaScript, found ${jsBytes} bytes`,
);

if (failures.length) {
  console.error(
    `Generated output validation failed:\n- ${failures.join("\n- ")}`,
  );
  process.exit(1);
}
console.log("Generated output validation passed.");
