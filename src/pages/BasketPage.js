import React, { useContext } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import AltHeader from "../components/layout/AltHeader";
import { Helmet } from "react-helmet";
import Basket from "../components/basket/Basket";
import EmptyBasket from "../components/basket/EmptyBasket";
import BasketContext from "../BasketContext";
import Checkout from "../components/checkout/Checkout";

export default function BasketPage() {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();

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
            basket={basket}
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
