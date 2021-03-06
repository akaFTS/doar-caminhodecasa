import React from "react";
import * as styles from "./EmptyBasket.module.css";
import { HashLink as Link } from "react-router-hash-link";

export default function EmptyBasket() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Minha Cesta de Doações</h1>
      <div className={styles.underline}></div>
      <div className={styles.box}>
        <h3>Sua cesta está vazia!</h3>
        <p>Conheça nossos projetos e faça sua contribuição.</p>
        <Link to="/#projetos" className={styles.donateButton}>
          VER PROJETOS
        </Link>
      </div>
    </main>
  );
}
