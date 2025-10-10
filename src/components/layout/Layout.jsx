import React, { createContext, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";

const LayoutContext = createContext(false);

export default function Layout({ children }) {
  const isNested = useContext(LayoutContext);

  if (isNested) {
    return <>{children}</>;
  }

  return (
    <LayoutContext.Provider value>
      <div className="min-h-screen flex flex-col bg-[#050B1A] text-slate-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
}
