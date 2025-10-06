import React from "react";
import { Link, useParams } from "react-router-dom";
import ScoreBadge from "../components/score/ScoreBadge";
import brokers from "../data/brokers";

export default function OfferDetail() {
  const { slug } = useParams();
  const broker = brokers.find((entry) => entry.slug === slug);

  if (!broker) {
    return (
      <div className="min-h-screen bg-[#050B1A] text-slate-100">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
          <p className="text-lg text-slate-300">Broker not found.</p>
          <Link
            to="/offers"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
          >
            <span aria-hidden>←</span> Back to offers
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B1A] text-slate-100">
      <main className="mx-auto max-w-4xl px-4 py-16">
        <Link
          to="/offers"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
        >
          <span aria-hidden>←</span> All offers
        </Link>

        <div className="rounded-3xl border border-white/5 bg-[#0B1622] p-10 shadow-[0_30px_80px_-60px_rgba(16,185,129,0.5)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">{broker.name} Review</h1>
              <p className="mt-2 text-lg text-slate-300">{broker.summary}</p>
            </div>
            <ScoreBadge score={broker.score} className="bg-white/5" />
          </div>

          <p className="mt-8 text-base leading-relaxed text-slate-200">{broker.description}</p>

          {broker.promotion ? (
            <section className="mt-10 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-emerald-100">
              <h2 className="text-xl font-semibold text-emerald-300">Current Promotion</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <span className="font-semibold">Headline:</span> {broker.promotion.headline}
                </li>
                <li>
                  <span className="font-semibold">Bonus:</span> {broker.promotion.value}
                </li>
                <li>
                  <span className="font-semibold">Requirement:</span> {broker.promotion.requirement}
                </li>
                <li>
                  <span className="font-semibold">Payout:</span> {broker.promotion.payout}
                </li>
              </ul>
            </section>
          ) : null}

          {Array.isArray(broker.perks) && broker.perks.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-white">Why we like {broker.name}</h2>
              <ul className="mt-4 space-y-2 text-slate-200">
                {broker.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-emerald-400" aria-hidden />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-10">
            <a
              href={broker.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
