import React from "react";

const promos = [
  { name: "Webull", desc: "Up to 12 free stocks", cta: "Get Bonus" },
  { name: "Robinhood", desc: "A free stock", cta: "Get Bonus" },
  { name: "Schwab", desc: "Up to $100", cta: "Get Bonus" },
  { name: "Betterment", desc: "Up to $500", cta: "Get Bonus" },
];

export default function Promotions() {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-2">Promotions</h2>
      <p className="text-gray-600 mb-6">
        Brokerage and robo-advisor bonuses change often. We track today’s top sign-up incentives so you can start investing with an edge.
      </p>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
        {promos.map((promo) => (
          <div key={promo.name} className="card text-center">
            <h3 className="font-semibold text-lg mb-2">{promo.name}</h3>
            <p className="text-gray-500 mb-4">{promo.desc}</p>
            <button className="btn-primary w-full">{promo.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
