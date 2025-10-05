import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <img src="/favicon.svg" alt="MyFreeStocks" className="h-6 w-6" />
        <span className="font-semibold text-gray-800 text-lg">myfreestocks</span>
      </div>
      <ul className="hidden md:flex space-x-6 text-gray-700">
        <li><a href="#" className="hover:text-primary">Promotions</a></li>
        <li><a href="#" className="hover:text-primary">Robo-Advisors</a></li>
        <li><a href="#" className="hover:text-primary">Learn</a></li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className="hidden md:block text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
