import "./index.css"; // ✅ this line is critical
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Offers from "./pages/Offers.jsx";
import OfferDetail from "./pages/OfferDetail.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:slug" element={<OfferDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
