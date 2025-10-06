import React from "react";
import { Link } from "react-router-dom";
import ScoreBadge from "../score/ScoreBadge";

const CATEGORY_META = {
  broker: {
    label: "Online Broker",
    icon: (
      <svg
        className="h-5 w-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18V9m6 9V6m6 12v-8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 19h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  robo: {
    label: "Robo-Advisor",
    icon: (
      <svg
        className="h-5 w-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 5V3m0 18v-2m7-7h2M3 12h2m12.5-6.5 1.5-1.5M5 19l1.5-1.5m12 1.5-1.5-1.5M5 5l1.5 1.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

function getCategoryMeta(category) {
  if (!category) {
    return {
      label: "Broker Offer",
      icon: (
        <svg
          className="h-5 w-5 text-emerald-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3v4m0 10v4m9-9h-4M7 12H3m15.5-6.5L16 8m-8 8-2.5 2.5m0-13L8 8m8 8 2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
  }

  return CATEGORY_META[category] ?? {
    label: category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
    icon: (
      <svg
        className="h-5 w-5 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3v18m9-9H3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
}

export default function BrokerBox({ offer, isTopPick = false }) {
  const {
    id,
    slug,
    name,
    headline,
    summary,
    cta,
    offerDetails = {},
    highlights = [],
    idealFor = [],
    computedScore,
    category,
    disclaimer,
  } = offer;

  const logoName = (slug ?? id ?? "").toLowerCase();
  const logoSrc = `/icons/${logoName}.svg`;
  const { label: categoryLabel, icon: categoryIcon } = getCategoryMeta(category);

  const detailItems = [
    { label: "Bonus Value", value: offerDetails.value ?? "See current promotion" },
    {
      label: "Requirement",
      value: offerDetails.requirement ?? "Check offer terms",
    },
    { label: "Payout", value: offerDetails.payout ?? "Varies by broker" },
    { label: "Verification", value: offerDetails.expiration ?? "Verified 2025" },
  ];

  const rawOfferText =
    (typeof offer?.currentPromo === "string" && offer.currentPromo.trim()) ||
    (typeof offerDetails?.value === "string" && offerDetails.value.trim()) ||
    (typeof offerDetails?.headline === "string" && offerDetails.headline.trim()) ||
    (typeof offerDetails?.summary === "string" && offerDetails.summary.trim()) ||
    "";

  const normalizedOfferText = rawOfferText.trim();
  const hasStrongOffer = normalizedOfferText.length > 0;

  const offerHighlightClass = hasStrongOffer
    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
    : "bg-slate-100/10 text-slate-300 dark:text-slate-200/70";

  const offerHighlightText = hasStrongOffer
    ? normalizedOfferText
    : "No current offer";

  return (
    <article
      className={`relative flex h-full flex-col justify-between gap-6 rounded-3xl border p-6 text-left transition-all duration-200 hover:scale-[1.02] md:p-8 ${
        isTopPick
          ? "border-emerald-400/70 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40"
          : "border-white/10 bg-white/5 shadow-[0_30px_80px_-60px_rgba(16,185,129,0.35)] hover:border-emerald-400/60 hover:shadow-lg"
      }`}
    >
      {isTopPick && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-950 shadow-lg">
          <span aria-hidden>🏆</span>
          Top Pick
        </span>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 sm:gap-4">
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-white/90 shadow-inner">
                <img
                  src={logoSrc}
                  alt={`${name} logo`}
                  className="h-12 w-12 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white">{name}</h3>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {categoryIcon}
                  <span>{categoryLabel}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/offers/${slug ?? id}`}
              className="inline-flex items-center rounded-md p-1.5 transition-transform duration-200 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:p-2"
              aria-label={`Read the ${name} broker review`}
            >
              <ScoreBadge score={computedScore} className="shadow-lg shadow-emerald-500/20" />
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
              Current Offer
            </span>
            <div className={`inline-block rounded-md px-3 py-1 text-sm font-medium ${offerHighlightClass}`}>
              {offerHighlightText}
            </div>
          </div>
        </div>

        {headline && <p className="text-sm font-semibold text-emerald-200">{headline}</p>}
        {summary && <p className="text-sm text-slate-300">{summary}</p>}

        <div className="mt-auto space-y-4">
          <dl className="grid grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-2">
            {detailItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>

          {highlights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Highlights
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                {highlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" aria-hidden />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {idealFor.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Ideal For
              </p>
              <div className="flex flex-wrap gap-2">
                {idealFor.map((persona) => (
                  <span
                    key={persona}
                    className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200"
                  >
                    {persona}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={cta?.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Sign Up Now
            </a>
            <Link
              to={`/broker/${slug ?? id}`}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-emerald-400/60 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Read Review
            </Link>
          </div>

          {disclaimer && (
            <p className="text-xs leading-relaxed text-slate-400">{disclaimer}</p>
          )}
        </div>
      </div>
    </article>
  );
}
