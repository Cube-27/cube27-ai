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
    server: {
      strictPort: true,
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  devToolbar: {
    enabled: false,
  },
});
