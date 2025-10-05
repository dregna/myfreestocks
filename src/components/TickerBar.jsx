import React, { useEffect, useState } from "react";

const SYMBOLS = ["AAPL", "TSLA", "SPY", "BTC-USD", "ETH-USD"];

function formatNumber(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "—";
  }
  return value.toFixed(2);
}

export default function TickerBar() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const symbolsQuery = SYMBOLS.join(",");
        const response = await fetch(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolsQuery}`
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const results = payload?.quoteResponse?.result ?? [];
        if (isMounted) {
          setQuotes(
            results.map((quote) => ({
              symbol: quote.symbol,
              price: quote.regularMarketPrice,
              change: quote.regularMarketChangePercent,
            }))
          );
        }
      } catch (error) {
        console.error("Ticker fetch failed:", error);
        if (isMounted) {
          setQuotes([]);
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-primary text-white text-sm py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {quotes.length === 0 && (
          <span className="mx-6 opacity-80">Live quotes unavailable</span>
        )}
        {quotes.map((quote) => {
          const priceText = formatNumber(quote.price);
          const isChangeNumber =
            typeof quote.change === "number" && !Number.isNaN(quote.change);
          const isPositive = isChangeNumber && quote.change >= 0;
          const changeText = isChangeNumber ? formatNumber(quote.change) : "—";
          const changeClass = isChangeNumber
            ? isPositive
              ? "text-green-200"
              : "text-red-200"
            : "text-white/70";
          const changeSymbol = !isChangeNumber ? "•" : isPositive ? "▲" : "▼";
          return (
            <span key={quote.symbol} className="mx-6 inline-flex items-center gap-1">
              <span className="font-semibold">{quote.symbol}</span>
              <span>{priceText}</span>
              <span className={changeClass}>
                {changeSymbol} {changeText}
                {isChangeNumber ? "%" : ""}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
