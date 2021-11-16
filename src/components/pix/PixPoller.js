import React, { useEffect } from "react";
import axios from "axios";
import * as styles from "./PixPoller.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
    <div className={styles.poller}>
      <FontAwesomeIcon icon={faSpinner} spin={true} size="lg" />
      <span className={styles.text}>
        Aguardando confirmação de pagamento... Se a página não atualizar
        automaticamente,{" "}
        <button className={styles.action} onClick={poll}>
          clique aqui
        </button>
        .
      </span>
    </div>
  );
}
