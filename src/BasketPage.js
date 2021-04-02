import React, { useContext } from "react";
import Footer from "./components/Footer";
import AltHeader from "./components/AltHeader";
import { Helmet } from "react-helmet";
import Basket from "./components/Basket";
import EmptyBasket from "./components/EmptyBasket";
import BasketContext from "./BasketContext";
import Checkout from "./components/Checkout";

export default function BasketPage() {
  const { basket, setBasket } = useContext(BasketContext);

  const totalPrice = Object.values(basket).reduce(
    (total, current) => total + current.amount * current.product.price,
    0
  );

  return (
    <>
      <Helmet>
        <title>Minha Cesta - Caminho de Casa</title>
        <meta property="og:title" content={`Minha Cesta - Caminho de Casa`} />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Helmet>
      <AltHeader />
      {Object.keys(basket).length > 0 ? (
        <>
          <Basket items={basket} onItemsChanged={setBasket} />
          <Checkout total={totalPrice} />
        </>
      ) : (
        <EmptyBasket />
      )}

      <Footer />
    </>
  );
}
