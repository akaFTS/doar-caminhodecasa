import React, { useContext } from "react";
import Footer from "../components/layout/Footer";
import AltHeader from "../components/layout/AltHeader";
import { Helmet } from "react-helmet";
import BasketContext from "../BasketContext";
import PersonalDataContext from "../PersonalDataContext";
import PixCheckout from "../components/pix/PixCheckout";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import { anyBlank } from "../paymentUtils";
import queryString from "query-string";

export default function CardPaymentPage() {
  const navigate = useNavigate();
  const { basket, setBasket } = useContext(BasketContext);
  const { personalData, setPersonalData } = useContext(PersonalDataContext);

  if (Object.keys(basket).length == 0 || anyBlank(personalData)) {
    return <Navigate to="/cesta" />;
  }

  const total = Object.values(basket).reduce(
    (total, current) => total + current.amount * current.product.price,
    0
  );

  const description = Object.values(basket)
    .map(
      (obj) =>
        `${obj.product.name} x${obj.amount} : R$${
          obj.amount * obj.product.price
        },00`
    )
    .join(" - ");

  const handleSuccessfulCheckout = (orderNumber, paymentCode) => {
    // Empty basket
    setBasket({});

    // Empty personal data
    setPersonalData({
      name: "",
      email: "",
      cpf: "",
    });

    // Navigate to Thanks page
    const params = queryString.stringify({
      name: personalData.name,
      orderNumber,
      total,
      paymentCode,
    });
    navigate("/obrigado?" + params);
  };

  return (
    <>
      <Helmet>
        <title>Pagamento - Caminho de Casa</title>
        <meta property="og:title" content="Pagamento - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Helmet>
      <AltHeader />
      <main>
        <PixCheckout
          personalData={personalData}
          total={total}
          description={description}
          onSuccessfulCheckout={handleSuccessfulCheckout}
        />
      </main>
      <Footer />
    </>
  );
}
