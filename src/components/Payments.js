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

export default function Payments({ total }) {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [focused, setFocused] = useState("");
  const [issuer, setIssuer] = useState("");
  const [isValidNumber, setValidNumber] = useState(false);

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  const isButtonEnabled = () => {
    const isBlank = (str) => {
      return !str || /^\s*$/.test(str);
    };

    return isValidNumber && !isBlank(name) && !isBlank(expiry) && !isBlank(cvc);
  };

  const handleInputChange = (e) => {
    if (e.target.name == "number") {
      setNumber(formatCreditCardNumber(e.target.value));
    } else if (e.target.name == "expiry") {
      setExpiry(formatExpirationDate(e.target.value));
    } else if (e.target.name == "cvc") {
      setCvc(formatCVC(e.target.value));
    } else {
      setName(e.target.value);
    }
  };

  const handleCardCallback = ({ issuer }, isValid) => {
    setValidNumber(isValid);
    if (isValid) {
      setIssuer(issuer);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Dados de Pagamento</h1>
      <div className={styles.underline}></div>
      <div className={styles.cardWrap}>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          locale={{ valid: "Validade" }}
          placeholders={{ name: "" }}
          callback={handleCardCallback}
        />
        <form className={styles.form}>
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
            name="name"
            placeholder="Nome (como consta no cartão)"
            className={styles.input}
            value={name}
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
          <button
            type="submit"
            className={styles.button}
            disabled={!isButtonEnabled()}
          >
            Doar R${total},00
          </button>
        </form>
      </div>
    </main>
  );
}
