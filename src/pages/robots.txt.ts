import type { APIRoute } from "astro";
import { SITE } from "@/data/site";

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
