import React from "react";
import TickerBar from "../TickerBar";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PageShell({ children, mainClassName = "" }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral text-gray-900">
      <TickerBar />
      <Navbar />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
}
