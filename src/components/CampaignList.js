import React from "react";
import Campaign from "./Campaign";
import * as styles from "./CampaignList.module.css";

export default function CampaignList() {
  return (
    <section className={styles.campaignList}>
      <h2 className={styles.title}>
        Nossas <span className={styles.highlight}>Campanhas</span>
      </h2>
      <div className={styles.underline} />
      <div className={styles.campaigns}>
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
      </div>
    </section>
  );
}
