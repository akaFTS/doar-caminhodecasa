import React, { useState } from "react";
import axios from "axios";
import CardPayment from "./CardPayment";
import ErrorBanner from "../checkout/ErrorBanner";
import { tokenizeCard, anyBlank } from "../../paymentUtils";
import BlockButton from "../layout/BlockButton";
import CardDisclaimer from "./CardDisclaimer";
import CardAddress from "./CardAddress";
import BackButton from "../checkout/BackButton";
import * as styles from "./CardCheckout.module.css";

export default function CardCheckout({
  personalData,
  total,
  description,
  onSuccessfulCheckout,
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

  const handleFormSubmit = async () => {
    setError("");

    // Check inputs
    if (anyBlank(cardData) || anyBlank(addressData, ["complement"])) {
      setError("blank");
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
          : e.response.status == 403
          ? "server_antifraud"
          : "server_internal"
      );
      setProcessing(false);
    }
  };

  return (
    <main className={styles.main}>
      <BackButton text="Voltar para Meus Dados" path="/dados_pessoais" />
      <h1 className={styles.title}>Dados de Pagamento</h1>
      <div className={styles.underline}></div>
      <form>
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
          {error != "" && <ErrorBanner error={error} />}
          <BlockButton
            isProcessing={isProcessing}
            text={`Finalizar Doação - R$${total},00`}
            onClick={handleFormSubmit}
          />
        </div>
      </form>
    </main>
  );
}
