#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const routes = ["/", "/offers", "/robo-advisors", "/how-it-works"];
const distDir = path.resolve(process.cwd(), "dist");

const checks = [
  {
    label: "title tag",
    test: (html) => /<title>[^<]*<\/title>/i.test(html),
    message: "Missing <title> tag",
  },
  {
    label: "canonical link",
    test: (html) => /rel=["']canonical["']/i.test(html),
    message: "Missing rel=\"canonical\" link",
  },
  {
    label: "Open Graph meta",
    test: (html) => /property=["']og:/i.test(html),
    message: "Missing Open Graph meta tags",
  },
  {
    label: "JSON-LD script",
    test: (html) => /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(html),
    message: "Missing structured data JSON-LD script",
  },
  {
    label: "helmet artifacts removed",
    test: (html) => !/data-react-helmet=/.test(html),
    message: "data-react-helmet attributes still present",
  },
];

async function ensureDistExists() {
  try {
    await fs.access(distDir);
  } catch (error) {
    console.error(`[vite-prerender] dist directory not found at ${distDir}.`);
    console.error("Did you run `vite build` first?");
    process.exit(1);
  }
}

function routeToFile(route) {
  if (route === "/") {
    return path.join(distDir, "index.html");
  }
  const normalized = route.replace(/^\//, "");
  return path.join(distDir, normalized, "index.html");
}

async function verifyRoute(route) {
  const filePath = routeToFile(route);
  let html;
  try {
    html = await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Expected prerendered file not found at ${filePath}`);
    }
    throw error;
  }

  for (const check of checks) {
    if (!check.test(html)) {
      throw new Error(`${check.message} in prerendered output for ${route}`);
    }
  }

  return filePath;
}

async function main() {
  await ensureDistExists();

  try {
    const files = await Promise.all(routes.map(verifyRoute));
    console.log(`[vite-prerender] Verified prerendered routes: ${routes.join(", ")}`);
    files.forEach((filePath) => console.log(` - ${filePath}`));
  } catch (error) {
    console.error(`[vite-prerender] Verification failed: ${error.message}`);
    process.exit(1);
  }
}

main();
