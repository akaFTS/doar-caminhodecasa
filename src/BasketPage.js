import React, { useContext } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import AltHeader from "./components/AltHeader";
import { Helmet } from "react-helmet";
import Basket from "./components/Basket";
import EmptyBasket from "./components/EmptyBasket";
import BasketContext from "./BasketContext";
import Checkout from "./components/Checkout";

export default function BasketPage() {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();

  const totalPrice = Object.values(basket).reduce(
    (total, current) => total + current.amount * current.product.price,
    0
  );

  const handleCheckoutFinished = (payload) => {
    // Empty basket
    setBasket({});

    // Navigate to Thanks page
    const params = queryString.stringify(payload);
    navigate("/obrigado?" + params);
  };

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
          <Basket items={basket} onItemsChanged={setBasket} />
          <Checkout
            total={totalPrice}
            onCheckoutFinished={handleCheckoutFinished}
          />
        </>
      ) : (
        <EmptyBasket />
      )}

      <Footer />
    </>
  );
}
