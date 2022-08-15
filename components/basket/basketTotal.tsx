import React from 'react';
import { Basket } from 'types/basket';
import styles from './basketTotal.module.css';

type Props = {
  basket: Basket;
};

export default function BasketTotal({ basket }: Props) {
  const total = Object.values(basket).reduce(
    (acc, current) => acc + current.amount * current.product.price,
    0,
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
