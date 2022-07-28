import React from 'react';
import styles from './Basket.module.css';
import { useBasket } from 'contexts/BasketContext';
import BlockLink from 'components/layout/BlockLink';
import BasketItem from './BasketItem';
import BasketTotal from './BasketTotal';

export default function Basket() {
  const { basket, setBasket } = useBasket();

  const handleAmountChanged = (slug, delta) => {
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

  const orderedBasket = Object.entries(basket).sort(([aSlug], [bSlug]) =>
    aSlug.localeCompare(bSlug),
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Minha Cesta de Doações</h1>
      <div className={styles.underline} />
      {orderedBasket.map(([slug, item]) => (
        <BasketItem
          key={slug}
          item={item}
          onAmountChanged={(delta) => handleAmountChanged(slug, delta)}
        />
      ))}
      <BasketTotal items={basket} />
      <BlockLink text="Conhecer mais projetos" secondary to="/#projetos" />
      <BlockLink text="Continuar para o pagamento" to="/dados_pessoais" />
    </main>
  );
}
