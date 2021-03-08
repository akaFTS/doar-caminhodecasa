import React from "react";
import * as styles from "./CampaignList.module.css";

export default function CampaignList() {
  return (
    <section className={styles.campaignList}>
      <h2 className={styles.title}>
        Nossas <span className={styles.highlight}>Campanhas</span>
      </h2>
      <div className={styles.underline} />
      <div className={styles.campaigns}>
        <div className={styles.campaignWrapper}>oi</div>
        <div className={styles.campaignWrapper}>oi</div>
        <div className={styles.campaignWrapper}>oi</div>
        <div className={styles.campaignWrapper}>oi</div>
        <div className={styles.campaignWrapper}>oi</div>
      </div>
    </section>
  );
}
