import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-2">
        <picture>
          <source srcSet="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
          <img src="/logo-light.svg" alt="MyFreeStocks logo" className="h-8 w-auto" />
        </picture>
      </div>
      <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
        <li><a href="#" className="hover:text-primary">Promotions</a></li>
        <li><a href="#" className="hover:text-primary">Robo-Advisors</a></li>
        <li><a href="#" className="hover:text-primary">Learn</a></li>
      </ul>
    </nav>
  );
}
