import React from "react";
import * as styles from "./Campaign.module.css";
import manto from "url:../assets/manto.jpg";

export default function Campaign() {
  return (
    <article className={styles.campaign}>
      <header className={styles.header}>
        <img className={styles.cover} src={manto} />
      </header>
      <main className={styles.main}>
        <h3>Manto Azul</h3>
        <div className={styles.underline} />
        <p>
          Com a sua contribuição, montamos e distribuímos enxovais completos
          para gestantes.
        </p>
      </main>
      <footer className={styles.footer}>
        <div className={styles.from}>
          <p>a partir de</p>
          <h4>R$50,00</h4>
        </div>
        <button className={styles.donateButton}>Conheça</button>
      </footer>
    </article>
  );
}
