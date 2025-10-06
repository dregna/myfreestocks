import React, { useEffect, useMemo, useState } from "react";
import fallbackBrokerData from "../../data/brokers.json";

function formatPercent(change, prev) {
  if (!Number.isFinite(change) || !Number.isFinite(prev) || prev === 0) {
    return "0.0%";
  }

  const percent = (change / prev) * 100;
  const rounded = Math.abs(percent).toFixed(1);
  if (percent > 0) {
    return `+${rounded}%`;
  }
  if (percent < 0) {
    return `−${rounded}%`;
  }
  return "0.0%";
}

export default function ScoreTicker({ brokers = [] }) {
  const [isPaused, setIsPaused] = useState(false);
  const [tickerBrokers, setTickerBrokers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function fetchBrokerScores() {
      if (!Array.isArray(brokers) || brokers.length === 0) {
        setTickerBrokers(
          Array.isArray(fallbackBrokerData) ? fallbackBrokerData : []
        );
        setLoaded(true);
      }
    }

    fetchBrokerScores();
  }, []);

  useEffect(() => {
    if (Array.isArray(brokers) && brokers.length > 0) {
      setTickerBrokers(brokers);
      setLoaded(true);
    }
  }, [brokers]);

  const items = useMemo(() => {
    return tickerBrokers
      .filter((broker) => broker?.score)
      .map((broker) => {
        const history = Array.isArray(broker.scoreHistory)
          ? broker.scoreHistory
          : [];

        const currentEntry = history[history.length - 1];
        const previousEntry = history[history.length - 2];

        const currentScore = Number.isFinite(currentEntry?.score)
          ? Number(currentEntry.score)
          : Number(broker.score?.overall ?? broker.computedScore);

        if (!Number.isFinite(currentScore)) {
          return null;
        }

        const previousScore = Number.isFinite(previousEntry?.score)
          ? Number(previousEntry.score)
          : undefined;

        const change =
          Number.isFinite(previousScore) && previousScore !== undefined
            ? currentScore - previousScore
            : 0;

        let direction = "flat";
        if (change > 0) direction = "up";
        if (change < 0) direction = "down";

        return {
          id: broker.id ?? broker.slug ?? broker.name,
          name: broker.name,
          currentScore,
          change,
          previousScore,
          direction,
        };
      })
      .filter(Boolean);
  }, [tickerBrokers]);

  if (items.length === 0) {
    return null;
  }

  const tickerClassNames = [
    "score-ticker--track flex w-max items-center gap-6 whitespace-nowrap animate-[score-ticker-scroll_44s_linear_infinite]",
    isPaused ? "[animation-play-state:paused]" : "",
  ]
    .join(" ")
    .trim();

  const renderItems = (suffix) =>
    items.map((item, index) => {
      const indicatorClasses =
        item.direction === "up"
          ? "text-emerald-300"
          : item.direction === "down"
            ? "text-rose-400"
            : "text-slate-400";

      const glowClasses =
        item.direction === "up"
          ? "shadow-[0_0_18px_rgba(16,185,129,0.35)] animate-[score-ticker-glow_2.3s_ease-in-out_infinite]"
          : "";

      const symbol =
        item.direction === "up"
          ? "▲"
          : item.direction === "down"
            ? "▼"
            : "▬";

      return (
        <div
          key={`${item.id}-${suffix}-${index}`}
          className={`relative flex items-center gap-3 after:mx-4 after:text-slate-600/70 after:content-['•'] last:after:hidden`}
        >
          <div
            className={`flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-3 py-1 text-sm font-medium text-white shadow-inner ${glowClasses}`}
          >
            <span className="font-semibold text-white/90">{item.name}</span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-200">
              {item.currentScore}
            </span>
            <span className={`flex items-center gap-1 text-xs font-semibold ${indicatorClasses}`}>
              <span aria-hidden>{symbol}</span>
              <span>{formatPercent(item.change, item.previousScore)}</span>
            </span>
          </div>
        </div>
      );
    });

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <section
      className="border-b border-emerald-500/10 bg-[#071026]"
      aria-label="MyFreeStock Score ticker"
    >
      <style>{`
        @keyframes score-ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes score-ticker-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(16, 185, 129, 0.15); }
          50% { box-shadow: 0 0 18px rgba(16, 185, 129, 0.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .score-ticker--track {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <div className="flex w-full shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-emerald-200 sm:w-auto sm:justify-start sm:text-xs sm:tracking-[0.35em]">
          <span className="flex items-baseline gap-1 whitespace-nowrap">
            <span>MyFreeStock Score</span>
            <span className="text-[0.55rem] align-super text-emerald-100">™</span>
            <span className="tracking-[0.2em] text-emerald-100 sm:tracking-[0.35em]">Live</span>
          </span>
        </div>
        <div className="group/ticker relative flex-1 overflow-x-auto sm:overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-[#071026] via-[#071026]/70 to-transparent sm:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-[#071026] via-[#071026]/70 to-transparent sm:block"
            aria-hidden
          />
          <div
            className="relative flex w-full items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
            onTouchCancel={handleResume}
            onFocus={handlePause}
            onBlur={handleResume}
            tabIndex={0}
            aria-label="Live MyFreeStock Score updates"
          >
            <div className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
              <div className={tickerClassNames}>
                {renderItems("a")}
                {renderItems("b")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
