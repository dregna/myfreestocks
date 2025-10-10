import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const tickerItems = [
  { symbol: "AAPL", change: "+1.24%" },
  { symbol: "TSLA", change: "-0.87%" },
  { symbol: "MSFT", change: "+0.63%" },
  { symbol: "NVDA", change: "+2.94%" },
  { symbol: "AMZN", change: "+1.02%" },
  { symbol: "META", change: "-0.45%" },
  { symbol: "GOOGL", change: "+0.51%" },
  { symbol: "SQ", change: "+1.88%" },
];

export default function PageShell({ children, mainClassName = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#050B1A] text-slate-100">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <header className="border-b border-slate-800 bg-[#050B1A]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <Link to="/" className="flex items-center gap-3" onClick={handleCloseMenu}>
            <img src="/logo-dark.svg" alt="MyFreeStocks.com" className="h-9 w-auto" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <Link to="/offers" className="transition hover:text-emerald-300">
              Offers
            </Link>
            <NavLink to="/how-it-works" className="transition hover:text-emerald-300">
              How It Works
            </NavLink>
            <NavLink to="/robo-advisors" className="transition hover:text-emerald-300">
              AI Robo-Advisors
            </NavLink>
            <a href="/#contact" className="transition hover:text-emerald-300">
              Contact
            </a>
          </nav>

          <Link
            to="/offers"
            className="hidden rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110 md:inline-flex"
          >
            Compare Offers
          </Link>

          <button
            type="button"
            onClick={handleToggleMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-200 ease-in-out hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle navigation menu</span>
            <span className="flex h-5 w-6 flex-col items-center justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-white transition duration-200 ease-in-out ${
                  isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-white transition duration-200 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-white transition duration-200 ease-in-out ${
                  isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`md:hidden transform border-t border-slate-800 bg-[#0B1622] text-white transition-all duration-200 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 px-4 py-4 text-sm font-semibold">
            <Link to="/" onClick={handleCloseMenu} className="rounded-lg px-3 py-2 transition hover:bg-white/10">
              Home
            </Link>
            <Link to="/offers" onClick={handleCloseMenu} className="rounded-lg px-3 py-2 transition hover:bg-white/10">
              Offers
            </Link>
            <a
              href="/#compare"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              Compare
            </a>
            <Link
              to="/robo-advisors"
              onClick={handleCloseMenu}
              className="rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              Robo-Advisors
            </Link>
            <Link
              to="/offers"
              onClick={handleCloseMenu}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
            >
              See Offers
            </Link>
          </nav>
        </div>
      </header>

      <div className="border-y border-slate-800 bg-[#071025]">
        <div className="relative overflow-hidden">
          <div
            className="flex min-w-[200%] gap-8 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-300"
            style={{ animation: "ticker 30s linear infinite" }}
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div key={`${item.symbol}-${index}`} className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">{item.symbol}</span>
                <span className={item.change.startsWith("-") ? "text-rose-400" : "text-emerald-300"}>{item.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className={`mx-auto w-full max-w-6xl flex-1 px-4 ${mainClassName}`}>{children}</main>

      <footer className="mt-24 border-t border-slate-800 bg-[#050B1A]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <img src="/logo-dark.svg" alt="MyFreeStocks.com" className="mb-3 h-8 w-auto" />
            <p className="text-xs text-slate-400">Curated free stock offers & robo-advisor insights</p>
          </div>
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} MyFreeStocks.com. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-emerald-300">
            <a href="#" className="transition hover:text-emerald-200">
              Privacy
            </a>
            <a href="#" className="transition hover:text-emerald-200">
              Terms
            </a>
            <a href="#" className="transition hover:text-emerald-200">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
