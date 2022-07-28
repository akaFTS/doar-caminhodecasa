import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CampaignDetails from 'components/campaigns/CampaignDetails';
import Footer from 'components/layout/Footer';
import CampaignList from 'components/campaigns/CampaignList';
import AltHeader from 'components/layout/AltHeader';
import campaigns from 'data/campaigns.json';

export default function CampaignPage() {
  const router = useRouter();
  const { slug } = router.query;
  const campaign = campaigns.find((cp) => cp.slug === slug);
  const otherCampaigns = campaigns.filter((cp) => cp.slug !== slug);

  if (!campaign) {
    return router.push('/');
  }

  return (
    <>
      <Head>
        <title>{campaign.name} - Caminho de Casa</title>
        <meta
          property="og:title"
          content={`${campaign.name} - Caminho de Casa`}
        />
        <meta property="og:site_name" content="Caminho de Casa" />
        <meta property="og:description" content={campaign.short_description} />
        <meta name="description" content={campaign.short_description} />
      </Head>
      <AltHeader />
      <CampaignDetails campaign={campaign} featured={false} />
      <CampaignList campaigns={otherCampaigns} others />
      <Footer />
    </>
  );
}
