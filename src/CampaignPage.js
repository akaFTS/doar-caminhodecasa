import React from "react";
import { useParams, Navigate } from "react-router";
import CampaignDetails from "./components/CampaignDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CampaignList from "./components/CampaignList";
import campaigns from "./campaigns.json";
import { Helmet } from "react-helmet";

export default function CampaignPage() {
  const { slug } = useParams();
  const campaign = campaigns.find((cp) => cp.slug == slug);
  const other_campaigns = campaigns.filter((cp) => cp.slug != slug);

  if (!campaign) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>{campaign.name} - Caminho de Casa</title>
        <meta
          property="og:title"
          content={`${campaign.name} - Caminho de Casa`}
        />
        <meta property="og:site_name" content="Caminho de Casa" />
        <meta property="og:description" content={campaign.short_description} />
        <meta name="description" content={campaign.short_description} />
      </Helmet>
      <Header inverted={true} />
      <CampaignDetails campaign={campaign} featured={false} />
      <CampaignList campaigns={other_campaigns} others={true} />
      <Footer />
    </>
  );
}
