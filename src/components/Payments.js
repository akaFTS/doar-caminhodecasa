import React, { useState } from "react";
import * as styles from "./Payments.module.css";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "../paymentUtils";

export default function Payments({
  cardname,
  number,
  expiry,
  cvc,
  issuer,
  setCardname,
  setNumber,
  setExpiry,
  setCvc,
  setIssuer,
  setValidNumber,
}) {
  const [focused, setFocused] = useState("");

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const handleInputChange = (e) => {
    if (e.target.name == "number") {
      setNumber(formatCreditCardNumber(e.target.value));
    } else if (e.target.name == "expiry") {
      setExpiry(formatExpirationDate(e.target.value));
    } else if (e.target.name == "cvc") {
      setCvc(formatCVC(e.target.value));
    } else {
      setCardname(e.target.value);
    }
  };

  const handleCardCallback = ({ issuer }, isValid) => {
    setValidNumber(isValid);
    if (isValid) {
      setIssuer(issuer);
    }
  };

  return (
    <section>
      <h1 className={styles.title}>Dados de Pagamento</h1>
      <div className={styles.underline}></div>
      <div className={styles.cardWrap}>
        <Card
          number={number}
          name={cardname}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          locale={{ valid: "Validade" }}
          placeholders={{ name: "" }}
          callback={handleCardCallback}
        />
        <div className={styles.formWrap}>
          <input
            type="tel"
            name="number"
            className={styles.input}
            placeholder="Número do cartão"
            value={number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="text"
            name="cardname"
            placeholder="Nome (como consta no cartão)"
            className={styles.input}
            value={cardname}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Validade"
            className={`${styles.input} ${styles.halfInput}`}
            value={expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            className={`${styles.input} ${styles.halfInput}`}
            value={cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input type="hidden" name="issuer" value={issuer} />
        </div>
      </div>
    </section>
  );
}
