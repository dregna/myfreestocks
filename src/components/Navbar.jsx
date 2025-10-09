import React from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/offers", label: "Broker Offers" },
  { to: "/robo-advisors", label: "AI Robo-Advisors" },
];

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
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
