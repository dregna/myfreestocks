import { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

const csvUrl = new URL("../../data/dji-sample.csv", import.meta.url);

function normalizeDelta(delta, range = 200) {
  if (!Number.isFinite(delta) || range <= 0) {
    return 0;
  }
  const clamped = Math.max(-range, Math.min(range, delta));
  return clamped / range;
}

export default function MarketSentimentVisualizer() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    d3.csv(csvUrl.href, (row) => {
      const open = Number.parseFloat(row.open);
      const close = Number.parseFloat(row.close);

      return {
        date: row.date ? new Date(row.date) : new Date(),
        open,
        close,
        delta: Number.isFinite(close) && Number.isFinite(open) ? close - open : 0,
      };
    })
      .then((rows) => {
        if (!isMounted) return;
        const filtered = rows.filter((row) => Number.isFinite(row.delta));
        setData(filtered);
      })
      .catch((error) => {
        console.error("Failed to load DJI sample data", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!data.length) return undefined;

    const id = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % data.length);
    }, 150);

    return () => window.clearInterval(id);
  }, [data]);

  const current = data[index];
  const sentiment = current?.delta ?? 0;
  const normalized = normalizeDelta(sentiment, 220);
  const intensity = Math.abs(normalized);

  const gradient = normalized >= 0
    ? "linear-gradient(135deg, rgba(34,197,94,0.75), rgba(14,165,233,0.85))"
    : "linear-gradient(135deg, rgba(14,165,233,0.75), rgba(15,118,110,0.85))";

  const waveVariants = useMemo(
    () => [
      {
        animate: {
          x: ["-10%", "10%", "-8%"],
          y: ["-6%", "6%", "-4%"],
          rotate: [0, 5, -5, 0],
          opacity: [0.45, 0.6, 0.45],
        },
        transition: {
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
      {
        animate: {
          x: ["20%", "-20%", "18%"],
          y: ["10%", "-12%", "10%"],
          rotate: [2, -6, 4, 2],
          opacity: [0.35, 0.55, 0.35],
        },
        transition: {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    ],
    [],
  );

  const intensityLabel = normalized >= 0 ? "Bullish" : "Bearish";

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-950"> 
      <motion.div
        className="absolute inset-0"
        animate={{
          background: gradient,
          opacity: 0.6 + intensity * 0.35,
          filter: `saturate(${1 + intensity * 0.8})`,
        }}
        transition={{ duration: 0.45 }}
      />

      {waveVariants.map((variant, idx) => (
        <motion.div
          key={`wave-${idx}`}
          className="pointer-events-none absolute -inset-1"
          style={{
            background:
              idx % 2 === 0
                ? "radial-gradient(circle at 30% 30%, rgba(236, 253, 245, 0.25), transparent 60%)"
                : "radial-gradient(circle at 70% 70%, rgba(125, 211, 252, 0.2), transparent 55%)",
            mixBlendMode: "screen",
          }}
          animate={variant.animate}
          transition={variant.transition}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: normalized >= 0 ? "0% 0%" : "100% 100%",
          backgroundSize: `${120 + intensity * 40}% ${120 + intensity * 40}%`,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.08) 0%, transparent 55%), " +
            "radial-gradient(circle at 90% 40%, rgba(94,234,212,0.12) 0%, transparent 60%)",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-6 text-center text-slate-100">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-black/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
          Sentiment Pulse
        </div>
        <h3 className="text-2xl font-semibold text-white sm:text-3xl">AI Market Sentiment Replay</h3>
        <p className="text-sm text-slate-300">
          {current ? current.date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Loading historical data..."}
        </p>
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-medium text-slate-400">Dow Jones (Open → Close)</span>
          <motion.span
            className={`text-4xl font-bold ${normalized >= 0 ? "text-emerald-300" : "text-cyan-200"}`}
            animate={{ scale: 1 + intensity * 0.15 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            {sentiment >= 0 ? `▲ +${sentiment.toFixed(2)}` : `▼ ${sentiment.toFixed(2)}`}
          </motion.span>
        </div>
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-emerald-200">{intensityLabel}</span> momentum · Reacting to {data.length} trading days
        </p>
        <p className="max-w-lg text-xs text-slate-400">
          Experimental visualization that replays Dow Jones Industrial Average movements using AI-inspired gradients and motion.
        </p>
      </div>
    </div>
  );
}
