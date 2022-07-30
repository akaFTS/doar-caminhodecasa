import React from 'react';
import Head from 'next/head';
import CampaignDetails from 'components/campaigns/CampaignDetails';
import CampaignList from 'components/campaigns/CampaignList';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import Hero from 'components/layout/Hero';
import SocialWall from 'components/layout/SocialWall';
import campaigns from 'data/campaigns.json';

export async function getStaticProps() {
  return { props: {} };
}

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
      <Header inverted={false} />
      <Hero />
      <CampaignDetails campaign={featuredCampaign} featured />
      <CampaignList campaigns={campaigns} />
      <SocialWall />
      <Footer />
    </>
  );
}
