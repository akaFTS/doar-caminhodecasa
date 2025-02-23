import React from 'react';
import Link from 'next/link';
import styles from './emptyBasket.module.css';

export default function EmptyBasket() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Minha Cesta de Doações</h1>
      <div className={styles.underline} />
      <div className={styles.box}>
        <h3>Sua cesta está vazia!</h3>
        <p>Conheça nossos projetos e faça sua contribuição.</p>
        <Link href="/#projetos" className={styles.donateButton}>
          VER PROJETOS
        </Link>
      </div>
    </main>
  );
}
