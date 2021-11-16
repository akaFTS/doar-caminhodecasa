import React, { useEffect, useState } from "react";
import ErrorBanner from "../checkout/ErrorBanner";
import PixButton from "./PixButton";
import PixCode from "./PixCode";
import axios from "axios";
import * as styles from "./PixCheckout.module.css";
import PixInstructions from "./PixInstructions";
import PixCopyPaste from "./PixCopyPaste";
import PixPoller from "./PixPoller";
import BackButton from "../checkout/BackButton";

export default function PixCheckout({
  personalData,
  total,
  description,
  onSuccessfulCheckout,
}) {
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [copypaste, setCopypaste] = useState("");
  const [txid, setTxid] = useState("");

  const grabPixCode = async () => {
    if (isProcessing) return;
    setError("");

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
      setTxid(response.data.txid);
    } catch (e) {
      setError(
        !e.response || e.response.status == 400
          ? "server_validation"
          : "server_internal"
      );
    }
    setProcessing(false);
  };

  useEffect(() => {
    grabPixCode();
  }, []);

  return (
    <main className={styles.main}>
      <BackButton text="Voltar para Meus Dados" path="/dados_pessoais" />
      <h1 className={styles.title}>Dados de Pagamento</h1>
      <div className={styles.underline}></div>
      <div className={styles.container}>
        <div className={styles.tip}></div>
        <div className={styles.pixWrapper}>
          {qrcode == "" ? (
            <PixButton
              onButtonPressed={grabPixCode}
              isProcessing={isProcessing}
            />
          ) : (
            <div className={styles.innerWrapper}>
              <PixCode code={qrcode} />
              <PixCopyPaste copypaste={copypaste} />
            </div>
          )}
        </div>
        {qrcode != "" && <PixInstructions copypaste={copypaste} />}
      </div>
      {txid != "" && (
        <PixPoller
          txid={txid}
          onPaid={(chargeCode) => onSuccessfulCheckout(chargeCode, "pix")}
        />
      )}
      {error != "" && <ErrorBanner error={error} />}
    </main>
  );
}
