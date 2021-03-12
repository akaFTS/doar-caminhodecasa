import React from "react";
import * as styles from "./Donation.module.css";

export default function Donation() {
  return (
    <div className={styles.donation}>
      <div className={styles.donationDetails}>
        <h4>Cesta Grande</h4>
        <p>
          Esta cesta contém: arroz, feijão, óleo, macarrão, farinha, água e
          açúcar.
        </p>
      </div>
      <div className={styles.donationAction}>
        <h5>R$50,00</h5>
        <button>Doar</button>
      </div>
    </div>
  );
}
