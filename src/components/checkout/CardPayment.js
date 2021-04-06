import React, { useState } from "react";
import * as styles from "./CardPayment.module.css";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../paymentUtils";

export default function Payments({ data, setData, shouldFlagBlankFields }) {
  const [focused, setFocused] = useState("");

  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  return (
    <section>
      <h1 className={styles.title}>Dados de Pagamento</h1>
      <div className={styles.underline}></div>
      <div className={styles.cardWrap}>
        <Card
          number={data.number}
          name={data.cardname}
          expiry={data.expiry}
          cvc={data.cvc}
          focused={focused}
          locale={{ valid: "Validade" }}
          placeholders={{ name: "" }}
        />
        <div className={styles.formWrap}>
          <input
            type="tel"
            name="number"
            className={`${styles.input} ${
              shouldFlagBlankFields && isBlank(data.number)
                ? styles.blankInput
                : ""
            }`}
            placeholder="Número do cartão"
            value={data.number}
            onChange={(e) =>
              setData({
                ...data,
                number: formatCreditCardNumber(e.target.value),
              })
            }
            onFocus={handleInputFocus}
          />
          <input
            type="text"
            name="cardname"
            placeholder="Nome (como consta no cartão)"
            className={`${styles.input} ${
              shouldFlagBlankFields && isBlank(data.cardname)
                ? styles.blankInput
                : ""
            }`}
            value={data.cardname}
            onChange={(e) => setData({ ...data, cardname: e.target.value })}
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Validade"
            className={`${styles.input} ${styles.halfInput} ${
              shouldFlagBlankFields && isBlank(data.expiry)
                ? styles.blankInput
                : ""
            }`}
            value={data.expiry}
            onChange={(e) =>
              setData({ ...data, expiry: formatExpirationDate(e.target.value) })
            }
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            className={`${styles.input} ${styles.halfInput} ${
              shouldFlagBlankFields && isBlank(data.cvc)
                ? styles.blankInput
                : ""
            }`}
            value={data.cvc}
            onChange={(e) =>
              setData({ ...data, cvc: formatCVC(e.target.value) })
            }
            onFocus={handleInputFocus}
          />
        </div>
      </div>
      <p className={styles.info}>
        Não lemos ou armazenamos os dados do seu cartão. Eles são encriptados e
        transmitidos por uma conexão segura até a operadora de pagamento.
      </p>
    </section>
  );
}
