import React from "react";

export default function RoboAdvisorTable() {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Robo-Advisor Spotlight</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border">Provider</th>
              <th className="p-3 border">Annual Fee</th>
              <th className="p-3 border">Account Minimum</th>
              <th className="p-3 border">Tax Loss Harvesting</th>
              <th className="p-3 border">Signup Bonus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border font-medium">Betterment</td>
              <td className="p-3 border">0.25%</td>
              <td className="p-3 border">$0</td>
              <td className="p-3 border">Yes</td>
              <td className="p-3 border">Up to $500</td>
            </tr>
            <tr>
              <td className="p-3 border font-medium">Wealthfront</td>
              <td className="p-3 border">0.25%</td>
              <td className="p-3 border">$5,000</td>
              <td className="p-3 border">Yes</td>
              <td className="p-3 border">$100</td>
            </tr>
            <tr>
              <td className="p-3 border font-medium">Schwab</td>
              <td className="p-3 border">0%</td>
              <td className="p-3 border">$0</td>
              <td className="p-3 border">Limited</td>
              <td className="p-3 border">Up to $100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
