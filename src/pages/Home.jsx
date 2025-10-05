import React from "react";
import TickerBar from "../components/TickerBar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Promotions from "../components/Promotions";
import RoboAdvisorTable from "../components/RoboAdvisorTable";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-neutral text-gray-900">
      <TickerBar />
      <Navbar />
      <Hero />
      <Promotions />
      <RoboAdvisorTable />
      <Footer />
    </div>
  );
}
