import React from "react";
import CampaignDetails from "./components/CampaignDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  document.title = "Manto Azul - Caminho de Casa";

  return (
    <>
      <Header inverted={true} />
      <CampaignDetails featured={false} />
      <Footer />
    </>
  );
}
