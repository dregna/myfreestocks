import React from "react";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";

const offers = [
  {
    name: "Webull",
    description:
      "Get up to 12 free stocks valued up to $30,600 when you open and fund a new account.",
    perks: [
      "Extended-hours trading",
      "Advanced charting tools",
      "Fractional shares",
    ],
    cta: "Claim Webull Offer",
  },
  {
    name: "Robinhood",
    description:
      "Earn free fractional shares worth up to $200 and enjoy $0 commission stock and ETF trades.",
    perks: [
      "No account minimums",
      "Cash sweep with 1.5% APY",
      "Crypto trading access",
    ],
    cta: "Unlock Robinhood Bonus",
  },
  {
    name: "SoFi",
    description:
      "Open an Active Invest account and get up to $1,000 in free stock for qualifying deposits.",
    perks: [
      "Goal-based investing",
      "Automatic rebalancing",
      "High-yield SoFi checking",
    ],
    cta: "Start with SoFi",
  },
];

const steps = [
  {
    title: "Compare Offers",
    text: "See exactly what each brokerage gives you, including share value ranges and requirements.",
  },
  {
    title: "Open & Fund",
    text: "Complete the application and make the minimum deposit—our guides walk you through every step.",
  },
  {
    title: "Claim Rewards",
    text: "Track your bonus delivery in real-time and know when your free stocks land in your account.",
  },
];

const advisors = [
  {
    name: "Betterment",
    minimum: "$10",
    features: "Automated rebalancing, tax-loss harvesting",
    pricing: "0.25% annually",
  },
  {
    name: "Wealthfront",
    minimum: "$500",
    features: "529 college planning, banking integration",
    pricing: "0.25% annually",
  },
  {
    name: "SoFi Automated Investing",
    minimum: "$0",
    features: "Access to human advisors, automatic rebalancing",
    pricing: "0.00% advisory fee",
  },
];

const tickerItems = [
  { symbol: "AAPL", change: "+1.24%" },
  { symbol: "TSLA", change: "-0.87%" },
  { symbol: "MSFT", change: "+0.63%" },
  { symbol: "NVDA", change: "+2.94%" },
  { symbol: "AMZN", change: "+1.02%" },
  { symbol: "META", change: "-0.45%" },
  { symbol: "GOOGL", change: "+0.51%" },
  { symbol: "SQ", change: "+1.88%" },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MyFreeStocks",
    url: "https://myfreestocks.com/",
    description:
      "Compare brokerages, explore stock insights, and discover the best free investing offers on MyFreeStocks.",
    publisher: {
      "@type": "Organization",
      name: "MyFreeStocks",
      url: "https://myfreestocks.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://myfreestocks.com/logo-dark.svg",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://myfreestocks.com/offers?broker={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SEO
        title="MyFreeStocks — Compare Brokers & Investing Offers"
        description="Your hub for transparent stock and broker comparisons. Track market sentiment, explore top offers, and learn how to invest smarter — for free."
        url="https://myfreestocks.com/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div className="bg-[#050B1A] text-slate-100">
        <style>{`
            @keyframes ticker {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div className="border-y border-slate-800 bg-[#071025]">
            <div className="relative overflow-hidden">
              <div
                className="flex min-w-[200%] gap-8 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-300"
                style={{ animation: "ticker 30s linear infinite" }}
              >
                {[...tickerItems, ...tickerItems].map((item, index) => (
                  <div key={`${item.symbol}-${index}`} className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">{item.symbol}</span>
                    <span className={item.change.startsWith("-") ? "text-rose-400" : "text-emerald-300"}>
                      {item.change}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="mt-12 rounded-3xl bg-gradient-to-br from-[#0A1328] via-[#0F1D3A] to-[#12224A] p-10 shadow-[0_40px_120px_-60px_rgba(16,185,129,0.7)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Updated Daily
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find the Best Free Stock Offers — Updated Daily
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                We monitor every major brokerage promotion so you can capture the highest-value free stock bonuses in minutes. No fluff—just vetted offers, step-by-step guidance, and transparent requirements.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/offers"
                  className="rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:scale-[1.02]"
                >
                  View Top Offers
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-emerald-400/40 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                >
                  How It Works
                </a>
              </div>
              <div className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">$3.8M+</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-emerald-300">Bonuses Claimed</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">150K+</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-emerald-300">Investors Guided</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">24/7</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-emerald-300">Offer Monitoring</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -translate-y-6 translate-x-6 rounded-[40px] bg-emerald-500/20 blur-3xl" />
              <div className="relative h-full rounded-[40px] border border-emerald-400/20 bg-[#0A152E] p-8 shadow-xl">
                <h2 className="text-lg font-semibold text-emerald-300">Spotlight Offer</h2>
                <p className="mt-2 text-3xl font-bold text-white">Earn up to $600 in free stocks</p>
                <p className="mt-4 text-sm text-slate-300">
                  Open a Webull brokerage account and deposit $100 or more within 10 days to spin the stock wheel for your bonus shares.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Zero commissions on stocks, ETFs, and options
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Paper trading simulator to refine strategies
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Industry-leading mobile app with deep analytics
                  </li>
                </ul>
                <a
                  href="/offers"
                  className="mt-8 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                >
                  Claim Your Free Stocks
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="offers" className="mt-20">
          <div className="flex flex-col gap-6 text-center">
            <span className="mx-auto rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Top Brokerage Bonuses
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Get the Biggest Free Stock Offers Today</h2>
            <p className="mx-auto max-w-3xl text-base text-slate-300">
              Every promotion is verified with the provider and updated daily. Tap an offer to see full eligibility details, time-to-credit estimates, and expert strategies to maximize your reward.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {offers.map((offer) => (
              <div
                key={offer.name}
                className="group relative flex h-full flex-col rounded-3xl border border-white/5 bg-white/5 p-8 shadow-[0_30px_80px_-60px_rgba(16,185,129,0.8)] transition hover:border-emerald-400/60 hover:shadow-emerald-500/30"
              >
                <div className="absolute -right-6 top-6 hidden rotate-6 rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200 group-hover:block">
                  Bonus
                </div>
                <h3 className="text-2xl font-semibold text-white">{offer.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{offer.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {offer.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6">
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition group-hover:brightness-110"
                  >
                    {offer.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mt-24 rounded-3xl border border-emerald-500/20 bg-[#09152B] p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-base text-slate-300">
              Our analysts verify every offer and give you the exact playbook to secure each reward. Here’s how to capture your free stocks with confidence.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/5 bg-white/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg font-semibold text-emerald-300">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-sm text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="ai-robo" className="mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">AI Robo-Advisors at a Glance</h2>
              <p className="mt-2 max-w-2xl text-base text-slate-300">
                Prefer a hands-off approach? Compare leading robo-advisors that harness AI-driven portfolios and automation while you stack brokerage bonuses.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex rounded-full border border-emerald-400/40 px-5 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
            >
              View Full Comparison
            </a>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full table-auto text-left text-sm text-slate-200">
              <thead className="bg-[#0B1C36] text-xs uppercase tracking-wider text-emerald-300">
                <tr>
                  <th className="px-6 py-4">Platform</th>
                  <th className="px-6 py-4">Minimum</th>
                  <th className="px-6 py-4">Key Features</th>
                  <th className="px-6 py-4">Pricing</th>
                </tr>
              </thead>
              <tbody>
                {advisors.map((advisor, index) => (
                  <tr
                    key={advisor.name}
                    className={index % 2 === 0 ? "bg-[#0A1326]" : "bg-[#081020]"}
                  >
                    <td className="px-6 py-4 text-base font-semibold text-white">{advisor.name}</td>
                    <td className="px-6 py-4">{advisor.minimum}</td>
                    <td className="px-6 py-4">{advisor.features}</td>
                    <td className="px-6 py-4 text-emerald-300">{advisor.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
          </div>
        </div>
    </>
  );
}
