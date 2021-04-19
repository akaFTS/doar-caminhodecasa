import React, { useState } from "react";
import axios from "axios";
import CardPayment from "./CardPayment";
import ErrorBanner from "./ErrorBanner";
import { tokenizeCard } from "../../paymentUtils";
import PayButton from "./PayButton";
import TipBanner from "./TipBanner";
import CardDisclaimer from "./CardDisclamer";

function anyBlank(obj) {
  return Object.values(obj).some((str) => !str || /^\s*$/.test(str));
}

export default function CardCheckout({
  personalData,
  total,
  description,
  onSuccessfulCheckout,
  onValidationFailed,
  hidden,
}) {
  const [cardData, setCardData] = useState({
    number: "",
    cardname: "",
    cvc: "",
    expiry: "",
  });
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check inputs
    if (anyBlank(cardData) || anyBlank(personalData)) {
      setError("blank");
      onValidationFailed();
      return;
    }

    // Send charge request
    try {
      setProcessing(true);
      const cardHash = await tokenizeCard(cardData);
      const response = await axios.post("/.netlify/functions/card-create", {
        name: personalData.name,
        cpf: personalData.cpf,
        email: personalData.email,
        cardHash,
        total,
        description,
      });
      onSuccessfulCheckout(response.data.orderNumber, "card");
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
    <form
      onSubmit={handleFormSubmit}
      style={{ display: hidden ? "none" : "block" }}
    >
      <TipBanner tip="Pagar com Pix é mais fácil e rápido." />
      <CardPayment
        data={cardData}
        setData={setCardData}
        shouldFlagBlankFields={error == "blank"}
      />
      <CardDisclaimer />
      <div>
        <PayButton isProcessing={isProcessing} total={total} />
        {error != "" && <ErrorBanner error={error} />}
      </div>
    </form>
  );
}
