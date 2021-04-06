import React, { useState, useContext } from "react";
import axios from "axios";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import * as styles from "./Checkout.module.css";
import CardPayment from "./CardPayment";
import PersonalData from "./PersonalData";
import ErrorBanner from "./ErrorBanner";
import { tokenizeCard } from "../../paymentUtils";
import PayButton from "./PayButton";
import BasketContext from "../../BasketContext";

export default function Checkout() {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();

  const [personalData, setPersonalData] = useState({
    name: "",
    phone: "",
    email: "",
    cpf: "",
  });

  const [cardData, setCardData] = useState({
    number: "",
    cardname: "",
    cvc: "",
    expiry: "",
  });

  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState("");

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

  const anyBlank = (obj) => {
    return Object.values(obj).some((str) => !str || /^\s*$/.test(str));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check inputs
    if (anyBlank(cardData) || anyBlank(personalData)) {
      setError("blank");
      return;
    }

    // Send charge request
    try {
      setProcessing(true);
      const cardHash = await tokenizeCard(cardData);
      const response = await axios.post("/.netlify/functions/pay-donation", {
        name: personalData.name,
        phone: personalData.phone,
        cpf: personalData.cpf,
        email: personalData.email,
        cardHash,
        total,
        description,
      });

      // Empty basket
      setBasket({});

      // Navigate to Thanks page
      const params = queryString.stringify({
        orderNumber: response.data.orderNumber,
        name: personalData.name,
        total,
        paymentCode: "card",
      });
      navigate("/obrigado?" + params);
    } catch (e) {
      setError(
        !e.response || e.response.status == 400
          ? "server_validation"
          : e.response.status == 422
          ? "server_card"
          : "server_internal"
      );
      setProcessing(false);
    }
  };

  return (
    <form className={styles.checkoutForm} onSubmit={handleFormSubmit}>
      <PersonalData
        data={personalData}
        setData={setPersonalData}
        shouldFlagBlankFields={error == "blank"}
      />
      <CardPayment
        data={cardData}
        setData={setCardData}
        shouldFlagBlankFields={error == "blank"}
      />
      <div>
        <PayButton isProcessing={isProcessing} total={total} />
        {error != "" && <ErrorBanner error={error} />}
      </div>
    </form>
  );
}
