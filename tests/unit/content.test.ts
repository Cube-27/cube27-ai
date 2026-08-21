import { describe, expect, it } from "vitest";
import { CAPABILITIES, PHILOSOPHY_STEPS } from "@/data/capabilities";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_LINKS, SITE } from "@/data/site";
import { buildHomeSchema, buildProductSchema } from "@/lib/schema";

/** Build names that must never reach the public site. */
const INTERNAL_NAMES = ["CiteLadder", "Invoro", "SalesERP", "RFPmanager"];

describe("content model", () => {
  it("ships four product systems and seven capabilities", () => {
    expect(PRODUCTS).toHaveLength(4);
    expect(CAPABILITIES).toHaveLength(7);
    expect(PHILOSOPHY_STEPS).toHaveLength(4);
  });

  it("gives every product a slug, hue, visual and full page content", () => {
    const slugs = new Set<string>();
    const hues = new Set<string>();

    for (const product of PRODUCTS) {
      expect(product.slug).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(product.capabilities.length).toBeGreaterThanOrEqual(6);
      expect(product.workflow.length).toBeGreaterThanOrEqual(5);
      expect(product.problem.body.length).toBeGreaterThan(0);
      expect(product.hero.title).not.toBe("");
      expect(product.closing.title).not.toBe("");
      slugs.add(product.slug);
      hues.add(product.hue);
    }

    expect(slugs.size).toBe(PRODUCTS.length);
    // Each product owns a distinct hue from the CUBE27 mark.
    expect(hues.size).toBe(PRODUCTS.length);
  });

  it("never exposes internal build names", () => {
    const surface = JSON.stringify([
      PRODUCTS,
      CAPABILITIES,
      PHILOSOPHY_STEPS,
      SITE,
    ]);
    for (const name of INTERNAL_NAMES) {
      expect(surface).not.toContain(name);
    }
  });

  it("derives navigation links from the product list", () => {
    expect(PRODUCT_LINKS.map((link) => link.href)).toEqual(
      PRODUCTS.map((product) => `/products/${product.slug}/`),
    );
  });

  it("uses canonical production destinations", () => {
    expect(SITE.url).toBe("https://ai.cube27.com");
    expect(SITE.contactUrl).toContain("https://www.cube27.com/contact/");
    expect(SITE.contactUrl).toContain("utm_source=ai.cube27.com");
  });
});

describe("structured data", () => {
  it("builds the home graph from visible content", () => {
    const schema = JSON.stringify(buildHomeSchema());
    for (const item of [...CAPABILITIES, ...PRODUCTS]) {
      expect(schema).toContain(item.name);
    }
    expect(schema).toContain('"@type":"ItemList"');
  });

  it("builds a product graph with breadcrumbs and capabilities", () => {
    for (const product of PRODUCTS) {
      const schema = JSON.stringify(buildProductSchema(product));
      expect(schema).toContain('"@type":"BreadcrumbList"');
      expect(schema).toContain(`${SITE.url}/products/${product.slug}/`);
      for (const capability of product.capabilities) {
        expect(schema).toContain(capability.name);
      }
    }
  });
});
