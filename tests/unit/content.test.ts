import { describe, expect, it } from "vitest";
import {
  DELIVERY_STEPS,
  PRODUCT_PROOF,
  SERVICE_PATTERNS,
  SITE,
} from "@/data/site";
import { buildHomeSchema } from "@/lib/schema";

describe("site content model", () => {
  it("keeps the approved inventory stable", () => {
    expect(SERVICE_PATTERNS).toHaveLength(7);
    expect(PRODUCT_PROOF.map((item) => item.name)).toEqual([
      "Invoro",
      "CiteLadder",
      "SalesERP",
      "RFPmanager",
    ]);
    expect(DELIVERY_STEPS).toHaveLength(4);
  });

  it("uses canonical production destinations", () => {
    expect(SITE.url).toBe("https://ai.cube27.com");
    expect(SITE.contactUrl).toContain("https://www.cube27.com/contact/");
    expect(SITE.contactUrl).toContain("utm_source=ai.cube27.com");
  });

  it("builds schema from visible content", () => {
    const schema = JSON.stringify(buildHomeSchema());
    for (const item of [...SERVICE_PATTERNS, ...PRODUCT_PROOF]) {
      expect(schema).toContain(item.name);
    }
  });
});
