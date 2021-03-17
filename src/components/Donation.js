import React from "react";
import * as styles from "./Donation.module.css";
import images from "../images.js";

export default function Donation({ donation }) {
  return (
    <div className={styles.donation}>
      <div className={styles.imageSlot}>
        <img src={images[donation.picture]} />
      </div>
      <div className={styles.donationInfo}>
        <h4>{donation.name}</h4>
        <div className={styles.donationAction}>
          <h5>R${donation.price},00</h5>
          <button>Doar</button>
        </div>
      </div>
    </div>
  );
}
