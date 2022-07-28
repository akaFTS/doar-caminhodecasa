import React from 'react';
import styles from './CampaignList.module.css';
import Campaign from './Campaign';

export default function CampaignList({ campaigns, others }) {
  return (
    <section className={styles.campaignList} id="projetos">
      <h2 className={styles.title}>
        {others ? 'Outros' : 'Nossos'}{' '}
        <span className={styles.highlight}>Projetos</span>
      </h2>
      <div className={styles.underline} />
      <div className={styles.campaigns}>
        {campaigns.map((campaign) => (
          <Campaign campaign={campaign} key={campaign.name} />
        ))}
      </div>
    </section>
  );
}
