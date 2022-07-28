import React from 'react';
import styles from './Hero.module.css';

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
          <div className={styles.subtitle}>
            <p>
              Todos os meses, centenas de famílias que vivem em comunidades
              carentes e moradores em situação de rua são atendidos pela
              Associação Caminho de Casa. Ajude-nos a manter acesa essa luz de
              solidariedade.
            </p>
            <p>Doe. Participe. Faça a sua parte.</p>
            <p>Juntos levaremos esperança a quem mais precisa!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
