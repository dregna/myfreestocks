import React, { useState } from "react";
import { Link } from "react-router-dom";
import brokers from "../data/brokers";
import ScoreBadge from "../components/score/ScoreBadge";

function sortBrokersByScore(entries) {
  return [...entries].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export default function Offers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sortedBrokers = sortBrokersByScore(brokers);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#050B1A] text-slate-100">
      <header className="border-b border-slate-800 bg-[#050B1A]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <Link to="/" className="flex items-center gap-3" onClick={handleCloseMenu}>
            <img src="/logo-dark.svg" alt="MyFreeStocks.com" className="h-9 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <Link to="/offers" className="transition hover:text-emerald-300">
              Offers
            </Link>
            <a href="/#how-it-works" className="transition hover:text-emerald-300">
              How It Works
            </a>
            <a href="/#ai-robo" className="transition hover:text-emerald-300">
              AI Robo-Advisors
            </a>
            <a href="/#contact" className="transition hover:text-emerald-300">
              Contact
            </a>
          </nav>
          <a
            href="/offers"
            className="hidden rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110 md:inline-flex"
          >
            Compare Offers
          </a>
          <button
            type="button"
            onClick={handleToggleMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-200 ease-in-out hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <span className="flex h-5 w-6 flex-col items-center justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-white transition duration-200 ease-in-out ${
                  isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-white transition duration-200 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-white transition duration-200 ease-in-out ${
                  isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
        {isMenuOpen ? (
          <div className="border-t border-white/5 bg-[#050B1A] px-4 py-6 md:hidden">
            <div className="space-y-3 text-sm text-slate-200">
              <Link
                to="/offers"
                onClick={handleCloseMenu}
                className="block rounded-lg px-3 py-2 transition hover:bg-white/10"
              >
                Offers
              </Link>
              <a
                href="/#how-it-works"
                onClick={handleCloseMenu}
                className="block rounded-lg px-3 py-2 transition hover:bg-white/10"
              >
                How It Works
              </a>
              <a
                href="/#ai-robo"
                onClick={handleCloseMenu}
                className="block rounded-lg px-3 py-2 transition hover:bg-white/10"
              >
                AI Robo-Advisors
              </a>
              <a
                href="/#contact"
                onClick={handleCloseMenu}
                className="block rounded-lg px-3 py-2 transition hover:bg-white/10"
              >
                Contact
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <ScoreBadge score={sortedBrokers[0]?.score ?? 0} subtitle="Top Offer" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white md:text-5xl">Compare Verified Free Stock Offers</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
            Explore the MyFreeStock Score™ for each broker, read our editorial reviews, and claim the bonus that matches your
            investing style.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {sortedBrokers.map((broker) => (
            <article
              key={broker.slug}
              className="flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-[#0B1622] p-8 shadow-[0_30px_80px_-60px_rgba(16,185,129,0.5)]"
            >
              <div className="space-y-5">
                <Link to={`/offers/${broker.slug}`} className="inline-flex">
                  <ScoreBadge score={broker.score} className="bg-white/5" />
                </Link>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">{broker.name}</h2>
                  <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">MyFreeStock Score™ {broker.score}</p>
                  <p className="text-slate-300">{broker.summary}</p>
                </div>
                {broker.promotion ? (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                    <p className="font-semibold text-emerald-300">{broker.promotion.headline}</p>
                    <ul className="mt-2 space-y-1 text-emerald-100">
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
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={broker.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                >
                  Claim Offer
                </a>
                <Link
                  to={`/offers/${broker.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
                >
                  Read Review
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
