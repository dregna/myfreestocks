import React, { useMemo } from "react";
import PageShell from "../components/layout/PageShell";
import ScoreBadge from "../components/score/ScoreBadge";
import BrokerOfferCard from "../components/offers/BrokerOfferCard";
import BROKER_OFFERS from "../data/brokers";
import calculateMyFreeStockScore from "../utils/score";

function hydrateOffers(offers) {
  return offers.map((offer) => {
    const breakdownEntries = Object.entries(offer.score?.breakdown ?? {});
    const metrics = Object.fromEntries(
      breakdownEntries.map(([key, value]) => [key, Number(value) / 10])
    );
    const result = calculateMyFreeStockScore({
      vertical: offer.score?.vertical ?? "broker",
      metrics,
    });

    return {
      ...offer,
      computedScore: Math.round((result.score ?? 0) * 10),
    };
  });
}

export default function Offers() {
  const offersWithScore = useMemo(
    () => hydrateOffers(BROKER_OFFERS),
    []
  );

  const aggregate = useMemo(() => {
    if (offersWithScore.length === 0) {
      return { averageScore: 0, topOffer: null };
    }

    const total = offersWithScore.reduce(
      (sum, current) => sum + (current.computedScore ?? 0),
      0
    );
    const topOffer = offersWithScore.reduce((best, current) => {
      if (!best) return current;
      return (current.computedScore ?? 0) > (best.computedScore ?? 0)
        ? current
        : best;
    }, null);

    return {
      averageScore: Math.round(total / offersWithScore.length),
      topOffer,
    };
  }, [offersWithScore]);

  return (
    <PageShell mainClassName="pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12">
        <section className="rounded-3xl border border-gray-200 bg-white p-10 shadow-card">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Broker Promotions
              </p>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Bonus offers ranked by MyFreeStock Score™
              </h1>
              <p className="max-w-2xl text-base text-gray-600">
                Our research team models every brokerage promotion on a 0–100 scale, blending platform quality, pricing, and
                customer support data so you can quickly compare where to open your next account.
              </p>
              <p className="text-sm text-gray-500">
                Scores update as new terms are published. We track cash bonuses, stock grants, and transfer credits from U.S.
                brokers and normalize each incentive using the same methodology found in our in-depth reviews.
              </p>
            </div>
            {aggregate.topOffer && (
              <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-gray-200 bg-neutral p-6 text-sm text-gray-700 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Highest Score This Week
                  </span>
                  <ScoreBadge score={aggregate.topOffer.computedScore} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {aggregate.topOffer.name}
                  </p>
                  <p className="text-gray-600">
                    Weighted score derived from fees, platform quality, and customer support metrics collected by MyFreeStocks.
                  </p>
                </div>
                <div className="flex items-baseline justify-between text-gray-500">
                  <span>Average score</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {aggregate.averageScore}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-10">
          {offersWithScore.map((offer) => (
            <BrokerOfferCard key={offer.id} offer={offer} />
          ))}
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-8 text-sm text-gray-600 shadow-card">
          <h2 className="text-lg font-semibold text-gray-900">
            Methodology & Editorial Standards
          </h2>
          <p className="mt-3">
            MyFreeStock Score™ is calculated using weighted metrics focused on investor value. Fees carry the most influence,
            followed by platform reliability, trading and planning features, and customer support. Each metric is reviewed on a
            0–10 scale by our analysts before being normalized to the 0–100 score displayed above.
          </p>
          <p className="mt-3">
            Promotions may change or expire without notice. Always confirm bonus requirements and transfer rules directly with the
            brokerage. MyFreeStocks may receive affiliate compensation when you click partner links, but partnerships never impact
            our scoring or rankings.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
