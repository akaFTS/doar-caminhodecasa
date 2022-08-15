import React from 'react';
import Head from 'next/head';
import CampaignDetails from 'components/campaigns/campaignDetails';
import CampaignList from 'components/campaigns/campaignList';
import campaigns from 'data/campaigns.yml';
import { Campaign } from 'types/campaigns';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = () => ({
  paths: campaigns.map((cp) => ({ params: { slug: cp.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params;
  const campaign = campaigns.find((cp) => cp.slug === slug);

  return { props: { campaign } };
};

type Props = {
  campaign: Campaign;
};

export default function CampaignPage({ campaign }: Props) {
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
      <CampaignDetails campaign={campaign} />
      <CampaignList campaigns={otherCampaigns} others />
    </>
  );
}
