import React from 'react';
import styles from './CampaignDetails.module.css';
import Donation from './Donation';
import CampaignCarousel from './CampaignCarousel';

export default function CampaignDetails({ campaign, featured }) {
  const paragraphs = campaign.long_description.split('#');

  return (
    <section className={styles.details}>
      {featured ? (
        <h5 className={styles.featured}>Projeto em Destaque</h5>
      ) : null}
      <h2 className={styles.title}>{campaign.name}</h2>
      <div className={styles.underline} />
      <div className={styles.description}>
        {paragraphs.map((paragraph, index) => (
          <p
            className={
              index === paragraphs.length - 1 &&
              campaign.highlight_last_paragraph
                ? styles.bold
                : ''
            }
            key={paragraph}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <main className={styles.content}>
        <div className={styles.carouselWrapper}>
          <CampaignCarousel slidePictures={campaign.slide_pictures} />
        </div>
        <div className={styles.donationsWrapper}>
          {campaign.donations.map((donation) => (
            <Donation donation={donation} key={donation.name} />
          ))}
        </div>
      </main>
    </section>
  );
}
