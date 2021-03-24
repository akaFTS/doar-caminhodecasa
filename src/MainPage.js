import React from "react";
import { Helmet } from "react-helmet";
import CampaignDetails from "./components/CampaignDetails";
import CampaignList from "./components/CampaignList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import campaigns from "./campaigns.json";

export default function App() {
  const featured_campaign = campaigns.find((c) => c.featured == true);

  return (
    <>
      <Helmet>
        <title>Doar - Caminho de Casa</title>
        <meta property="og:title" content="Doar - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
        <meta
          property="og:description"
          content="Todos os meses, centenas de famílias que vivem em comunidades
          carentes e moradores em situação de rua são atendidos pela
          Associação Caminho de Casa. Ajude-nos a manter acesa essa luz de
          solidariedade."
        />
        <meta
          name="description"
          content="Todos os meses, centenas de famílias que vivem em comunidades
          carentes e moradores em situação de rua são atendidos pela
          Associação Caminho de Casa. Ajude-nos a manter acesa essa luz de
          solidariedade."
        />
      </Helmet>
      <Header inverted={false} />
      <Hero />
      <CampaignDetails campaign={featured_campaign} featured={true} />
      <CampaignList campaigns={campaigns} />
      <Footer />
    </>
  );
}
