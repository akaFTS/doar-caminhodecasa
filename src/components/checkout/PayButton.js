import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./PayButton.module.css";

export default function PayButton({ isProcessing, total }) {
  return (
    <button type="submit" className={styles.button} disabled={isProcessing}>
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
  );
}
