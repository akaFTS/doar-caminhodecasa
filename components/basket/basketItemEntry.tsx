import React from 'react';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/legacy/image';
import styles from './basketItemEntry.module.css';
import { BasketItem } from 'types/basket';

type Props = {
  item: BasketItem;
  onAmountChanged: (delta: number) => void;
};

export default function BasketItemEntry({ item, onAmountChanged }: Props) {
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
