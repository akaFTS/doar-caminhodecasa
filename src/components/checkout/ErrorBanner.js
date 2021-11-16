import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./ErrorBanner.module.css";

export default function ErrorBanner({ error }) {
  return (
    <div className={styles.alert}>
      <FontAwesomeIcon className={styles.icon} icon={faExclamationCircle} />
      <p>
        {error == "blank"
          ? "Preencha todos os campos!"
          : error == "pix_blank"
          ? "Primeiro, preencha seus dados pessoais."
          : error == "server_validation"
          ? "Não foi possível completar sua doação. Verifique seus dados e tente novamente."
          : error == "server_card"
          ? "Não foi possível completar sua doação com este cartão. Por favor, tente novamente com outro."
          : error == "server_antifraud"
          ? "Não foi possível autorizar o pagamento neste cartão. Tente novamente com outro ou utilize o Pix."
          : "Ocorreu um erro interno. Por favor, tente novamente mais tarde."}
      </p>
    </div>
  );
}
