import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral dark:bg-gray-900">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">
          MyFreeStocks
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Discover free stock offers, market data, and brokerage rewards — all in one clean, modern dashboard.
        </p>
      </header>

      <div className="card w-11/12 md:w-2/3 text-center">
        <h2 className="text-2xl font-display mb-3 text-primary">Start Earning</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Connect with top brokers and claim your free stock rewards today.
        </p>
        <button className="btn-primary">View Offers</button>
      </div>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MyFreeStocks — Built with ❤️ and React
      </footer>
    </div>
  );
}
