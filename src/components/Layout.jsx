import React from "react";
import PageShell from "./layout/PageShell";

export default function Layout({ children }) {
  return <PageShell mainClassName="bg-[#050B1A] text-slate-100">{children}</PageShell>;
}
