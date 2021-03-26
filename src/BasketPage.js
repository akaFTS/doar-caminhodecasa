import React, { useContext } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Helmet } from "react-helmet";
import Basket from "./components/Basket";
import BasketContext from "./BasketContext";

export default function BasketPage() {
  const { basket, setBasket } = useContext(BasketContext);

  return (
    <>
      <Helmet>
        <title>Minha Cesta - Caminho de Casa</title>
        <meta property="og:title" content={`Minha Cesta - Caminho de Casa`} />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Helmet>
      <Header inverted={true} />
      <Basket items={basket} onItemsChanged={setBasket} />
      <Footer />
    </>
  );
}

// return (
//   <div style={{ minHeight: "100vh", position: "relative" }}>
//     <Helmet>
//       <title>Minha Cesta - Caminho de Casa</title>
//       <meta property="og:title" content={`Minha Cesta - Caminho de Casa`} />
//       <meta property="og:site_name" content="Caminho de Casa" />
//     </Helmet>
//     <div style={{ paddingBottom: "8em" }}>
//       <Header inverted={true} />
//       <Basket items={basket} onItemsChanged={setBasket} />
//     </div>
//     <div style={{ position: "absolute", bottom: 0 }}>
//       <Footer />
//     </div>
//   </div>
// );
