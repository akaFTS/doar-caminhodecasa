import React from "react";
import * as styles from "./BasketItem.module.css";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cesta from "url:../assets/cesta.png";

export default function BasketItem({ item, onAmountChanged }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageSlot}>
        <img src={cesta} />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>{item.product.name}</h3>
          <p className={styles.price}>R${item.product.price},00</p>
        </div>
        <div className={styles.toolbar}>
          <button onClick={() => onAmountChanged(-1)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{item.amount}</span>
          <button onClick={() => onAmountChanged(+1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
