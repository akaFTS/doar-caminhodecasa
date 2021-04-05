import React from "react";
import BasketItem from "./BasketItem";
import * as styles from "./Basket.module.css";
import BasketTotal from "./BasketTotal";

export default function Basket({ items, onItemsChanged }) {
  const handleAmountChanged = (slug, delta) => {
    const { [slug]: target, ...restOfBasket } = items;

    if (target.amount + delta == 0) {
      onItemsChanged(restOfBasket);
      return;
    }

    onItemsChanged({
      ...restOfBasket,
      [slug]: {
        product: target.product,
        amount: target.amount + delta,
      },
    });
  };

  const orderedBasket = Object.entries(items).sort(([a_slug], [b_slug]) =>
    a_slug.localeCompare(b_slug)
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Minha Cesta de Doações</h1>
      <div className={styles.underline}></div>
      {orderedBasket.map(([slug, item]) => (
        <BasketItem
          key={slug}
          item={item}
          onAmountChanged={(delta) => handleAmountChanged(slug, delta)}
        />
      ))}
      <BasketTotal items={items} />
    </main>
  );
}
