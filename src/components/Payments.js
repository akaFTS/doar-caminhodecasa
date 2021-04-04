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
  shouldFlagBlankFields,
}) {
  const [focused, setFocused] = useState("");

  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

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
            className={`${styles.input} ${
              shouldFlagBlankFields && isBlank(number) ? styles.blankInput : ""
            }`}
            placeholder="Número do cartão"
            value={number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="text"
            name="cardname"
            placeholder="Nome (como consta no cartão)"
            className={`${styles.input} ${
              shouldFlagBlankFields && isBlank(cardname)
                ? styles.blankInput
                : ""
            }`}
            value={cardname}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Validade"
            className={`${styles.input} ${styles.halfInput} ${
              shouldFlagBlankFields && isBlank(expiry) ? styles.blankInput : ""
            }`}
            value={expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            className={`${styles.input} ${styles.halfInput} ${
              shouldFlagBlankFields && isBlank(cvc) ? styles.blankInput : ""
            }`}
            value={cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input type="hidden" name="issuer" value={issuer} />
        </div>
      </div>
      <p className={styles.info}>
        Não lemos ou armazenamos os dados do seu cartão. Eles são encriptados e
        transmitidos por uma conexão segura até a operadora de pagamento.
      </p>
    </section>
  );
}
