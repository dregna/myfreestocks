import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ScoreBadge from "../../components/score/ScoreBadge";
import brokers from "../../data/brokers.json";

function computeAverageScore(breakdown = {}) {
  const values = Object.values(breakdown)
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce((sum, current) => sum + current, 0);
  return Math.round(total / values.length);
}

function formatWeight(weight) {
  if (!Number.isFinite(weight)) {
    return "—";
  }

  return `${Math.round(weight * 100)}%`;
}

export default function BrokerDeepDivePage() {
  const { slug } = useParams();

  const broker = useMemo(
    () => brokers.find((entry) => (entry.slug ?? entry.id) === slug),
    [slug]
  );

  const averageScore = useMemo(
    () => computeAverageScore(broker?.score?.breakdown ?? {}),
    [broker]
  );

  const deepDiveEntries = useMemo(() => {
    const entries = Object.entries(broker?.score?.deepDive ?? {});
    return entries.map(([key, value]) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      weight: Number(value?.weight ?? 0),
      score: Number(value?.score ?? 0),
    }));
  }, [broker]);

  const weightedTotal = useMemo(
    () =>
      deepDiveEntries.reduce(
        (sum, entry) => sum + entry.weight * entry.score,
        0
      ),
    [deepDiveEntries]
  );

  const weightedScore = Math.round(weightedTotal);
  const heroScore = deepDiveEntries.length > 0 ? weightedScore : averageScore;

  const pageTitle = broker
    ? `${broker.name} Review (2025) – MyFreeStocks Deep-Dive Score™ Analysis`
    : "Broker Review Not Found – MyFreeStocks";

  const metaDescription = broker
    ? `${broker.summary} Dive into the full MyFreeStock Score™ breakdown, fees, and editorial verdict for ${broker.name}.`
    : "We couldn't find the broker deep-dive review you were searching for on MyFreeStocks.";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;

    let descriptionTag = document.querySelector('meta[name="description"]');
    const createdTag = !descriptionTag;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    const previousDescription = descriptionTag.getAttribute("content");
    descriptionTag.setAttribute("content", metaDescription);

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
  }, [pageTitle, metaDescription]);

  if (!broker) {
    return (
      <div className="min-h-screen bg-[#050B1A] text-slate-100">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
          <Link
            to="/offers"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          >
            <span aria-hidden>←</span> Back to Offers
          </Link>
          <div className="space-y-4 rounded-3xl border border-white/5 bg-[#0B1622] p-10 shadow-[0_30px_80px_-60px_rgba(16,185,129,0.5)]">
            <h1 className="text-3xl font-semibold text-white">Broker deep dive not found</h1>
            <p className="text-sm text-slate-300">
              We couldn't locate the review you're after. Please return to the offers page to explore the latest verified promotions.
            </p>
            <Link
              to="/offers"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
            >
              View current offers
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const {
    name,
    logo,
    summary,
    about,
    bestFor = [],
    strengths = [],
    cautions = [],
    currentPromo,
    features = [],
    feesAndMinimums = {},
    prosCons = {},
    finalVerdict,
    referralUrl,
    offer: offerDetails = {},
  } = broker;

  const { managementFee, productFees, accountMinimum, accountTypes } =
    feesAndMinimums;

  const derivedPromo = [offerDetails?.value, offerDetails?.requirement]
    .filter(Boolean)
    .join(" • ");

  const heroTiles = [
    {
      title: "Best for",
      content: bestFor,
    },
    {
      title: "Top strengths",
      content: strengths,
    },
    {
      title: "Cautions",
      content: cautions,
    },
    {
      title: "Current promo",
      content: currentPromo ?? derivedPromo,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050B1A] text-slate-100">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link
          to="/offers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
        >
          <span aria-hidden>←</span> Back to Offers
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0A1328] via-[#0F1D3A] to-[#12224A] p-10 shadow-[0_60px_160px_-80px_rgba(16,185,129,0.75)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-emerald-400/30 bg-white/5">
                {logo ? (
                  <img src={logo} alt={`${name} logo`} className="h-16 w-16 object-contain" />
                ) : (
                  <span className="text-2xl font-semibold text-emerald-200">
                    {name?.charAt(0) ?? ""}
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                  MyFreeStock Score™ Deep Dive
                </span>
                <h1 className="text-4xl font-bold text-white sm:text-5xl">
                  {name} Review (2025)
                </h1>
                <p className="max-w-2xl text-base text-slate-300 sm:text-lg">{summary}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 text-right">
              <ScoreBadge score={heroScore} />
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Score refreshed weekly
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {heroTiles.map((tile) => (
              <div
                key={tile.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-70px_rgba(16,185,129,0.85)]"
              >
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  {tile.title}
                </h2>
                {(() => {
                  if (Array.isArray(tile.content)) {
                    const items = tile.content.filter(Boolean);
                    if (items.length === 0) {
                      return (
                        <p className="mt-3 text-sm text-slate-200">—</p>
                      );
                    }

                    return (
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p className="mt-3 text-sm text-slate-200">
                      {tile.content ?? "—"}
                    </p>
                  );
                })()}
              </div>
            ))}
          </div>
        </section>

        {about && (
          <section className="mt-12 rounded-3xl border border-white/5 bg-[#071025] p-10 shadow-[0_40px_120px_-90px_rgba(16,185,129,0.7)]">
            <h2 className="text-2xl font-semibold text-white">About {name}</h2>
            <p className="mt-4 text-base text-slate-300">{about}</p>
          </section>
        )}

        {features.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">Key Platform Features</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Deep-Dive Format
              </span>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/5 bg-[#071025] shadow-[0_40px_120px_-90px_rgba(16,185,129,0.6)]">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5 text-left">
                  <thead className="bg-white/5">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                        Feature
                      </th>
                      <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                        What it means
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {features.map((feature) => (
                      <tr key={feature.name} className="transition hover:bg-white/5">
                        <td className="align-top px-6 py-5 text-sm font-semibold text-white">
                          {feature.name}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-300">
                          {feature.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/5 bg-[#071025] p-8 shadow-[0_40px_120px_-90px_rgba(16,185,129,0.6)]">
            <h2 className="text-2xl font-semibold text-white">Fees & Minimums</h2>
            <dl className="mt-6 space-y-4 text-sm text-slate-200">
              {managementFee && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                    Management fee
                  </dt>
                  <dd className="mt-1 text-base text-white">{managementFee}</dd>
                </div>
              )}
              {productFees && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                    Product fees
                  </dt>
                  <dd className="mt-1 text-base text-white">{productFees}</dd>
                </div>
              )}
              {accountMinimum && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                    Minimum to start
                  </dt>
                  <dd className="mt-1 text-base text-white">{accountMinimum}</dd>
                </div>
              )}
              {accountTypes && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                    Account types
                  </dt>
                  <dd className="mt-1 text-base text-white">{accountTypes}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-3xl border border-white/5 bg-[#071025] p-8 shadow-[0_40px_120px_-90px_rgba(16,185,129,0.6)]">
            <h2 className="text-2xl font-semibold text-white">Pros & Cons</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                  Pros
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {(prosCons.pros ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                  Cons
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {(prosCons.cons ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {deepDiveEntries.length > 0 && (
          <section className="mt-12 rounded-3xl border border-white/5 bg-[#071025] p-10 shadow-[0_40px_120px_-90px_rgba(16,185,129,0.7)]">
            <h2 className="text-2xl font-semibold text-white">MyFreeStock Score™ Breakdown</h2>
            <p className="mt-2 text-sm text-slate-300">
              Weightings are set by the MyFreeStock research desk to balance transparency, cost, platform experience, support quality, and realized returns.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5 text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                      Pillar
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                      Weight × Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {deepDiveEntries.map((entry) => (
                    <tr key={entry.key} className="transition hover:bg-white/5">
                      <td className="px-6 py-5 text-sm font-semibold text-white">
                        {entry.label}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-300">
                        {formatWeight(entry.weight)}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-300">
                        {entry.score}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-300">
                        {(entry.weight * entry.score).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-white/5">
                  <tr>
                    <th scope="row" className="px-6 py-4 text-sm font-semibold text-white">
                      Composite (Σ weight × score)
                    </th>
                    <td className="px-6 py-4 text-sm text-slate-300">100%</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{heroScore}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{weightedTotal.toFixed(1)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        )}

        <section className="mt-12 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-10 shadow-[0_50px_140px_-80px_rgba(16,185,129,0.75)]">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-white">Final Verdict</h2>
            {finalVerdict && (
              <p className="text-base text-slate-100">{finalVerdict}</p>
            )}
            <a
              href={referralUrl ?? broker.cta?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-8 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:brightness-110 sm:w-auto"
            >
              Claim Offer
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
