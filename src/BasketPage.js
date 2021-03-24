import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Helmet } from "react-helmet";
import EmptyBasket from "./EmptyBasket";

export default function BasketPage() {
  return (
    <>
      <Helmet>
        <title>Minha Cesta - Caminho de Casa</title>
        <meta property="og:title" content={`Minha Cesta - Caminho de Casa`} />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Helmet>
      <Header inverted={true} />
      <EmptyBasket />
      <Footer />
    </>
  );
}
