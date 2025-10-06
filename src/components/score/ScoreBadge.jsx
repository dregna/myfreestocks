import React from "react";
import { getScoreTier } from "../../utils/score";

const TIER_STYLES = {
  excellent: {
    container: "bg-emerald-50 border-emerald-200 text-emerald-700",
    scoreCircle: "bg-white text-emerald-600 border-emerald-400",
  },
  strong: {
    container: "bg-blue-50 border-blue-200 text-blue-700",
    scoreCircle: "bg-white text-blue-600 border-blue-400",
  },
  average: {
    container: "bg-slate-50 border-slate-200 text-slate-700",
    scoreCircle: "bg-white text-slate-600 border-slate-400",
  },
};

const formatScore = (value) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "–";
  }

  return value.toFixed(1);
};

export default function ScoreBadge({
  score,
  tier: tierOverride,
  subtitle = "MyFreeStock Score",
  className = "",
}) {
  const tier = tierOverride ?? getScoreTier(typeof score === "number" ? score : 0);
  const { container, scoreCircle } = TIER_STYLES[tier] ?? TIER_STYLES.average;

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 shadow-sm ${container} ${className}`.trim()}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold ${scoreCircle}`}
        aria-hidden="true"
      >
        {formatScore(score)}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {subtitle}
        </span>
        <span className="text-base font-semibold capitalize">{tier}</span>
      </span>
    </div>
  );
}
