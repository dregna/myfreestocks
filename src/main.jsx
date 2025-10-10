import "./index.css";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

if (rootElement?.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  const root = createRoot(rootElement);
  root.render(app);
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const announceReady = () => {
    document.dispatchEvent(new Event("prerender-ready"));
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(announceReady);
  } else {
    window.setTimeout(announceReady, 0);
  }
}
