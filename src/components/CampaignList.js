import React from "react";
import Campaign from "./Campaign";
import * as styles from "./CampaignList.module.css";

export default function CampaignList({ campaigns, others }) {
  return (
    <section className={styles.campaignList}>
      <h2 className={styles.title}>
        {others ? "Outras" : "Nossas"}{" "}
        <span className={styles.highlight}>Campanhas</span>
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
