import React, { useState } from "react";
import * as styles from "./CardPayment.module.css";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import cx from "classnames";
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
    <div>
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
            className={cx({
              [styles.input]: true,
              [styles.blankInput]:
                shouldFlagBlankFields && isBlank(data.number),
            })}
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
            className={cx({
              [styles.input]: true,
              [styles.blankInput]:
                shouldFlagBlankFields && isBlank(data.cardname),
            })}
            value={data.cardname}
            onChange={(e) => setData({ ...data, cardname: e.target.value })}
            onFocus={handleInputFocus}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Validade"
            className={cx({
              [styles.input]: true,
              [styles.halfInput]: true,
              [styles.blankInput]:
                shouldFlagBlankFields && isBlank(data.expiry),
            })}
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
            className={cx({
              [styles.input]: true,
              [styles.halfInput]: true,
              [styles.blankInput]: shouldFlagBlankFields && isBlank(data.cvc),
            })}
            value={data.cvc}
            onChange={(e) =>
              setData({ ...data, cvc: formatCVC(e.target.value) })
            }
            onFocus={handleInputFocus}
          />
        </div>
      </div>
    </div>
  );
}
