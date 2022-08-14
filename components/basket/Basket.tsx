import React from 'react';
import styles from './Basket.module.css';
import { useBasket } from 'contexts/BasketContext';
import BlockLink from 'components/layout/BlockLink';
import BasketItemEntry from './BasketItemEntry';
import BasketTotal from './BasketTotal';

export default function Basket() {
  const { basket, setBasket } = useBasket();

  const handleAmountChanged = (slug: string, delta: number) => {
    const { [slug]: target, ...restOfBasket } = basket;

    if (target.amount + delta === 0) {
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

  const orderedBasketEntries = Object.entries(basket).sort(([aSlug], [bSlug]) =>
    aSlug.localeCompare(bSlug),
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Minha Cesta de Doações</h1>
      <div className={styles.underline} />
      {orderedBasketEntries.map(([slug, item]) => (
        <BasketItemEntry
          key={slug}
          item={item}
          onAmountChanged={(delta) => handleAmountChanged(slug, delta)}
        />
      ))}
      <BasketTotal basket={basket} />
      <BlockLink text="Conhecer mais projetos" to="/#projetos" secondary />
      <BlockLink text="Continuar para o pagamento" to="/dados-pessoais" />
    </main>
  );
}
