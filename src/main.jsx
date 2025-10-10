import "./index.css"; // ✅ this line is critical
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Offers from "./pages/offers.jsx";
import BrokerDeepDivePage from "./pages/broker/[slug].jsx";
import RoboAdvisors from "./pages/RoboAdvisors.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/broker/:slug" element={<BrokerDeepDivePage />} />
        <Route path="/robo-advisors" element={<RoboAdvisors />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
