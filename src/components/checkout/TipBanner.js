import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import * as styles from "./TipBanner.module.css";

export default function TipBanner({ tip }) {
  return (
    <div className={styles.alert}>
      <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
      <p>
        <span className={styles.bold}>Dica:</span> {tip}
      </p>
    </div>
  );
}
