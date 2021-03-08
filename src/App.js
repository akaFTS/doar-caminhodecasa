import React from "react";
import Campaign from "./components/Campaign";
import CampaignList from "./components/CampaignList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Campaign />
      <CampaignList />
      <Footer />
    </>
  );
}
