import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/products/ai-visibility/",
  "/products/commerce-intelligence/",
  "/products/supplier-operations/",
  "/products/bid-operations/",
];

const VIEWPORTS = [
  { width: 360, height: 780 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1080, height: 900 },
  { width: 1081, height: 900 },
  { width: 1440, height: 1000 },
];

/** Drive the view() reveal timelines to their end state before auditing. */
const settle = async (page: Page) => {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
};

for (const route of ROUTES) {
  test(`${route} has no horizontal overflow at any viewport`, async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await page.goto(route);
      await settle(page);
      const sizes = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(
        sizes.scroll,
        `${route} overflows at ${viewport.width}px`,
      ).toBeLessThanOrEqual(sizes.client + 1);
    }
  });

  test(`${route} passes an accessibility audit`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    // Reveals hold their subject at opacity 0 until its scroll range is
    // entered, and axe scores an invisible element as a contrast failure
    // against the surface behind it. Reduced motion is the state the page is
    // also drawn for, and it takes the reveals out entirely, so the audit sees
    // the colours the design actually ships.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await settle(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("homepage tells the product-first story in order", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText(
    "AI products for complex operational work.",
  );

  const headings = await page
    .getByRole("heading", { level: 2 })
    .allInnerTexts();
  expect(headings).toEqual([
    "Products built around real business workflows.",
    "Seven capabilities that turn models into reliable systems that improve over time.",
    "Different workflows. One production philosophy.",
    "Bring us a workflow.",
    "Products",
    "Company",
  ]);
});

test("the capability flow reads as three ordered phases", async ({ page }) => {
  await page.goto("/");

  // The phases are the argument, so they have to arrive in order and carry the
  // seven capabilities between them — no card outside a phase, none doubled.
  const phases = page.locator(".cap-phase");
  await expect(phases).toHaveCount(3);
  // textContent, not innerText: two of the three phases are visibility-hidden
  // at any scroll position once the flip is running, and innerText reports
  // hidden elements as empty.
  expect(
    (await phases.locator(".cap-phase__label").allTextContents()).map((text) =>
      text.trim(),
    ),
  ).toEqual(["Build", "Operate", "Improve"]);
  await expect(page.locator(".cap-item")).toHaveCount(7);

  // Numbering runs across the whole flow rather than restarting per phase:
  // that continuity is what makes the three rows one sequence.
  expect(
    (await page.locator(".cap-item__num").allTextContents()).map((text) =>
      text.trim(),
    ),
  ).toEqual(["01", "02", "03", "04", "05", "06", "07"]);

  // Nothing is singled out, and nothing is boxed: the capabilities are rows of
  // type on the band, so not one of them may carry a surface of its own. The
  // old grid promoted its first card to fill an orphan slot; there are no
  // cards left to promote.
  const grounds = await page
    .locator(".cap-item")
    .evaluateAll((items) =>
      items.map((item) => getComputedStyle(item).backgroundColor),
    );
  expect(new Set(grounds)).toEqual(new Set(["rgba(0, 0, 0, 0)"]));
});

test("no internal build name reaches the rendered pages", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const name of ["citeladder", "invoro", "saleserp", "rfpmanager"]) {
      expect(body, `${name} leaked on ${route}`).not.toContain(name);
    }
  }
});

test("every product card links to its own page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const links = page.locator(".product-card a.tlink");
  await expect(links).toHaveCount(4);
  for (const [index, route] of ROUTES.slice(1).entries()) {
    await expect(links.nth(index)).toHaveAttribute("href", route);
  }
});

test("conversation CTAs route to the parent contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const ctas = page.getByRole("link", {
    name: /start a conversation|bring us a workflow/i,
  });
  expect(await ctas.count()).toBeGreaterThan(0);
  for (const cta of await ctas.all()) {
    await expect(cta).toHaveAttribute(
      "href",
      /cube27\.com\/contact\/.*utm_source=ai\.cube27\.com/,
    );
  }
});

test("desktop products menu opens on hover and on keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const panel = page.locator(".nav-menu__panel");
  const trigger = page.locator(".nav-menu > .nav-link");

  await expect(panel).toBeHidden();
  await trigger.hover();
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link")).toHaveCount(4);

  // The visual gap between trigger and panel remains part of the hover target,
  // and a brief pointer slip does not collapse the menu immediately.
  const panelBox = await panel.boundingBox();
  if (!panelBox) throw new Error("Products panel has no bounding box");
  await page.mouse.move(panelBox.x + panelBox.width / 2, panelBox.y - 5);
  await expect(panel).toBeVisible();
  await page.mouse.move(20, 500);
  await page.waitForTimeout(75);
  await expect(panel).toBeVisible();
  await expect(panel).toBeHidden({ timeout: 1_000 });

  // Reload so the pointer is no longer over the menu, proving :focus-within
  // opens it on its own rather than riding on the previous :hover.
  await page.reload();
  await expect(panel).toBeHidden();
  await trigger.focus();
  await expect(panel).toBeVisible();
});

test("mobile navigation opens, links out, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".desktop-nav")).toBeHidden();

  const toggle = page.locator(".mobile-nav__toggle");
  const panel = page.locator("#mobile-menu");
  await expect(panel).toBeHidden();

  await toggle.click();
  await expect(panel).toBeVisible();
  await expect(
    panel.getByRole("link", { name: "AI Visibility" }),
  ).toBeVisible();

  // Escape is supplied by the popover API, not by a script.
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();

  // The panel is a full-viewport sheet, so light dismiss has no outside left
  // to click; the close button in its own header row is the affordance.
  await toggle.click();
  await expect(panel).toBeVisible();
  await panel.locator(".mobile-nav__close").click();
  await expect(panel).toBeHidden();

  // A link to an anchor on this same page never unloads the document, so the
  // panel has to take itself out of the top layer or it covers the section it
  // just jumped to.
  await toggle.click();
  await expect(panel).toBeVisible();
  await panel.getByRole("link", { name: "Capabilities" }).click();
  await expect(panel).toBeHidden();
  await expect(page).toHaveURL(/#capabilities$/);
  await expect(page.locator("#capabilities")).toBeInViewport();
});

test("ships only the analytics loader and the menu module", async ({
  page,
}) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/");
  const firstParty = scripts
    .filter((url) => new URL(url).origin === new URL(page.url()).origin)
    .map((url) => new URL(url).pathname);

  expect(firstParty).toContain("/analytics.js");
  // Everything else must be the one bundled module that closes the mobile
  // menu, and it must stay small enough to be beneath notice.
  const bundled = firstParty.filter((path) => path !== "/analytics.js");
  expect(bundled).toHaveLength(1);
  expect(bundled[0]).toMatch(/^\/_astro\/.+\.js$/);

  const response = await page.request.get(bundled[0]);
  expect((await response.body()).byteLength).toBeLessThan(1024);
});

test("the hero opens on a dark image plane the header floats over", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator(".hero");
  // One full-bleed decorative background, cropped to the section.
  const art = hero.locator(".hero__media img");
  await expect(art).toHaveCount(1);
  await expect(art).toHaveAttribute("alt", "");
  // complete alone is also true for an image that failed to load, so the
  // decoded width is what proves the artwork actually painted.
  await expect(art).toHaveJSProperty("complete", true);
  expect(
    await art.evaluate((el: HTMLImageElement) => el.naturalWidth),
  ).toBeGreaterThan(0);

  // The section's own ground stays the dark plane behind the art, so the
  // proposition keeps its contrast even if the image never paints.
  expect(
    await hero.evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(10, 13, 22)");

  // The header overlaps the hero rather than stacking above it: its box is
  // pulled back over the section, so the hero's top edge starts underneath.
  const [headerBox, heroBox] = await Promise.all([
    page.locator(".site-header").boundingBox(),
    hero.boundingBox(),
  ]);
  if (!headerBox || !heroBox) throw new Error("header or hero has no box");
  expect(heroBox.y).toBeLessThanOrEqual(headerBox.y + 1);

  // At scroll top the header carries no ground of its own — transparent over
  // the hero, with light ink — so the first viewport has no bar across it; it
  // resolves to a solid canvas bar with dark ink once content passes beneath.
  const header = page.locator(".site-header");
  expect(
    await header.evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgba(0, 0, 0, 0)");
  expect(await header.evaluate((el) => getComputedStyle(el).color)).toBe(
    "rgb(242, 244, 250)",
  );

  await page.evaluate(() => window.scrollTo(0, 400));
  await expect
    .poll(() => header.evaluate((el) => getComputedStyle(el).backgroundColor))
    .toBe("rgb(255, 255, 255)");
  await expect
    .poll(() => header.evaluate((el) => getComputedStyle(el).color))
    .toBe("rgb(12, 16, 36)");
});

test("product pages carry their own canonical, title and breadcrumb", async ({
  page,
}) => {
  await page.goto("/products/supplier-operations/");
  await expect(page).toHaveTitle("Supplier Order Operations — CUBE27 AI");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://ai.cube27.com/products/supplier-operations/",
  );
  await expect(page.locator("h1")).toContainText(
    "One flow from purchase order to reconciliation.",
  );
  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }),
  ).toBeVisible();
});

test("the site is usable with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".product-card").first()).toBeVisible();
  await expect(page.locator(".cap-item").first()).toBeVisible();
  await context.close();
});
