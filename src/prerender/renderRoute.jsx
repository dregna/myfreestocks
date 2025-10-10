import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Offers from "@/pages/offers";
import RoboAdvisors from "@/pages/RoboAdvisors";
import HowItWorks from "@/pages/HowItWorks";
import BrokerDeepDivePage from "@/pages/broker/[slug]";

export async function renderRoute(url) {
  const helmetContext = {};

  const markup = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/robo-advisors" element={<RoboAdvisors />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/broker/:slug" element={<BrokerDeepDivePage />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </HelmetProvider>
  );

  return {
    html: markup,
    helmet: helmetContext.helmet ?? null,
  };
}
