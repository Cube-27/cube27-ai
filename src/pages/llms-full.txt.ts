import type { APIRoute } from "astro";
import {
  DELIVERY_STEPS,
  ENGINEERING_PRINCIPLES,
  PRODUCT_PROOF,
  SERVICE_PATTERNS,
  SITE,
} from "@/data/site";

export const GET: APIRoute = () => {
  const body = `# Cube27 AI — Production AI Systems\n\nCanonical URL: ${SITE.url}/\n\n${SITE.description}\n\n## Engineering posture\n\nProduction AI for real work. Data, controls, and interfaces for reliable AI workflows.\n\n${ENGINEERING_PRINCIPLES.map((item) => `- ${item.label}: ${item.statement} ${item.detail}.`).join("\n")}\n\nOutcome: Reliable AI in daily workflows.\n\n## Production patterns\n\n${SERVICE_PATTERNS.map((item) => `- ${item.name}: ${item.detail}`).join("\n")}\n\n## Product systems\n\n${PRODUCT_PROOF.map((item) => `### ${item.name}\n\n${item.label}. ${item.useCase} Best for ${item.focus}. Outcome metric: ${item.metric}.`).join("\n\n")}\n\n## Delivery method\n\nStart with the decision. Build the system around it. The goal is not to introduce AI everywhere. It is to make one valuable workflow faster, clearer, and more capable — then expand from a working foundation.\n\n${DELIVERY_STEPS.map((item) => `${item.step}. ${item.name}: ${item.detail}`).join("\n")}\n\n## Contact and publisher\n\nCube27 AI is part of ${SITE.organization.legalName}. Contact ${SITE.email} or [start a conversation](${SITE.contactUrl}).\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
