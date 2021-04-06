import React, { useContext } from "react";
import Footer from "../components/layout/Footer";
import AltHeader from "../components/layout/AltHeader";
import { Helmet } from "react-helmet";
import Basket from "../components/basket/Basket";
import EmptyBasket from "../components/basket/EmptyBasket";
import BasketContext from "../BasketContext";
import Checkout from "../components/checkout/Checkout";

export default function BasketPage() {
  const { basket } = useContext(BasketContext);

  return (
    <>
      <Helmet>
        <title>Minha Cesta - Caminho de Casa</title>
        <meta property="og:title" content="Minha Cesta - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Helmet>
      <AltHeader />
      {Object.keys(basket).length > 0 ? (
        <>
          <Basket />
          <Checkout />
        </>
      ) : (
        <EmptyBasket />
      )}

      <Footer />
    </>
  );
}
