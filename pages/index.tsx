import React from 'react';
import Head from 'next/head';
import CampaignDetails from 'components/campaigns/campaignDetails';
import CampaignList from 'components/campaigns/campaignList';
import Hero from 'components/layout/hero';
import SocialWall from 'components/layout/socialWall';
import campaigns from 'data/campaigns.yml';

export default function IndexPage() {
  const featuredCampaign = campaigns.find((c) => c.featured === true);

  return (
    <>
      <Head>
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
      </Head>
      <Hero />
      <CampaignDetails campaign={featuredCampaign} featured />
      <CampaignList campaigns={campaigns} />
      <SocialWall />
    </>
  );
}

IndexPage.displayName = 'index';
