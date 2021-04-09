import React, { useState } from "react";
import ErrorBanner from "./ErrorBanner";
import PixButton from "./PixButton";
import PixCode from "./PixCode";
import axios from "axios";
import * as styles from "./PixCheckout.module.css";
import PixInstructions from "./PixInstructions";
import PixCopyPaste from "./PixCopyPaste";

function anyBlank(obj) {
  return Object.values(obj).some((str) => !str || /^\s*$/.test(str));
}

export default function PixCheckout({
  personalData,
  total,
  description,
  onValidationFailed,
  hidden,
}) {
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [copypaste, setCopypaste] = useState("");

  const handleButtonPressed = async () => {
    if (isProcessing) return;
    setError("");

    // Validate fields
    if (anyBlank(personalData)) {
      setError("pix_blank");
      onValidationFailed();
      return;
    }

    try {
      setProcessing(true);
      const response = await axios.post("/.netlify/functions/pix-create", {
        name: personalData.name,
        phone: personalData.phone,
        cpf: personalData.cpf,
        email: personalData.email,
        total,
        description,
      });

      setQrcode(response.data.qrcode);
      setCopypaste(response.data.copypaste);
    } catch (e) {
      setError(
        !e.response || e.response.status == 400
          ? "server_validation"
          : "server_internal"
      );
    }
    setProcessing(false);
  };
  return (
    <div style={{ display: hidden ? "none" : "block" }}>
      <div className={styles.container}>
        <div className={styles.pixWrapper}>
          {qrcode == "" ? (
            <PixButton
              onButtonPressed={handleButtonPressed}
              isProcessing={isProcessing}
            />
          ) : (
            <div>
              <PixCode code={qrcode} />
              <PixCopyPaste copypaste={copypaste} />
            </div>
          )}
        </div>
        {qrcode != "" && <PixInstructions copypaste={copypaste} />}
      </div>
      {error != "" && <ErrorBanner error={error} />}
    </div>
  );
}
