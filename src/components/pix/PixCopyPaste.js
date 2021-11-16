import React, { useState } from "react";
import * as styles from "./PixCopyPaste.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function PixCopyPaste({ copypaste }) {
  const [showCode, setShowCode] = useState(false);

  return showCode ? (
    <div className={styles.codeBox}>
      <span>Cole este código no app do banco:</span>
      <textarea readOnly="true">{copypaste}</textarea>
    </div>
  ) : (
    <button className={styles.copyButton} onClick={() => setShowCode(true)}>
      <FontAwesomeIcon icon={faCopy} />
      <span>Copia-e-Cola</span>
    </button>
  );
}
