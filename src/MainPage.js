import React, { useEffect } from "react";
import CampaignDetails from "./components/CampaignDetails";
import CampaignList from "./components/CampaignList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  document.title = "Doar - Caminho de Casa";

  return (
    <>
      <Header inverted={false} />
      <Hero />
      <CampaignDetails featured={true} />
      <CampaignList />
      <Footer />
    </>
  );
}
