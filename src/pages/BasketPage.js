import React, { useContext } from "react";
import Footer from "../components/layout/Footer";
import AltHeader from "../components/layout/AltHeader";
import { Helmet } from "react-helmet";
import Basket from "../components/basket/Basket";
import EmptyBasket from "../components/basket/EmptyBasket";
import BasketContext from "../BasketContext";

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
      <main>
        {Object.keys(basket).length > 0 ? <Basket /> : <EmptyBasket />}
      </main>
      <Footer />
    </>
  );
}
