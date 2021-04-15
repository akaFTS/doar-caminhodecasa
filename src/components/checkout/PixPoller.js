import React, { useEffect } from "react";
import axios from "axios";
import * as styles from "./PixPoller.module.css";

export default function PixPoller({ txid, onPaid }) {
  const poll = async () => {
    const response = await axios.get(
      "/.netlify/functions/is-paid?txid=" + txid
    );

    if (response.data.isPaid) {
      onPaid(response.data.chargeCode);
    }
  };

  useEffect(() => {
    if (txid == "") return;

    const intervalId = setInterval(poll, 2000);

    // Stop polling after 10 minutes
    const timeoutId = setTimeout(() => clearInterval(intervalId), 600000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [txid]);
  return (
    <p className={styles.paragraph}>
      A página atualizará automaticamente ao detectar o pagamento. Caso isso não
      aconteça,{" "}
      <button className={styles.action} onClick={poll}>
        clique aqui
      </button>
      .
    </p>
  );
}
