import React from "react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-[#050B1A]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <img src="/logo-dark.svg" alt="MyFreeStocks.com" className="mb-3 h-8 w-auto" loading="lazy" />
          <p className="text-xs">Curated free stock offers & robo-advisor insights</p>
        </div>
        <div>© {new Date().getFullYear()} MyFreeStocks.com. All rights reserved.</div>
        <div className="flex gap-4 text-xs text-emerald-300">
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
  );
}
