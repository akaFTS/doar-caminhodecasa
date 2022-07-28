import React from 'react';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from './BasketItem.module.css';

export default function BasketItem({ item, onAmountChanged }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageSlot}>
        <Image
          src={`/${item.product.picture}`}
          alt=""
          height={120}
          width={120}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>{item.product.name}</h3>
          <p className={styles.price}>R${item.product.price},00</p>
        </div>
        <div className={styles.toolbar}>
          <button type="button" onClick={() => onAmountChanged(-1)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{item.amount}</span>
          <button type="button" onClick={() => onAmountChanged(+1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
