#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const routes = ["/", "/offers", "/robo-advisors", "/how-it-works"];
const projectRoot = process.cwd();
const distDir = path.resolve(projectRoot, "dist");

async function verifyHtml(route, filePath) {
  try {
    const html = await fs.readFile(filePath, "utf8");
    if (!html.includes("<title")) {
      throw new Error(`Missing <title> tag in prerendered output for ${route}`);
    }
    if (html.includes('data-react-helmet="true"')) {
      throw new Error(`Helmet data attributes not stripped in ${route}`);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Expected prerendered file not found for ${route} at ${filePath}`);
    }
    throw error;
  }
}

(async () => {
  try {
    await fs.access(distDir);
  } catch (error) {
    console.error(`[vite-prerender] dist directory not found at ${distDir}. Did you run \'vite build\'?`);
    process.exit(1);
  }

  const verifications = routes.map(async (route) => {
    const normalized = route === "/" ? "" : route.replace(/^\//, "");
    const filePath = normalized
      ? path.join(distDir, normalized, "index.html")
      : path.join(distDir, "index.html");
    await verifyHtml(route, filePath);
    return filePath;
  });

  try {
    const files = await Promise.all(verifications);
    console.log(`[vite-prerender] Verified prerendered routes: ${routes.join(", ")}`);
    files.forEach((filePath) => console.log(` - ${filePath}`));
  } catch (error) {
    console.error(`[vite-prerender] Verification failed: ${error.message}`);
    process.exit(1);
  }
})();
