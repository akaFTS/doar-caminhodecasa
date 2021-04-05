import React, { useState } from "react";
import axios from "axios";
import * as styles from "./Checkout.module.css";
import CardPayment from "./CardPayment";
import PersonalData from "./PersonalData";
import ErrorBanner from "./ErrorBanner";
import { tokenizeCard } from "../../paymentUtils";
import PayButton from "./PayButton";

export default function Checkout({ basket, onCheckoutFinished }) {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardname, setCardname] = useState("");
  const [number, setNumber] = useState("");
  const [issuer, setIssuer] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const total = Object.values(basket).reduce(
    (total, current) => total + current.amount * current.product.price,
    0
  );

  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

  const handleFormSubmit = async (e) => {
    setError("");
    e.preventDefault();

    // Check inputs
    if (
      isBlank(number) ||
      isBlank(cardname) ||
      isBlank(expiry) ||
      isBlank(cvc) ||
      isBlank(name) ||
      isBlank(phone) ||
      isBlank(cpf) ||
      isBlank(email)
    ) {
      setError("blank");
      return;
    }

    // Send charge request
    try {
      setProcessing(true);
      const cardHash = await tokenizeCard(number, cardname, cvc, expiry);

      const description = Object.values(basket)
        .map(
          (obj) =>
            `${obj.product.name} x${obj.amount} : R$${
              obj.amount * obj.product.price
            },00`
        )
        .join(" - ");

      const response = await axios.post("/.netlify/functions/pay-donation", {
        name,
        phone,
        cpf,
        email,
        cardHash,
        total,
        description,
      });

      onCheckoutFinished({
        orderNumber: response.data.orderNumber,
        name,
        total,
        paymentCode: "card",
      });
    } catch (e) {
      if (!e.response) {
        setError("server_validation");
      } else if (e.response.status == 400) {
        setError("server_validation");
      } else if (e.response.status == 422) {
        setError("server_card");
      } else {
        setError("server_internal");
      }
      setProcessing(false);
    }
  };

  return (
    <form className={styles.checkoutForm} onSubmit={handleFormSubmit}>
      <PersonalData
        name={name}
        cpf={cpf}
        email={email}
        phone={phone}
        setName={setName}
        setCpf={setCpf}
        setEmail={setEmail}
        setPhone={setPhone}
        shouldFlagBlankFields={error == "blank"}
      />
      <CardPayment
        cardname={cardname}
        number={number}
        cvc={cvc}
        expiry={expiry}
        issuer={issuer}
        setCardname={setCardname}
        setNumber={setNumber}
        setCvc={setCvc}
        setExpiry={setExpiry}
        setIssuer={setIssuer}
        shouldFlagBlankFields={error == "blank"}
      />
      <div>
        <PayButton isProcessing={isProcessing} total={total} />
        {error != "" && <ErrorBanner error={error} />}
      </div>
    </form>
  );
}
