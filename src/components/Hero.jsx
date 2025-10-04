export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-20 px-6 bg-gradient-to-b from-green-100 to-white dark:from-gray-900 dark:to-black">
      <h2 className="text-4xl md:text-6xl font-extrabold text-green-700 dark:text-green-400 mb-4">Track. Earn. Grow.</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">Your gateway to free stocks, live market data, and smarter investing.</p>
      <div className="flex gap-4">
        <a href="#" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">View Free Offers</a>
        <a href="#" className="border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-900 transition">Join the Community</a>
      </div>
    </section>
  );
}
