import React from "react";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import PixIcon from "./PixIcon";
import * as styles from "./PaymentChooser.module.css";

export default function PaymentChooser({ payment, setPayment }) {
  return (
    <div className={styles.picker}>
      <button
        onClick={() => setPayment("card")}
        className={cx({
          [styles.option]: true,
          [styles.selected]: payment == "card",
        })}
      >
        <FontAwesomeIcon icon={faCreditCard} className={styles.icon} />
        <span>Cartão de Crédito</span>
      </button>
      <button
        onClick={() => setPayment("pix")}
        className={cx({
          [styles.option]: true,
          [styles.selected]: payment == "pix",
        })}
      >
        <PixIcon className={styles.iconSvg} />
        <span>Pix</span>
      </button>
    </div>
  );
}
