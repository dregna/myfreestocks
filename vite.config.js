import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");
const ReactRenderer = require("./scripts/prerender/reactRenderer.cjs");
const distDir = fileURLToPath(new URL("./dist", import.meta.url));

/**
 * Vite executes this config in an ESM context (package.json => "type": "module"),
 * so Node's __dirname helper is unavailable. We derive the source directory path
 * from import.meta.url + fileURLToPath to keep the "@" alias stable in dev and
 * production builds without relying on CommonJS globals.
 */
export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: distDir,
      routes: ["/", "/offers", "/robo-advisors", "/how-it-works"],
      renderer: new ReactRenderer({
        template: path.join(distDir, "index.html"),
      }),
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html.replace(
          /data-react-helmet="true"/g,
          ""
        );
        return renderedRoute;
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "react-router-dom": fileURLToPath(
        new URL("./node_modules/react-router-dom/dist/index.mjs", import.meta.url)
      ),
      "react-router/dom": fileURLToPath(
        new URL("./node_modules/react-router/dist/development/dom-export.mjs", import.meta.url)
      ),
    },
    conditions: ["module-sync", "import", "default"],
  },
  ssr: {
    noExternal: ["react-router-dom", "react-router", "react-helmet-async"],
  },
});
