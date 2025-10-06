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
 */
export default function ScoreCard({
  name,
  subMetrics = {},
  type = "broker",
  scoreOverride,
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

  const tierBackgrounds = {
    excellent: "from-emerald-50 to-emerald-100 border-emerald-200",
    strong: "from-yellow-50 to-yellow-100 border-yellow-200",
    average: "from-slate-50 to-slate-100 border-slate-200",
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${tierBackgrounds[tier]} p-6 shadow-md transition-transform hover:scale-[1.01]`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        <ScoreBadge score={Math.round(score)} />
      </div>

      <div className="space-y-2">
        {Object.entries(subMetrics).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              {metricLabels[key] ?? key}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {Number(value).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        MyFreeStock Score™ combines verified metrics for {type === "robo" ? "robo-advisors" : "brokerages"} to
        help investors compare transparency, cost, and long-term value at a glance.
      </div>
    </div>
  );
}

