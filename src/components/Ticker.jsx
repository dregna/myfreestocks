import { useEffect, useState } from "react";
export default function Ticker() {
  const [stocks, setStocks] = useState(["AAPL", "TSLA", "GOOG", "AMZN"]);
  return (
    <div className="bg-green-600 text-white py-2 overflow-hidden whitespace-nowrap animate-pulse">
      {stocks.map((s, i) => (
        <span key={i} className="mx-4 font-semibold">{s}: loading...</span>
      ))}
    </div>
  );
}
