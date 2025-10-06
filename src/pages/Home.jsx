import React from "react";
import Hero from "../components/Hero";
import Promotions from "../components/Promotions";
import RoboAdvisorTable from "../components/RoboAdvisorTable";
import PageShell from "../components/layout/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Promotions />
      <RoboAdvisorTable />
    </PageShell>
  );
}
