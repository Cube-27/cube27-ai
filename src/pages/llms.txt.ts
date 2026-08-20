import type { APIRoute } from "astro";
import { PRODUCT_PROOF, SERVICE_PATTERNS, SITE } from "@/data/site";

export const GET: APIRoute = () => {
  const body = `# Cube27 AI\n\n> ${SITE.description}\n\nCube27 AI is the AI engineering practice of Cube27. We design production AI systems that are grounded in trusted context, governed by appropriate controls, and observable in operation.\n\n## Core page\n\n- [Cube27 AI](${SITE.url}/): Capabilities, production patterns, product systems, and delivery method.\n\n## Production patterns\n\n${SERVICE_PATTERNS.map((item) => `- ${item.name}: ${item.detail}`).join("\n")}\n\n## Product systems\n\n${PRODUCT_PROOF.map((item) => `- ${item.name}: ${item.useCase}`).join("\n")}\n\n## Contact\n\n- [Start a conversation](${SITE.contactUrl})\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
