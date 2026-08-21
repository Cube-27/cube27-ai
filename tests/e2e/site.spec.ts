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
    "Seven capabilities behind every CUBE27 AI system.",
    "Different workflows. One production philosophy.",
    "Bring us a workflow.",
    "Products",
    "Company",
  ]);
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

  // Reload so the pointer is no longer over the menu, proving :focus-within
  // opens it on its own rather than riding on the previous :hover.
  await page.reload();
  await expect(panel).toBeHidden();
  await trigger.focus();
  await expect(panel).toBeVisible();
});

test("mobile navigation opens, links out, and light-dismisses", async ({
  page,
}) => {
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

  await toggle.click();
  await expect(panel).toBeVisible();
  await page.mouse.click(200, 700);
  await expect(panel).toBeHidden();
});

test("ships no first-party JavaScript beyond analytics", async ({ page }) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/");
  const firstParty = scripts.filter(
    (url) => new URL(url).origin === new URL(page.url()).origin,
  );
  expect(firstParty.map((url) => new URL(url).pathname)).toEqual([
    "/analytics.js",
  ]);
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
  await expect(page.locator(".cap-card").first()).toBeVisible();
  await context.close();
});
