import React, { useState, useContext } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import * as styles from "./Checkout.module.css";
import PersonalData from "./PersonalData";
import BasketContext from "../../BasketContext";
import CardCheckout from "./CardCheckout";
import PaymentChooser from "./PaymentChooser";
import PixCheckout from "./PixCheckout";

export default function Checkout() {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();

  const [flagBlankFields, setFlagBlankFields] = useState(false);
  const [payment, setPayment] = useState("card");
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

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
    <div className={styles.checkoutForm}>
      <PersonalData
        data={personalData}
        setData={setPersonalData}
        shouldFlagBlankFields={flagBlankFields}
      />
      <section>
        <h1 className={styles.title}>Dados de Pagamento</h1>
        <div className={styles.underline}></div>
        <PaymentChooser payment={payment} setPayment={(p) => setPayment(p)} />
        <CardCheckout
          hidden={payment != "card"}
          personalData={personalData}
          total={total}
          description={description}
          onSuccessfulCheckout={handleSuccessfulCheckout}
          onValidationFailed={() => setFlagBlankFields(true)}
        />
        <PixCheckout
          hidden={payment != "pix"}
          personalData={personalData}
          total={total}
          description={description}
          onSuccessfulCheckout={handleSuccessfulCheckout}
          onValidationFailed={() => setFlagBlankFields(true)}
        />
      </section>
    </div>
  );
}
