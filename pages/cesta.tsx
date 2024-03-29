import React from 'react';
import Head from 'next/head';
import Basket from 'components/basket/basket';
import EmptyBasket from 'components/basket/emptyBasket';
import { useBasket } from 'contexts/basketContext';

export default function BasketPage() {
  const { basket } = useBasket();

  return (
    <>
      <Head>
        <title>Minha Cesta - Caminho de Casa</title>
        <meta property="og:title" content="Minha Cesta - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      {Object.keys(basket).length > 0 ? <Basket /> : <EmptyBasket />}
    </>
  );
}
