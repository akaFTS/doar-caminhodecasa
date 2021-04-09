import React, { useState } from "react";
import copy from "copy-to-clipboard";
import * as styles from "./PixCopyPaste.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function PixCopyPaste({ copypaste }) {
  const [copied, setCopied] = useState(false);

  const handleButtonClick = () => {
    if (copied) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    copy(copypaste);
  };

  return (
    <button
      className={styles.copyButton}
      onClick={handleButtonClick}
      disabled={copied}
    >
      {copied ? (
        <span>Copiado!</span>
      ) : (
        <>
          <FontAwesomeIcon icon={faCopy} />
          <span>Copia-e-Cola</span>
        </>
      )}
    </button>
  );
}
