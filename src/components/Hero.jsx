import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center py-16 px-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Earn bonuses while you invest.
        </h1>
        <p className="text-gray-600 mb-6">
          Track real-time markets and sign-up incentives from top brokers and advisors.
        </p>
        <Link
          to="/offers"
          className="inline-flex rounded-lg bg-primary px-6 py-3 text-white transition-all hover:bg-secondary"
        >
          See Today’s Top Offers
        </Link>
      </div>
      <div className="bg-white p-6 shadow-card rounded-xl border border-gray-100">
        <h3 className="text-lg font-semibold mb-3">Market Overview</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex justify-between"><span>US Indices</span><span className="text-green-600">+0.56%</span></li>
          <li className="flex justify-between"><span>Futures</span><span className="text-green-600">+0.23%</span></li>
          <li className="flex justify-between"><span>Crypto</span><span className="text-red-500">-0.27%</span></li>
          <li className="flex justify-between"><span>Forex</span><span className="text-green-600">+0.41%</span></li>
        </ul>
      </div>
    </section>
  );
}
