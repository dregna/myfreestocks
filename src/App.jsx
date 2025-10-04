import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <Navbar />
      <Ticker />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
