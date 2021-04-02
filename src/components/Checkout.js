import React, { useState } from "react";
import * as styles from "./Checkout.module.css";
import Payments from "./Payments";
import PersonalData from "./PersonalData";

export default function Checkout({ total }) {
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

  const isButtonEnabled = () => {
    const isBlank = (str) => {
      return !str || /^\s*$/.test(str);
    };

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

  return (
    <form className={styles.checkoutForm}>
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
      <button
        type="submit"
        className={styles.button}
        disabled={!isButtonEnabled()}
      >
        Doar R${total},00
      </button>
    </form>
  );
}
