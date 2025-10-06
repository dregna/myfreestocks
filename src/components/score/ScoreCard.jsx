// src/components/score/ScoreCard.jsx
import React from "react";
import ScoreBadge from "./ScoreBadge";

/**
 * MyFreeStock Score™ Card (0–100 Scale)
 * Displays the detailed breakdown of sub-metrics and includes the ScoreBadge.
 *
 * Props:
 *  - name: string (broker or robo name)
 *  - subMetrics: { transparency, cost, features, support, returns }
 *  - type: "broker" | "robo"
 *  - variant: "light" | "dark"
 *  - className: optional custom classes for the outer container
 */
export default function ScoreCard({
  name,
  subMetrics = {},
  type = "broker",
  scoreOverride,
  variant = "light",
  className = "",
}) {
  // Basic weighted display pulled from same philosophy as score.js (already normalized)
  const metricLabels = {
    transparency: "Transparency",
    cost: "Cost / Fees",
    features: "Features & Tools",
    support: "Customer Support",
    returns: "Performance / Returns",
    fees: "Cost / Fees",
    platform: "Platform Experience",
  };

  // Calculate the simple average for visual reference
  const values = Object.values(subMetrics);
  const averageScore =
    values.length > 0
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
  const score = Number.isFinite(scoreOverride)
    ? Number(scoreOverride)
    : Math.round(averageScore);

  // Determine tier color (same thresholds as ScoreBadge)
  let tier = "average";
  if (score >= 90) tier = "excellent";
  else if (score >= 75) tier = "strong";

  const lightTierBackgrounds = {
    excellent: "from-emerald-50 to-emerald-100 border-emerald-200",
    strong: "from-yellow-50 to-yellow-100 border-yellow-200",
    average: "from-slate-50 to-slate-100 border-slate-200",
  };

  const darkTierStyles = {
    excellent:
      "border-emerald-400/60 bg-emerald-500/10 shadow-emerald-500/40",
    strong: "border-yellow-400/40 bg-yellow-500/10 shadow-yellow-500/30",
    average: "border-white/5 bg-white/5 shadow-emerald-500/20",
  };

  const variantStyles =
    variant === "dark"
      ? {
          container: `rounded-3xl border p-6 transition-transform duration-150 hover:scale-[1.01] shadow-[0_30px_80px_-60px_rgba(16,185,129,0.55)] ${
            darkTierStyles[tier]
          } ${className}`,
          heading: "text-xl font-semibold text-white",
          metricLabel: "text-sm text-slate-300",
          metricValue: "font-semibold text-emerald-300",
          body: "mt-4 text-sm text-slate-400",
        }
      : {
          container: `rounded-2xl border bg-gradient-to-br ${
            lightTierBackgrounds[tier]
          } p-6 shadow-md transition-transform hover:scale-[1.01] ${className}`,
          heading: "text-lg font-bold text-gray-900 dark:text-white",
          metricLabel: "text-gray-700 dark:text-gray-300",
          metricValue: "font-semibold text-gray-900 dark:text-white",
          body:
            "mt-4 text-sm text-gray-600 dark:text-gray-400",
        };

  return (
    <div className={variantStyles.container}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className={variantStyles.heading}>{name}</h3>
        <ScoreBadge score={Math.round(score)} />
      </div>

      <div className="space-y-2">
        {Object.entries(subMetrics).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className={variantStyles.metricLabel}>
              {metricLabels[key] ?? key}
            </span>
            <span className={variantStyles.metricValue}>
              {Number(value).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <div className={variantStyles.body}>
        MyFreeStock Score™ combines verified metrics for
        {" "}
        {type === "robo" ? "robo-advisors" : "brokerages"} to help investors compare transparency, cost, and long-term value at a
        glance.
      </div>
    </div>
  );
}

