/**
 * MyFreeStock Score™ utility helpers.
 *
 * This module centralises the weighted scoring logic that both broker and
 * robo-advisor review pages rely on.  It intentionally uses plain objects
 * and functions so it can be imported in React components without pulling
 * extra dependencies.  All scores assume metrics are provided on a 0-10
 * scale where higher is better.
 */

/**
 * Default weight configuration for each product vertical.  Feel free to tweak
 * the individual weightings as our editorial priorities evolve.
 */
export const DEFAULT_WEIGHTS = {
  broker: {
    fees: 0.35,
    features: 0.3,
    platform: 0.2,
    support: 0.15,
  },
  roboAdvisor: {
    fees: 0.25,
    automation: 0.35,
    performance: 0.25,
    support: 0.15,
  },
};

/**
 * Tier thresholds for the badge shown on review pages.
 */
export const SCORE_TIERS = [
  { label: "excellent", min: 8.5 },
  { label: "strong", min: 7 },
  { label: "average", min: 0 },
];

/**
 * Normalises the provided weights so they sum to 1. This allows authors to
 * skip the mental math of making sure the weights add up exactly.
 */
const normaliseWeights = (weights) => {
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0);

  if (!total) {
    return weights;
  }

  return Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, value / total])
  );
};

/**
 * Determines the tier label based on a numeric score.
 */
export const getScoreTier = (score) => {
  const tier = SCORE_TIERS.find(({ min }) => score >= min);
  return tier ? tier.label : "average";
};

/**
 * Calculates a weighted score for a broker or robo-advisor.
 *
 * @param {Object} options
 * @param {"broker"|"roboAdvisor"} options.vertical - Product vertical.
 * @param {Record<string, number>} options.metrics - Metric values on a 0-10 scale.
 * @param {Record<string, number>} [options.weights] - Optional override for weights.
 * @returns {{ score: number, tier: string }} Weighted score and tier label.
 */
export const calculateMyFreeStockScore = ({
  vertical,
  metrics,
  weights: weightOverride,
}) => {
  const weights = normaliseWeights(
    weightOverride ?? DEFAULT_WEIGHTS[vertical] ?? {}
  );

  const score = Object.entries(weights).reduce((total, [metricKey, weight]) => {
    const metricValue = metrics[metricKey] ?? 0;
    return total + metricValue * weight;
  }, 0);

  return {
    score: Number(score.toFixed(2)),
    tier: getScoreTier(score),
  };
};

export default calculateMyFreeStockScore;
