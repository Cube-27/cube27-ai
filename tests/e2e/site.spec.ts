import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1050, height: 900 },
  { width: 1051, height: 900 },
  { width: 1440, height: 1000 },
];

for (const viewport of viewports) {
  test(`renders without horizontal overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator("h1")).toContainText(
      "AI systems that stay grounded",
    );
    const sizes = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.client + 1);
  });
}

test("has accessible landmarks, navigation, and CTA destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("main#main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(5);
  const ctas = page.getByRole("link", {
    name: /start a conversation|map your production path|bring us a workflow/i,
  });
  await expect(ctas).toHaveCount(3);
  for (const cta of await ctas.all()) {
    await expect(cta).toHaveAttribute(
      "href",
      /cube27\.com\/contact\/.*utm_source=ai\.cube27\.com/,
    );
  }
  const menu = page.locator(".mobile-nav");
  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  const patternsLink = menu.getByRole("link", { name: "Patterns" });
  await expect(patternsLink).toBeVisible();
  await expect(ctas).toHaveCount(4);
  await patternsLink.click();
  await expect(page).toHaveURL(/#patterns$/);
  await expect(menu.locator("nav")).toBeHidden();
});

test("keeps navigation available across the tablet boundary", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  await expect(page.locator(".mobile-nav")).toBeVisible();
  await expect(page.locator(".desktop-nav")).toBeHidden();
  await page.setViewportSize({ width: 1051, height: 900 });
  await expect(page.locator(".desktop-nav")).toBeVisible();
});

test("meets automated accessibility checks", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("retains content and focus behavior with reduced motion and 200% zoom", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  // A half-size CSS viewport models a 200% browser zoom reflow at 768×1024.
  await page.setViewportSize({ width: 384, height: 512 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const patternsHeading = page.getByRole("heading", {
    name: "Production AI patterns.",
  });
  await patternsHeading.evaluate((element) => element.scrollIntoView());
  await expect(patternsHeading).toBeVisible();
  const zoomedSizes = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(zoomedSizes.scroll).toBeLessThanOrEqual(zoomedSizes.client + 1);
});
