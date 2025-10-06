import React, { useMemo } from "react";
import ScoreCard from "../score/ScoreCard";
import ScoreBadge from "../score/ScoreBadge";
import calculateMyFreeStockScore from "../../utils/score";

function normaliseMetrics(breakdown = {}) {
  return Object.fromEntries(
    Object.entries(breakdown).map(([key, value]) => [key, Number(value) / 10])
  );
}

export default function BrokerOfferCard({ offer }) {
  const {
    id,
    slug,
    name,
    headline,
    summary,
    cta,
    offer: offerDetails,
    highlights = [],
    idealFor = [],
    score,
    computedScore,
    disclaimer,
  } = offer;

  const { displayScore, breakdown } = useMemo(() => {
    const breakdownValues = score?.breakdown ?? {};

    if (Number.isFinite(computedScore)) {
      return {
        displayScore: Number(computedScore),
        breakdown: breakdownValues,
      };
    }

    const metrics = normaliseMetrics(breakdownValues);
    const result = calculateMyFreeStockScore({
      vertical: score?.vertical ?? "broker",
      metrics,
    });

    return {
      displayScore: Math.round((result.score ?? 0) * 10),
      breakdown: breakdownValues,
    };
  }, [computedScore, score]);

  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-card transition-shadow hover:shadow-lg">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <ScoreBadge score={displayScore} />
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Verified January 2025
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                MyFreeStock Score™ Ranked Offer
              </p>
            </div>
            <p className="text-lg text-gray-700">{headline}</p>
            <p className="text-gray-600">{summary}</p>
          </header>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Bonus value
              </dt>
              <dd className="text-base font-semibold text-gray-900">
                {offerDetails?.value ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Funding requirement
              </dt>
              <dd className="text-base font-semibold text-gray-900">
                {offerDetails?.requirement ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Payout timeline
              </dt>
              <dd className="text-base font-semibold text-gray-900">
                {offerDetails?.payout ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Offer review
              </dt>
              <dd className="text-base font-semibold text-gray-900">
                {offerDetails?.expiration ?? "—"}
              </dd>
            </div>
          </dl>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Highlights
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={cta?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
            >
              {cta?.label ?? "View Offer"}
            </a>
            {idealFor.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="font-semibold uppercase tracking-widest text-gray-400">
                  Ideal for:
                </span>
                {idealFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 px-3 py-1 font-medium text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {disclaimer && (
            <p className="text-xs leading-relaxed text-gray-500">{disclaimer}</p>
          )}
        </div>

        <aside className="space-y-4 lg:w-72">
          <ScoreCard
            name={name}
            subMetrics={breakdown}
            type="broker"
            scoreOverride={displayScore}
            slug={slug ?? id}
          />
          {idealFor.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-accent/60 p-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-800">Strategy Fit</p>
              <p className="mt-2 text-gray-600">
                This offer aligns best with {idealFor[0].toLowerCase()} investors based on features, fees, and support data from
                our research team.
              </p>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
