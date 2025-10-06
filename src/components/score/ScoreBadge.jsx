// src/components/score/ScoreBadge.jsx
import React from "react";

/**
 * MyFreeStock Score™ Badge (0–100 Scale)
 * Displays color-coded tier and tooltip.
 * Props:
 *  - score: number (0–100)
 *  - subtitle: optional string (default "MyFreeStock Score™")
 *  - className: optional string
 */
export default function ScoreBadge({
  score = 0,
  subtitle = "MyFreeStock Score™",
  className = "",
}) {
  // Determine tier based on 0–100 scale
  let tier = "average";
  if (score >= 90) tier = "excellent";
  else if (score >= 75) tier = "strong";

  const TIER_STYLES = {
    excellent: {
      container: "bg-emerald-50 border-emerald-200 text-emerald-700",
      circle: "bg-white text-emerald-600 border-emerald-400",
    },
    strong: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-700",
      circle: "bg-white text-yellow-600 border-yellow-400",
    },
    average: {
      container: "bg-slate-50 border-slate-200 text-slate-700",
      circle: "bg-white text-slate-600 border-slate-400",
    },
  };

  const { container, circle } = TIER_STYLES[tier];

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 shadow-sm ${container} ${className}`}
      title={`MyFreeStock Score™ ${score} (${tier})`}
      aria-label={`MyFreeStock Score™ ${score} ${tier}`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-bold ${circle}`}
      >
        {Number.isFinite(score) ? score : "–"}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {subtitle}
        </span>
        <span className="text-sm font-semibold capitalize">
          {tier === "excellent"
            ? "Excellent Value"
            : tier === "strong"
            ? "Strong Performance"
            : "Average"}
        </span>
      </div>
    </div>
  );
}
