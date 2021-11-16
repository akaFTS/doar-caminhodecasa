import React, { useContext } from "react";
import Footer from "../components/layout/Footer";
import AltHeader from "../components/layout/AltHeader";
import { Helmet } from "react-helmet";
import BasketContext from "../BasketContext";
import PersonalDataContext from "../PersonalDataContext";
import PersonalData from "../components/checkout/PersonalData";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

export default function PersonalDataPage() {
  const navigate = useNavigate();
  const { basket } = useContext(BasketContext);
  const { personalData, setPersonalData } = useContext(PersonalDataContext);

  if (Object.keys(basket).length == 0) {
    return <Navigate to="/cesta" />;
  }

  const handleProceedToPayment = (type) => {
    navigate("/pagamento_" + type);
  };

  return (
    <>
      <Helmet>
        <title>Dados Pessoais - Caminho de Casa</title>
        <meta property="og:title" content="Dados Pessoais - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Helmet>
      <AltHeader />
      <main>
        <PersonalData
          data={personalData}
          setData={setPersonalData}
          onProceedToPayment={handleProceedToPayment}
        />
      </main>
      <Footer />
    </>
  );
}
