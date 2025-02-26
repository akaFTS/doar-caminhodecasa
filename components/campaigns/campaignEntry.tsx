import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './campaignEntry.module.css';
import { Campaign } from 'types/campaigns';

type Props = {
  campaign: Campaign;
};

export default function CampaignEntry({ campaign }: Props) {
  const lowestDonation = campaign.donations.reduce(
    (min, current) => (current.price < min ? current.price : min),
    999999,
  );

  return (
    <article className={styles.campaign}>
      <header className={styles.header}>
        <Image
          className={styles.cover}
          src={`/${campaign.cover_picture}`}
          alt=""
          fill
          sizes="300px"
        />
      </header>
      <main className={styles.main}>
        <Link href={`/projetos/${campaign.slug}`}>
          <h3 className={campaign.name.length > 17 ? styles.smallerFont : ''}>
            {campaign.name}
          </h3>
        </Link>
        <div className={styles.underline} />
        <p>{campaign.short_description}</p>
      </main>
      <footer className={styles.footer}>
        <div className={styles.from}>
          <p>a partir de</p>
          <h4>R${lowestDonation},00</h4>
        </div>
        <Link
          href={`/projetos/${campaign.slug}`}
          className={styles.donateButton}
        >
          Conhecer
        </Link>
      </footer>
    </article>
  );
}
