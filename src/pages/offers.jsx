import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ScoreCard from "../components/score/ScoreCard";
import ScoreBadge from "../components/score/ScoreBadge";
import useBrokerData from "../hooks/useBrokerData";

function computeScore(breakdown = {}) {
  const values = Object.values(breakdown).map((value) => Number(value));
  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce((sum, current) => sum + current, 0);
  return Math.round(total / values.length);
}

function formatVerificationDate(dateString) {
  if (!dateString) {
    return "Last verified 2025";
  }

  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return `Verified ${dateString}`;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export default function OffersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    data: brokerData,
    isLoading: brokersLoading,
    error: brokersError,
  } = useBrokerData();

  const offers = useMemo(
    () =>
      brokerData.map((offer) => {
        const computedScore = Number.isFinite(offer?.score?.overall)
          ? Number(offer.score.overall)
          : computeScore(offer.score?.breakdown ?? {});

        const offerDetails = offer?.offer ?? {};

        return {
          ...offer,
          computedScore,
          offerDetails: {
            value:
              offerDetails.value ??
              offerDetails.headline ??
              offerDetails.summary ??
              offerDetails?.details ??
              offerDetails,
            requirement:
              offerDetails.requirement ??
              offer.minDeposit ??
              "See promotion requirements",
            payout:
              offerDetails.payout ?? "See terms for payout timeline",
            expiration:
              offerDetails.expiration ??
              (offer.lastChecked
                ? `Verified ${formatVerificationDate(offer.lastChecked)}`
                : "Verified 2025"),
          },
          cta: {
            label: offer?.cta?.label ?? "Sign Up",
            href:
              offer?.promoLink ??
              offer?.cta?.href ??
              offer?.referralUrl ??
              "#",
          },
        };
      }),
    [brokerData]
  );

  const summary = useMemo(() => {
    if (offers.length === 0) {
      return { averageScore: 0, topOffer: null };
    }

    const totalScore = offers.reduce(
      (sum, current) => sum + (current.computedScore ?? 0),
      0
    );
    const topOffer = offers.reduce((best, current) => {
      if (!best) return current;
      return (current.computedScore ?? 0) > (best.computedScore ?? 0)
        ? current
        : best;
    }, null);

    return {
      averageScore: Math.round(totalScore / offers.length),
      topOffer,
    };
  }, [offers]);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#050B1A] text-slate-100">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

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
        <div
          className={`md:hidden transform border-t border-slate-800 bg-[#0B1622] text-white transition-all duration-200 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 px-4 py-4 text-sm font-semibold">
            <Link
              to="/"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              to="/offers"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              Offers
            </Link>
            <a
              href="/#compare"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              Compare
            </a>
            <a
              href="/#ai-robo"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              Robo-Advisors
            </a>
            <a
              href="/offers"
              onClick={handleCloseMenu}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
            >
              See Offers
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="mt-12 rounded-3xl bg-gradient-to-br from-[#0A1328] via-[#0F1D3A] to-[#12224A] p-10 shadow-[0_40px_120px_-60px_rgba(16,185,129,0.7)]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                MyFreeStock Score™
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  The MyFreeStock Score™ System
                </h1>
                <p className="mt-4 text-lg text-slate-300">
                  Independent ratings for brokers and robo-advisors
                </p>
              </div>
              <p className="text-base text-slate-300 sm:text-lg">
                The Score™ measures transparency, cost, platform features, customer support, and historical returns. Each category is weighted into a 0–100 composite that refreshes every week so you can track who leads the market in real time.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#scores"
                  className="rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:scale-[1.02]"
                >
                  Compare All Scores
                </a>
                <Link
                  to="/"
                  className="rounded-full border border-emerald-400/40 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
            {summary.topOffer && (
              <div className="relative overflow-hidden rounded-[36px] border border-emerald-400/20 bg-[#0A152E] p-8 shadow-xl">
                <div className="absolute inset-0 -translate-y-6 translate-x-6 rounded-[40px] bg-emerald-500/20 blur-3xl" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                      Highest Score This Week
                    </span>
                    <ScoreBadge score={summary.topOffer.computedScore} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">{summary.topOffer.name}</p>
                    <p className="text-sm text-slate-300">
                      Our toolkit highlights standout offers where balanced pricing, robust tools, and long-term performance align.
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    <span>Scoreboard Average</span>
                    <span className="text-xl font-semibold text-white">{summary.averageScore}</span>
                  </div>
                  <a
                    href={summary.topOffer.cta?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                  >
                    {summary.topOffer.cta?.label ?? "Claim Offer"}
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid gap-4 rounded-3xl border border-emerald-400/20 bg-[#071025] p-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Transparency", weight: "25%" },
              { label: "Cost", weight: "20%" },
              { label: "Features", weight: "20%" },
              { label: "Support", weight: "15%" },
              { label: "Returns", weight: "20%" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center rounded-2xl bg-white/5 p-4 text-center text-slate-200 shadow-[inset_0_1px_0_rgba(148,163,184,0.08)]"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v18m9-9H3"
                    />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-white">{metric.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-emerald-300">{metric.weight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-400/20 bg-[#09152B] p-10 text-slate-200 shadow-[0_30px_90px_-60px_rgba(16,185,129,0.6)]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Calculate the Score</h2>
            <p className="mt-4 text-base text-slate-300">
              Each category is reviewed with a proprietary rubric that weights objective data, platform disclosures, and real user feedback. We rebalance weekly to reflect product launches, pricing shifts, and new regulatory updates.
            </p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {["Transparency digs into fee clarity and disclosures.", "Cost covers commissions, spreads, and account minimums.", "Features evaluate investing tools, automation, and integrations.", "Support measures human and digital help options.", "Returns tracks historical performance where disclosed."].map(
                (item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-[#0B1A33] p-4">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <p className="text-sm text-slate-200">{item}</p>
                  </div>
                )
              )}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-2 border-emerald-400/40 bg-[#0B1A33] shadow-inner shadow-emerald-500/20">
                <div className="absolute inset-4 rounded-full border border-emerald-400/30" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Weighting</p>
                  <p className="mt-2 text-3xl font-bold text-white">0 – 100</p>
                  <p className="mt-1 text-xs text-slate-300">Updated Weekly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-400/20 bg-[#071025] p-10 shadow-[0_30px_90px_-70px_rgba(16,185,129,0.6)]">
          <div className="flex flex-col gap-4 text-center">
            <span className="mx-auto rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Toolkit
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">The MyFreeStocks Toolkit</h2>
            <p className="mx-auto max-w-2xl text-base text-slate-300">
              Pair the Score™ with specialized research workflows designed to keep your investing stack transparent and opportunity-ready.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Free Stock Offer Tracker",
                description:
                  "Monitor every live brokerage incentive with auto-refreshing terms, deadlines, and funding requirements.",
              },
              {
                title: "Robo-Advisor Comparison",
                description:
                  "Benchmark automation styles, portfolio mixes, and advisory fees with filters made for both beginners and pros.",
              },
              {
                title: "Data Transparency Dashboard",
                description:
                  "Review disclosures, regulatory filings, and service-level agreements directly inside your Score™ workspace.",
              },
            ].map((tool) => (
              <div
                key={tool.title}
                className="group flex flex-col gap-4 rounded-3xl border border-white/5 bg-[#0B1A33]/80 p-6 text-left shadow-[0_25px_60px_-50px_rgba(16,185,129,0.6)] transition hover:border-emerald-400/50 hover:shadow-emerald-500/20"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h10"
                    />
                  </svg>
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
                  <p className="text-sm text-slate-300">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="scores" className="mt-12">
          <div className="flex flex-col gap-4 text-center">
            <span className="mx-auto rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Ranked Brokerages
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Live MyFreeStock Score™ Leaderboard
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-300">
              Every score is recalculated as broker terms evolve. Use the cards below to explore score breakdowns and jump directly to each promotion.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {brokersLoading && (
              <div className="md:col-span-2 xl:col-span-3">
                <div className="rounded-3xl border border-white/5 bg-white/5 p-6 text-center text-sm text-slate-300">
                  Loading verified offers…
                </div>
              </div>
            )}
            {brokersError && !brokersLoading && (
              <div className="md:col-span-2 xl:col-span-3">
                <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-6 text-center text-sm text-rose-200">
                  We couldn&apos;t refresh the offers right now. Please try again shortly.
                </div>
              </div>
            )}
            {!brokersLoading && !brokersError &&
              offers.map((offer) => (
                <article
                  key={offer.id}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-white/5 p-6 text-left shadow-[0_30px_80px_-60px_rgba(16,185,129,0.5)] transition hover:border-emerald-400/60 hover:shadow-emerald-500/30"
                >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{offer.name}</h3>
                      <p className="mt-2 text-sm text-slate-300">{offer.headline}</p>
                    </div>
                    <ScoreBadge score={offer.computedScore} />
                  </div>
                  <p className="text-sm text-slate-400">{offer.summary}</p>
                </div>

                <div className="mt-6">
                  <ScoreCard
                    name={`${offer.name} Score`}
                    subMetrics={offer.score?.breakdown ?? {}}
                    type="broker"
                    scoreOverride={offer.computedScore}
                    variant="dark"
                    className="bg-[#0A152E]/60"
                    slug={offer.slug ?? offer.id}
                  />
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-[#071025] px-4 py-3">
                    <p className="font-semibold text-white">Bonus Details</p>
                    <p className="mt-2 text-sm text-slate-300">
                      {offer.offerDetails?.value} • {offer.offerDetails?.requirement}
                    </p>
                    <p className="text-xs text-slate-400">
                      Payout: {offer.offerDetails?.payout} — {offer.offerDetails?.expiration}
                    </p>
                  </div>
                  <a
                    href={offer.cta?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                  >
                    {offer.cta?.label ?? "View Offer"}
                  </a>
                  <Link
                    to={`/broker/${offer.slug ?? offer.id}`}
                    className="inline-flex w-full justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-300 hover:text-emerald-200"
                  >
                    Full Review
                  </Link>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {offer.disclaimer}
                  </p>
                </div>
              </article>
              ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-slate-800 bg-[#050B1A]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <img src="/logo-dark.svg" alt="MyFreeStocks.com" className="mb-3 h-8 w-auto" />
            <p className="text-xs text-slate-400">Curated free stock offers & robo-advisor insights</p>
          </div>
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} MyFreeStocks.com. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-emerald-300">
            <a href="#" className="transition hover:text-emerald-200">
              Privacy
            </a>
            <a href="#" className="transition hover:text-emerald-200">
              Terms
            </a>
            <a href="#" className="transition hover:text-emerald-200">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

