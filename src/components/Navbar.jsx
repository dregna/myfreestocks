import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import navLinks from "./layout/navLinks";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-3" onClick={handleCloseMenu}>
          <img src="/logo-dark.svg" alt="MyFreeStocks.com" className="h-9 w-auto" />
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((item) => {
            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition text-slate-200 hover:text-emerald-300"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-emerald-300 ${
                    isActive ? "text-emerald-300" : "text-slate-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

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
        <div className="flex flex-col gap-2 px-4 py-4 text-sm font-semibold">
          {navLinks.map((item) => {
            const baseClasses = "rounded-lg px-3 py-2 transition hover:bg-white/10";

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleCloseMenu}
                  className={`${baseClasses} text-white`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                  `${baseClasses} ${
                    isActive ? "bg-white/10 text-emerald-200" : "text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
          <Link
            to="/offers"
            onClick={handleCloseMenu}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
          >
            Compare Offers
          </Link>
        </div>
      </div>
    </nav>
  );
}
