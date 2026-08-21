// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ai.cube27.com",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "never",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never inline a bundled asset into the HTML: the CSP allows neither an
      // inline <script> nor an inline <style>, so everything must be a file
      // served from this origin.
      assetsInlineLimit: 0,
    },
    server: {
      strictPort: true,
    },
  },
  server: {
    port: 3200,
    open: false,
  },
  devToolbar: {
    enabled: false,
  },
});
