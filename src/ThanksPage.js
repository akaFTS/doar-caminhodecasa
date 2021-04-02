import React from "react";
import { useLocation, Navigate } from "react-router";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import AltHeader from "./components/AltHeader";
import ThanksBox from "./components/ThanksBox";
import Footer from "./components/Footer";

export default function ThanksPage() {
  const query = queryString.parse(useLocation().search);

  if (!query.orderNumber || !query.name || !query.total || !query.paymentCode) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Doação Efetuada - Caminho de Casa</title>
        <meta property="og:title" content="Doação Efetuada - Caminho de Casa" />
      </Helmet>
      <AltHeader />
      <ThanksBox
        orderNumber={query.orderNumber}
        name={query.name}
        total={query.total}
        paymentCode={query.paymentCode}
      />
      <Footer />
    </>
  );
}
