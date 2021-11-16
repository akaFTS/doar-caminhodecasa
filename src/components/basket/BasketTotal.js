import React from "react";
import * as styles from "./BasketTotal.module.css";

export default function BasketTotal({ items }) {
  const total = Object.values(items).reduce(
    (total, current) => total + current.amount * current.product.price,
    0
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h4>Total</h4>
        <h3>R${total},00</h3>
      </div>
    </div>
  );
}
