import React from "react";
import { Helmet } from "react-helmet";
import CampaignDetails from "../components/campaigns/CampaignDetails";
import CampaignList from "../components/campaigns/CampaignList";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import campaigns from "../campaigns.json";
import SocialWall from "../components/layout/SocialWall";

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
      <SocialWall />
      <Footer />
    </>
  );
}
