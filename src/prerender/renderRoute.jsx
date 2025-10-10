import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "../AppRoutes.jsx";

export async function renderRoute(url) {
  const helmetContext = {};
  if (typeof HelmetProvider !== "function") {
    throw new Error("HelmetProvider is not available in react-helmet-async");
  }
  const markup = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>
  );

  return {
    html: markup,
    helmet: helmetContext.helmet ?? null,
  };
}
