import type { APIRoute } from "astro";
import {
  ADAPT_BLOCK,
  CAPABILITIES_INTRO,
  PHASES,
  PHILOSOPHY_INTRO,
  PHILOSOPHY_STEPS,
} from "@/data/capabilities";
import { HERO, PRODUCTS_INTRO } from "@/data/home";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export const GET: APIRoute = () => {
  const productSections = PRODUCTS.map((product) => {
    const url = `${SITE.url}/products/${product.slug}/`;
    const capabilities = product.capabilities.map(
      (capability) => `- ${capability.name}: ${capability.detail}`,
    );

    return [
      `### ${product.name}`,
      "",
      `Canonical URL: ${url}`,
      "",
      product.hero.title,
      "",
      product.hero.lead,
      "",
      `**${product.problem.title}**`,
      "",
      ...product.problem.body,
      "",
      "Core capabilities:",
      "",
      ...capabilities,
      "",
      `Workflow: ${product.workflow.join(" → ")}`,
      "",
      `${product.closing.title} ${product.closing.body}`,
    ].join("\n");
  });

  const body = [
    `# ${SITE.name}`,
    "",
    `Canonical URL: ${SITE.url}/`,
    "",
    HERO.title,
    "",
    HERO.lead,
    "",
    `## ${PRODUCTS_INTRO.title}`,
    "",
    PRODUCTS_INTRO.lead,
    "",
    ...productSections,
    "",
    `## ${CAPABILITIES_INTRO.title}`,
    "",
    /* Grouped by phase here too: the order is the argument, and a flat list
       would hand a reader the same seven names with the sequence stripped
       out — the thing the page was redesigned to stop doing. */
    ...PHASES.flatMap((phase) => [
      `### ${phase.label}`,
      "",
      ...phase.capabilities.map(
        (capability) => `- ${capability.name}: ${capability.detail}`,
      ),
      "",
    ]),
    `## ${PHILOSOPHY_INTRO.title}`,
    "",
    PHILOSOPHY_INTRO.lead,
    "",
    ...PHILOSOPHY_STEPS.map(
      (item) => `${item.step}. ${item.name}: ${item.detail}`,
    ),
    "",
    `## ${ADAPT_BLOCK.title}`,
    "",
    ADAPT_BLOCK.body,
    "",
    "## Contact and publisher",
    "",
    `CUBE27 AI is part of ${SITE.organization.legalName}. Contact ${SITE.email} or start a conversation at ${SITE.contactUrl}.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
