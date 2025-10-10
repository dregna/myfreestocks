import path from "node:path";
import { promises as fs } from "node:fs";
import { createServer } from "vite";

class ReactRenderer {
  constructor(options = {}) {
    this.options = options;
    this.server = null;
    this.template = null;
  }

  async initialize() {
    this.server = await createServer({
      configFile: path.resolve("vite.config.js"),
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "custom",
      logLevel: "error",
    });

    const templatePath = this.options.template
      ? path.resolve(this.options.template)
      : path.resolve("dist", "index.html");

    this.template = await fs.readFile(templatePath, "utf8");
  }

  async renderRoutes(routes) {
    if (!this.server) {
      throw new Error("ReactRenderer must be initialized before rendering routes.");
    }

    const renderModule = await this.server.ssrLoadModule("/src/prerender/renderRoute.jsx");
    const renderRoute = renderModule.renderRoute || renderModule.default;

    const results = [];
    for (const route of routes) {
      const { html, helmet } = await renderRoute(route);
      const renderedHtml = this.composeHtml(html, helmet);
      results.push({ route, html: renderedHtml });
    }

    return results;
  }

  composeHtml(appHtml, helmet) {
    if (!this.template) {
      throw new Error("HTML template not loaded before composing prerender output.");
    }

    let html = this.template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    if (helmet) {
      if (helmet.htmlAttributes) {
        html = html.replace(
          /<html([^>]*)>/i,
          `<html${helmet.htmlAttributes.toString()}$1>`
        );
      }

      if (helmet.bodyAttributes) {
        html = html.replace(
          /<body([^>]*)>/i,
          `<body${helmet.bodyAttributes.toString()}$1>`
        );
      }

      const headTags = [
        helmet.title?.toString() ?? "",
        helmet.meta?.toString() ?? "",
        helmet.link?.toString() ?? "",
        helmet.script?.toString() ?? "",
      ]
        .filter(Boolean)
        .join("");

      if (headTags) {
        html = html.replace("</head>", `${headTags}</head>`);
      }
    }

    return html;
  }

  async destroy() {
    if (this.server) {
      await this.server.close();
      this.server = null;
    }
  }
}

export default ReactRenderer;
