import React from "react";
import * as styles from "./Donation.module.css";

export default function Donation({ donation }) {
  return (
    <div className={styles.donation}>
      <div className={styles.donationDetails}>
        <h4>{donation.name}</h4>
        <p>{donation.description}</p>
      </div>
      <div className={styles.donationAction}>
        <h5>R${donation.price},00</h5>
        <button>Doar</button>
      </div>
    </div>
  );
}
