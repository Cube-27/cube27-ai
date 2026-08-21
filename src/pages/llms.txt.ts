import type { APIRoute } from "astro";
import { CAPABILITIES } from "@/data/capabilities";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export const GET: APIRoute = () => {
  const body = [
    `# ${SITE.brand}`,
    "",
    `> ${SITE.description}`,
    "",
    "CUBE27 AI is the AI product practice of CUBE27. We build focused systems for workflows where teams spend too much time collecting information, reconciling data, reviewing documents or figuring out what changed.",
    "",
    "## Pages",
    "",
    `- [${SITE.brand}](${SITE.url}/): Product systems, capabilities and how we build.`,
    ...PRODUCTS.map(
      (product) =>
        `- [${product.name}](${SITE.url}/products/${product.slug}/): ${product.promise}`,
    ),
    "",
    "## Product systems",
    "",
    ...PRODUCTS.map((product) => `- ${product.name}: ${product.summary}`),
    "",
    "## Production capabilities",
    "",
    ...CAPABILITIES.map(
      (capability) => `- ${capability.name}: ${capability.detail}`,
    ),
    "",
    "## Contact",
    "",
    `- [Start a conversation](${SITE.contactUrl})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
