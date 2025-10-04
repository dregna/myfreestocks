export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-green-600">MyFreeStocks</h1>
      <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
        <li><a href="#" className="hover:text-green-500">Home</a></li>
        <li><a href="#" className="hover:text-green-500">Offers</a></li>
        <li><a href="#" className="hover:text-green-500">News</a></li>
      </ul>
    </nav>
  );
}
