import React from 'react';
import styles from './CampaignList.module.css';
import CampaignEntry from './CampaignEntry';
import { Campaign } from 'types/campaigns';

type Props = {
  campaigns: Campaign[];
  others?: true;
};

export default function CampaignList({ campaigns, others }: Props) {
  return (
    <section className={styles.campaignList} id="projetos">
      <h2 className={styles.title}>
        {others ? 'Outros' : 'Nossos'}{' '}
        <span className={styles.highlight}>Projetos</span>
      </h2>
      <div className={styles.underline} />
      <div className={styles.campaigns}>
        {campaigns.map((campaign) => (
          <CampaignEntry campaign={campaign} key={campaign.name} />
        ))}
      </div>
    </section>
  );
}

CampaignList.defaultProps = {
  others: false,
};
