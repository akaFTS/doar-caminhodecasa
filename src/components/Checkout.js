import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Checkout.module.css";
import Payments from "./Payments";
import PersonalData from "./PersonalData";

function tokenizeCard(cardNumber, holderName, securityCode, expiry) {
  // Sandbox
  const checkout = new DirectCheckout(
    "3A17C3AB5700A8BCE54167690CF4605A061444C2D5484F975C719ED71D0D476B",
    false
  );

  // Production
  // const checkout = new DirectCheckout(
  //   "EAE13EE6623EEC3F1C9381124D6EBE79D2B3579398D7BF0B47CF187137FACCBC217982970CA6740E"
  // );

  const cardData = {
    cardNumber: cardNumber.replace(/\D/g, ""),
    holderName,
    securityCode,
    expirationMonth: expiry.substring(0, 2),
    expirationYear: "20" + expiry.substring(3, 5),
  };

  const cardPromise = new Promise((resolve, reject) =>
    checkout.getCardHash(cardData, resolve, reject)
  );

  return cardPromise;
}

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
      if (e.response.status == 400) {
        setError("server_validation");
      } else if (e.response.status == 422) {
        setError("server_card");
      } else {
        setError("server_internal");
      }
    }
    setProcessing(false);
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
      <Payments
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
        <button type="submit" className={styles.button} disabled={isProcessing}>
          {isProcessing ? (
            <span>
              <FontAwesomeIcon
                icon={faSpinner}
                spin={true}
                className={styles.spinner}
              />
              Processando...
            </span>
          ) : (
            <span>Doar R${total},00</span>
          )}
        </button>
        {error != "" && (
          <div className={styles.alert}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faExclamationCircle}
            />
            <p>
              {error == "blank"
                ? "Todos os campos são obrigatórios."
                : error == "server_validation"
                ? "Não foi possível completar sua doação. Verifique seus dados e tente novamente."
                : error == "server_card"
                ? "Não foi possível completar sua doação com este cartão. Por favor, tente novamente com outro."
                : "Ocorreu um erro interno. Por favor, tente novamente mais tarde."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
