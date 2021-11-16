import React from "react";
import * as styles from "./CardDisclaimer.module.css";

export default function CardDisclaimer() {
  return (
    <p className={styles.info}>
      Não lemos ou armazenamos os dados do seu cartão. Eles são encriptados e
      transmitidos por uma conexão segura até a operadora de pagamento.
    </p>
  );
}
