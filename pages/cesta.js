import React from 'react';
import Head from 'next/head';
import Footer from 'components/layout/Footer';
import AltHeader from 'components/layout/AltHeader';
import Basket from 'components/basket/Basket';
import EmptyBasket from 'components/basket/EmptyBasket';
import { useBasket } from 'contexts/BasketContext';

export default function BasketPage() {
  const { basket } = useBasket();

  return (
    <>
      <Head>
        <title>Minha Cesta - Caminho de Casa</title>
        <meta property="og:title" content="Minha Cesta - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      <AltHeader />
      <main>
        {Object.keys(basket).length > 0 ? <Basket /> : <EmptyBasket />}
      </main>
      <Footer />
    </>
  );
}
