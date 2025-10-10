import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import ReactRenderer from "./scripts/prerender/reactRenderer.js";

const require = createRequire(import.meta.url);
const prerenderModule = require("vite-plugin-prerender");
const prerender = prerenderModule?.default ?? prerenderModule;

const distDir = fileURLToPath(new URL("./dist", import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: distDir,
      routes: ["/", "/offers", "/robo-advisors", "/how-it-works"],
      renderer: new ReactRenderer({
        template: `${distDir}/index.html`,
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
  },
  ssr: {
    noExternal: ["react-router-dom", "react-router", "react-helmet-async"],
  },
});
