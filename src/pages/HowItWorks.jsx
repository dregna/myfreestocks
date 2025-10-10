import React from "react";
import Layout from "../components/Layout";
import MarketSentimentVisualizer from "../components/ai/MarketSentimentVisualizer";

const workflowSteps = [
  {
    title: "Compare Offers",
    description:
      "Scan the top brokerage promotions side-by-side to understand eligibility, timelines, and the true bonus value.",
    detail:
      "We aggregate the fine print and do the math so you know exactly what to expect before you apply.",
  },
  {
    title: "Open & Fund",
    description:
      "Follow the step-by-step funding checklist tailored to each broker, including ACH timing and verification tips.",
    detail:
      "Most offers unlock once your first deposit clears. We keep you on track with reminders and status trackers.",
  },
  {
    title: "Claim Rewards",
    description:
      "Redeem your free stock or cash credits and understand the holding requirements to keep everything in compliance.",
    detail:
      "You'll know when to expect the reward, how to view it in your account, and the best strategy for reinvesting.",
  },
];

const timeline = [
  {
    phase: "Day 0",
    headline: "Select Your Offer",
    body: "Choose from curated deals filtered by account minimum, region, and payout style.",
  },
  {
    phase: "Day 1-3",
    headline: "Complete Application",
    body: "We walk you through identity verification, linking a funding source, and submitting the required documents.",
  },
  {
    phase: "Day 4-10",
    headline: "Fund & Track",
    body: "Monitor transfer status, confirm qualification criteria, and receive alerts the moment your bonus is pending.",
  },
  {
    phase: "Day 10+",
    headline: "Bonus Lands",
    body: "Celebrate the deposit, review exit strategies, or roll into the next offer with confidence.",
  },
];

const faqItems = [
  {
    question: "Why trust MyFreeStocks?",
    answer:
      "We actively maintain every offer, partner with compliance teams, and publish transparent timelines so investors never miss a payout.",
  },
  {
    question: "Can I combine offers?",
    answer:
      "Yes. Most users stack multiple bonuses by staggering deposits. Our calendar keeps you organized and avoids disqualification.",
  },
  {
    question: "What if requirements change?",
    answer:
      "Our alert system instantly flags requirement updates and gives you an action plan before a deadline is missed.",
  },
];

export default function HowItWorks() {
  return (
    <Layout>
      <section className="text-center py-12">
        <div className="relative overflow-hidden">
          <div className="absolute -top-20 right-10 hidden h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl lg:block" />
          <div className="absolute -bottom-24 left-[-4rem] hidden h-80 w-80 rounded-full bg-sky-500/10 blur-3xl lg:block" />

          <div className="relative mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 sm:py-20 lg:py-24">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                Playbook
              </span>
              <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
                How the MyFreeStocks Bonus Engine Works
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
                From discovery to cashing in your free shares, we orchestrate every step so you focus on building wealth—not decoding fine print.
              </p>
            </div>

            <div className="flex flex-col gap-16 text-left">
              <section className="grid gap-8 md:grid-cols-3">
                {workflowSteps.map((step) => (
                  <div key={step.title} className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-6">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-sm font-semibold text-emerald-200">
                      {step.title.split(" ")[0]}
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white">{step.title}</h2>
                      <p className="text-sm leading-relaxed text-slate-300">{step.description}</p>
                      <p className="text-xs text-slate-400">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </section>

              <section className="rounded-3xl border border-white/5 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">Your Expected Timeline</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Use this as a guide for the average promotion. We track each brokerage individually so you always have real-time status.
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {timeline.map((item) => (
                    <div key={item.phase} className="rounded-2xl border border-emerald-400/20 bg-[#071024] p-6">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">{item.phase}</span>
                      <h3 className="mt-3 text-lg font-semibold text-white">{item.headline}</h3>
                      <p className="mt-2 text-sm text-slate-300">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-emerald-400/20 bg-[#071024] p-8">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl">Confidence from Compliance</h2>
                    <p className="mt-3 text-sm text-slate-300">
                      Every recommendation runs through our compliance checks. We validate disclosures, custody protections, and payout histories for each offer.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        24/7 monitoring for offer expirations and requirement updates.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        Historical performance tracking to surface the most reliable brokers.
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        Benchmarks that show you when to pivot to higher-value deals.
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white">Investor FAQs</h3>
                    <div className="mt-4 space-y-4 text-sm text-slate-300">
                      {faqItems.map((item) => (
                        <div key={item.question}>
                          <p className="font-semibold text-emerald-200">{item.question}</p>
                          <p className="mt-1 text-xs text-slate-400">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="my-4 rounded-3xl border border-white/5 bg-[#040b18] p-8 text-center shadow-[0_40px_120px_-80px_rgba(16,185,129,0.6)]">
                <h2 className="text-3xl font-semibold text-white">Ready to Unlock Your Next Bonus?</h2>
                <p className="mt-3 text-sm text-slate-300">
                  Explore the live dashboard of broker promotions, curated daily with payout estimates and risk checks.
                </p>
                <a
                  href="/offers"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
                >
                  View Current Offers
                </a>
              </section>

              <section className="my-16">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">
                  AI Market Visualization (Experimental)
                </h2>
                <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-slate-300">
                  This prototype replays the Dow Jones Industrial Average to visualize intraday sentiment swings. Future versions will stream live data for active monitoring.
                </p>
                <MarketSentimentVisualizer />
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
