import React from "react";
import * as styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackdrop}>
        <div className={styles.heroInside}>
          <h2 className={styles.title}>
            Eles <span className={styles.highlight}>precisam</span>
            <br />
            da sua ajuda
          </h2>
          <p className={styles.subtitle}>
            Todos os meses, dezenas de famílias são atendidas pela Associação
            Caminho de Casa. Com poucos cliques, você poderá nos ajudar a
            continuar provendo sustento para essas pessoas utilizando cartão de
            crédito ou Pix.
          </p>
        </div>
      </div>
    </section>
  );
}
