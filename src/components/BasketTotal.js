import React from "react";
import * as styles from "./BasketTotal.module.css";
import { HashLink as Link } from "react-router-hash-link";

export default function BasketTotal({ items }) {
  const total = Object.values(items).reduce(
    (total, current) => total + current.amount * current.product.price,
    0
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <p>Há mais projetos necessitando da sua contribuição!</p>
        <Link to="/#projetos" className={styles.seeOthers}>
          Conhecer
        </Link>
        <div className={styles.line} />
        <h4>Total</h4>
        <h3>R${total},00</h3>
      </div>
    </div>
  );
}
