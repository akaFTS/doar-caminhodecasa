import React, { useContext } from "react";
import BasketItem from "./BasketItem";
import * as styles from "./Basket.module.css";
import BasketTotal from "./BasketTotal";
import BasketContext from "../../BasketContext";

export default function Basket() {
  const { basket, setBasket } = useContext(BasketContext);

  const handleAmountChanged = (slug, delta) => {
    const { [slug]: target, ...restOfBasket } = basket;

    if (target.amount + delta == 0) {
      setBasket(restOfBasket);
      return;
    }

    setBasket({
      ...restOfBasket,
      [slug]: {
        product: target.product,
        amount: target.amount + delta,
      },
    });
  };

  const orderedBasket = Object.entries(basket).sort(([a_slug], [b_slug]) =>
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
      <BasketTotal items={basket} />
    </main>
  );
}
