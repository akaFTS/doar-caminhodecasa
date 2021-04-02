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

export default function Checkout({ total, onCheckoutFinished }) {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardname, setCardname] = useState("");
  const [number, setNumber] = useState("");
  const [issuer, setIssuer] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isValidNumber, setValidNumber] = useState(false);

  const [isProcessing, setProcessing] = useState(false);
  const [canShowError, setShowError] = useState(false);

  const isButtonEnabled = () => {
    const isBlank = (str) => {
      return !str || /^\s*$/.test(str);
    };

    if (isProcessing) return false;

    return (
      isValidNumber &&
      !isBlank(cardname) &&
      !isBlank(expiry) &&
      !isBlank(cvc) &&
      !isBlank(name) &&
      !isBlank(phone) &&
      !isBlank(cpf) &&
      !isBlank(email)
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      setShowError(false);
      const response = await axios.post("/.netlify/functions/pay-donation", {
        name,
        phone,
        cpf,
        email,
        number,
        cardname,
        cvc,
        expiry,
        issuer,
        total,
      });

      onCheckoutFinished({
        orderNumber: response.data.orderNumber,
        name,
        total,
        paymentCode: "card",
      });
    } catch (e) {
      if (e.response.status == 400) {
        setShowError(true);
      } else {
        console.log(e);
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
        setValidNumber={setValidNumber}
      />
      <div>
        <button
          type="submit"
          className={styles.button}
          disabled={!isButtonEnabled()}
        >
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
        {canShowError && (
          <div className={styles.alert}>
            <FontAwesomeIcon
              className={styles.icon}
              icon={faExclamationCircle}
            />
            <p>
              Não foi possível completar sua doação. Verifique seus dados e
              tente novamente.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
