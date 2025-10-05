import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 px-6 text-sm text-gray-500">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-3 md:mb-0">
          <img src="/favicon.svg" className="h-5 w-5" alt="Logo" />
          <span>© {new Date().getFullYear()} MyFreeStocks</span>
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:text-primary">Disclosure</a>
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Terms</a>
        </div>
      </div>
    </footer>
  );
}
