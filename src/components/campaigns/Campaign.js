import React from "react";
import * as styles from "./Campaign.module.css";
import images from "../../images.js";
import { HashLink as Link } from "react-router-hash-link";

export default function Campaign({ campaign }) {
  const lowest_donation = campaign.donations.reduce(
    (min, current) => (current.price < min ? current.price : min),
    999999
  );

  return (
    <article className={styles.campaign}>
      <header className={styles.header}>
        <img
          className={styles.cover}
          src={images[campaign.cover_picture]}
          alt=""
        />
      </header>
      <main className={styles.main}>
        <Link to={`/projetos/${campaign.slug}`}>
          <h3 className={campaign.name.length > 17 ? styles.smallerFont : ""}>
            {campaign.name}
          </h3>
        </Link>
        <div className={styles.underline} />
        <p>{campaign.short_description}</p>
      </main>
      <footer className={styles.footer}>
        <div className={styles.from}>
          <p>a partir de</p>
          <h4>R${lowest_donation},00</h4>
        </div>
        <Link to={`/projetos/${campaign.slug}`} className={styles.donateButton}>
          Conhecer
        </Link>
      </footer>
    </article>
  );
}
