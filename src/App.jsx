import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Offers from "@/pages/offers";
import RoboAdvisors from "@/pages/RoboAdvisors";
import HowItWorks from "@/pages/HowItWorks";
import BrokerDeepDivePage from "@/pages/broker/[slug]";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/robo-advisors" element={<RoboAdvisors />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/broker/:slug" element={<BrokerDeepDivePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
