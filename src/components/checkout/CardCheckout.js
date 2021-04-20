import React, { useState } from "react";
import axios from "axios";
import CardPayment from "./CardPayment";
import ErrorBanner from "./ErrorBanner";
import { tokenizeCard } from "../../paymentUtils";
import PayButton from "./PayButton";
import TipBanner from "./TipBanner";
import CardDisclaimer from "./CardDisclamer";
import CardAddress from "./CardAddress";

function anyBlank(obj, except = []) {
  return Object.entries(obj).some(([key, val]) => {
    if (except.includes(key)) return false;

    return !val || /^\s*$/.test(val);
  });
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

  const [addressData, setAddressData] = useState({
    cep: "",
    street: "",
    streetNumber: "",
    complement: "",
    city: "",
    state: "",
  });

  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check inputs
    if (
      anyBlank(cardData) ||
      anyBlank(personalData) ||
      anyBlank(addressData, ["complement"])
    ) {
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
        street: addressData.street,
        streetNumber: addressData.streetNumber,
        complement: addressData.complement,
        city: addressData.city,
        state: addressData.state,
        cep: addressData.cep,
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
      <CardAddress
        data={addressData}
        setData={setAddressData}
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
