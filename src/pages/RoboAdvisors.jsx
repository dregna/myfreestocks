// MyFreeStocks Robo-Advisors (Next-Gen AI Investors)
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import ScoreBadge from "../components/score/ScoreBadge";

const aiPlatforms = [
  {
    name: "Titan Invest",
    score: 92,
    tagline: "AI + Human Expertise",
    features: [
      "Active portfolios powered by AI signals",
      "Human advisors for custom strategy",
      "Low account minimum ($100)",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "Q.ai",
    score: 88,
    tagline: "AI Investing Kits",
    features: [
      "Deep-learning investment algorithms",
      "No management fees",
      "Daily portfolio optimization",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "M1 Finance",
    score: 86,
    tagline: "Hybrid Robo + Self-Directed Investing",
    features: [
      "Smart automation + customizable pies",
      "Free automated rebalancing",
      "No advisory fees",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "Composer",
    score: 85,
    tagline: "No-Code Algorithmic Investing",
    features: [
      "Visual strategy builder",
      "Community-driven AI portfolios",
      "Automated trade execution",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "Zorion AI",
    score: 82,
    tagline: "Global AI Wealth Platform",
    features: [
      "Predictive portfolio insights",
      "ESG and emerging market options",
      "AI risk monitoring",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "Alpaca AI",
    score: 80,
    tagline: "Developer-First AI Trading Infrastructure",
    features: [
      "APIs for algorithmic trading",
      "Machine-learning strategy templates",
      "Zero commission trading",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "Hedonova",
    score: 79,
    tagline: "AI-Curated Alternative Assets",
    features: [
      "Diversified alternative portfolio",
      "AI-driven asset selection",
      "Global exposure to unique markets",
    ],
    referral: "#",
    review: "#",
  },
  {
    name: "Syfe",
    score: 77,
    tagline: "AI Wealth Management (Global)",
    features: [
      "Smart beta algorithmic portfolios",
      "Low-cost global investing",
      "Personalized rebalancing",
    ],
    referral: "#",
    review: "#",
  },
];

const faqItems = [
  {
    question: "What is AI investing?",
    answer:
      "AI investing uses machine learning models to analyze market data, build diversified portfolios, and automate rebalancing so investors can stay aligned with their goals without daily oversight.",
  },
  {
    question: "How do robo-advisors use machine learning?",
    answer:
      "Most robo-advisors apply machine learning to scan signals like macro indicators, volatility regimes, and user preferences. Those inputs help the platforms recommend allocations, execute trades, and refine strategies in real time.",
  },
  {
    question: "Are AI portfolios safe?",
    answer:
      "No portfolio is risk-free, but reputable AI platforms combine rigorous backtesting, risk controls, and human oversight. Always review disclosures, diversification, and custody protections before investing.",
  },
  {
    question: "How do fees compare to traditional advisors?",
    answer:
      "AI robo-advisors typically charge 0%–1% annually, well below the 1%–1.5% range common with human advisors. Some, like Q.ai, offer zero management fees while monetizing premium features instead.",
  },
];

const comparisonRows = [
  {
    label: "AI-driven management",
    titan: "✅",
    qai: "✅",
    m1: "⚙️ Hybrid",
    composer: "⚙️ Custom",
  },
  {
    label: "Human advisor access",
    titan: "✅",
    qai: "❌",
    m1: "⚙️ Optional",
    composer: "❌",
  },
  {
    label: "Minimum investment",
    titan: "$100",
    qai: "$50",
    m1: "$0",
    composer: "$25",
  },
  {
    label: "Fees",
    titan: "1%",
    qai: "Free",
    m1: "0.2–0.3%",
    composer: "Custom",
  },
  {
    label: "Auto rebalancing",
    titan: "✅",
    qai: "✅",
    m1: "✅",
    composer: "✅",
  },
];

export default function RoboAdvisors() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Next-Gen AI Investors – MyFreeStocks Robo-Advisors";

    let descriptionTag = document.querySelector('meta[name="description"]');
    const createdTag = !descriptionTag;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    const previousDescription = descriptionTag.getAttribute("content");
    descriptionTag.setAttribute(
      "content",
      "Compare Titan Invest, Q.ai, M1 Finance, and more AI robo-advisors for smarter portfolio automation."
    );

    return () => {
      document.title = previousTitle;
      if (createdTag) {
        descriptionTag?.remove();
      } else if (previousDescription !== null) {
        descriptionTag.setAttribute("content", previousDescription);
      } else {
        descriptionTag.removeAttribute("content");
      }
    };
  }, []);

  const featuredPlatform = aiPlatforms[0];
  const itemList = aiPlatforms.map((platform, index) => {
    const slug = platform.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      "@type": "ListItem",
      position: index + 1,
      name: platform.name,
      description: platform.tagline,
      url:
        platform.referral && platform.referral !== "#"
          ? platform.referral
          : `https://myfreestocks.com/robo-advisors#${slug}`,
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top AI Robo-Advisors",
    description:
      "Curated list of automated investment platforms blending machine learning, automation, and human expertise.",
    itemListElement: itemList,
  };

  return (
    <>
      <SEO
        title="Top Robo Advisors Compared (2025)"
        description="We evaluate leading robo advisors by cost, transparency, and performance. Discover the best fit for your investing goals."
        url="https://myfreestocks.com/robo-advisors"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Layout>
        <div className="bg-[#050B1A] text-slate-100">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="mx-auto max-w-6xl px-4 pb-24">
          <section className="mt-12 rounded-3xl bg-gradient-to-br from-[#0A1328] via-[#0F1D3A] to-[#12224A] p-10 shadow-[0_40px_120px_-60px_rgba(16,185,129,0.7)] motion-safe:animate-[fadeIn_0.8s_ease-out]">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                  Next-Gen AI Investors
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Build Smarter Portfolios with AI-Powered Guidance
                </h1>
                <p className="text-lg text-slate-300">
                  Compare automation-first platforms blending machine learning, human oversight, and transparent pricing. Discover which AI robo-advisor aligns with your goals, risk tolerance, and preferred level of control.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/offers"
                    className="rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:scale-[1.02]"
                  >
                    Explore Promotions
                  </Link>
                  <a
                    href="#ai-platforms"
                    className="rounded-full border border-emerald-400/40 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                  >
                    View AI Platforms
                  </a>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[36px] border border-emerald-400/20 bg-[#0A152E] p-8 shadow-xl">
                <div className="absolute inset-0 -translate-y-6 translate-x-6 rounded-[40px] bg-emerald-500/20 blur-3xl" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                      Spotlight Platform
                    </span>
                    <ScoreBadge score={featuredPlatform.score} subtitle="Titan Score" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">{featuredPlatform.name}</p>
                    <p className="text-sm text-slate-300">{featuredPlatform.tagline}</p>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-200">
                    {featuredPlatform.features.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={featuredPlatform.referral}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                    >
                      Open Account
                    </a>
                    <a
                      href={featuredPlatform.review}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-400/40 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                    >
                      Read Review
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="ai-platforms" className="mt-16 space-y-10 motion-safe:animate-[fadeIn_0.8s_ease-out] motion-safe:[animation-delay:0.1s]">
            <div className="flex flex-col gap-4 text-center">
              <span className="mx-auto rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                AI Platform Grid
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Compare Emerging AI Robo-Advisors</h2>
              <p className="mx-auto max-w-3xl text-base text-slate-300">
                From Titan's managed strategies to Composer's no-code trading recipes, explore how each platform blends automation, customization, and global access for modern investors.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {aiPlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-white/5 p-6 shadow-[0_30px_80px_-60px_rgba(16,185,129,0.6)] transition hover:border-emerald-400/50 hover:shadow-emerald-500/30"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-semibold text-white">{platform.name}</p>
                        <p className="text-sm text-emerald-300">{platform.tagline}</p>
                      </div>
                      <ScoreBadge score={platform.score} className="text-xs" />
                    </div>
                    <ul className="space-y-3 text-sm text-slate-200">
                      {platform.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <a
                      href={platform.referral}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                    >
                      Get Started
                    </a>
                    <a
                      href={platform.review}
                      className="inline-flex items-center justify-center rounded-full border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
                    >
                      Platform Review
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-3xl border border-emerald-400/20 bg-[#071025] p-8 shadow-[0_30px_90px_-70px_rgba(16,185,129,0.6)] motion-safe:animate-[fadeIn_0.8s_ease-out] motion-safe:[animation-delay:0.2s]">
            <div className="flex flex-col gap-4 text-center">
              <span className="mx-auto rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Feature Comparison
              </span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Where Each Platform Excels</h2>
              <p className="mx-auto max-w-3xl text-base text-slate-300">
                Quickly scan automation depth, human access, and cost structure to pinpoint which robo-advisor offers the right balance of control and convenience.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full table-auto text-left text-sm text-slate-200">
                <thead className="bg-[#0B1C36] text-xs uppercase tracking-wider text-emerald-300">
                  <tr>
                    <th className="px-6 py-4">Feature</th>
                    <th className="px-6 py-4">Titan</th>
                    <th className="px-6 py-4">Q.ai</th>
                    <th className="px-6 py-4">M1</th>
                    <th className="px-6 py-4">Composer</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={row.label}
                      className={`transition hover:bg-white/5 ${index % 2 === 0 ? "bg-[#0A1326]" : "bg-[#081020]"}`}
                    >
                      <td className="px-6 py-4 text-base font-semibold text-white">{row.label}</td>
                      <td className="px-6 py-4">{row.titan}</td>
                      <td className="px-6 py-4">{row.qai}</td>
                      <td className="px-6 py-4">{row.m1}</td>
                      <td className="px-6 py-4">{row.composer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-16 space-y-6 motion-safe:animate-[fadeIn_0.8s_ease-out] motion-safe:[animation-delay:0.3s]">
            <div className="text-center">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                AI Investing FAQ
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Educational Insights Before You Invest</h2>
              <p className="mx-auto mt-2 max-w-3xl text-base text-slate-300">
                Understand how intelligent automation works, the safeguards leading platforms use, and what fees to expect compared to traditional advisors.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-white/10 bg-[#081223] p-6 text-left transition hover:border-emerald-400/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-white">
                    {item.question}
                    <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/40 text-sm text-emerald-300 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-slate-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 p-[1px] shadow-[0_40px_120px_-70px_rgba(16,185,129,0.7)] motion-safe:animate-[fadeIn_0.8s_ease-out] motion-safe:[animation-delay:0.4s]">
            <div className="flex flex-col items-start gap-6 rounded-3xl bg-[#041023] px-8 py-10 text-left sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
                  Ready to invest smarter?
                </p>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Start comparing AI investing platforms now.
                </h3>
                <p className="text-sm text-slate-300">
                  Unlock deep-dive reviews, score breakdowns, and exclusive promotions tailored to automation-first investors.
                </p>
              </div>
              <Link
                to="/offers"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#041023] shadow-lg transition hover:brightness-110"
              >
                Compare Offers
              </Link>
            </div>
          </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
