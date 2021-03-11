import React from "react";
import CampaignDetails from "./components/CampaignDetails";
import CampaignList from "./components/CampaignList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <CampaignDetails />
      <CampaignList />
      <Footer />
    </>
  );
}
