import React from 'react';
import Head from 'next/head';
import CampaignDetails from 'components/campaigns/CampaignDetails';
import CampaignList from 'components/campaigns/CampaignList';
import campaigns from 'data/campaigns.yml';

export function getStaticPaths() {
  return {
    paths: campaigns.map((cp) => ({ params: { slug: cp.slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const campaign = campaigns.find((cp) => cp.slug === slug);

  return { props: { campaign } };
}

export default function CampaignPage({ campaign }) {
  const otherCampaigns = campaigns.filter((cp) => cp.slug !== campaign.slug);

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
      <CampaignDetails campaign={campaign} featured={false} />
      <CampaignList campaigns={otherCampaigns} others />
    </>
  );
}
