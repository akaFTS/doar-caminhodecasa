import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Donation.module.css';
import { useBasket } from 'contexts/BasketContext';

export default function Donation({ donation }) {
  const { basket, setBasket } = useBasket();
  const router = useRouter();

  const addToBasket = (product) => {
    const amount = basket[product.slug] ? basket[product.slug].amount + 1 : 1;
    setBasket({
      ...basket,
      [product.slug]: { amount, product },
    });

    router.push('/cesta');
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSlot}>
        <Image src={`/${donation.picture}`} alt="" width={130} height={130} />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>{donation.name}</h3>
          <p className={styles.price}>R${donation.price},00</p>
        </div>
        <div className={styles.toolbar}>
          <button type="button" onClick={() => addToBasket(donation)}>
            Doar
          </button>
        </div>
      </div>
    </div>
  );
}
