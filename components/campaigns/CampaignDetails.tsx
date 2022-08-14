import React from 'react';
import styles from './CampaignDetails.module.css';
import DonationEntry from './DonationEntry';
import CampaignCarousel from './CampaignCarousel';
import { Campaign } from 'types/campaigns';

type Props = {
  campaign: Campaign;
  featured?: true;
};

export default function CampaignDetails({ campaign, featured }: Props) {
  const paragraphs = campaign.long_description.split('#');

  return (
    <section className={styles.details}>
      {featured ? (
        <h5 className={styles.featured}>Projeto em Destaque</h5>
      ) : null}
      <h2 className={styles.title}>{campaign.name}</h2>
      <div className={styles.underline} />
      <div className={styles.description}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <main className={styles.content}>
        <div className={styles.carouselWrapper}>
          <CampaignCarousel slidePictures={campaign.slide_pictures} />
        </div>
        <div className={styles.donationsWrapper}>
          {campaign.donations.map((donation) => (
            <DonationEntry donation={donation} key={donation.name} />
          ))}
        </div>
      </main>
    </section>
  );
}

CampaignDetails.defaultProps = {
  featured: false,
};
