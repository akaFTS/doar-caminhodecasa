import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PixCheckout.module.css';
import PixButton from './PixButton';
import PixCode from './PixCode';
import PixInstructions from './PixInstructions';
import PixCopyPaste from './PixCopyPaste';
import PixPoller from './PixPoller';
import BackButton from 'components/checkout/BackButton';
import ErrorBanner from 'components/checkout/ErrorBanner';
import { CheckoutError, PersonalData } from 'types/checkout';

type Props = {
  personalData: PersonalData;
  total: number;
  description: string;
  onSuccessfulCheckout: (orderNumber: string) => void;
};

export default function PixCheckout({
  personalData,
  total,
  description,
  onSuccessfulCheckout,
}: Props) {
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<CheckoutError>(null);
  const [qrcode, setQrcode] = useState('');
  const [copypaste, setCopypaste] = useState('');
  const [txid, setTxid] = useState('');

  const grabPixCode = async () => {
    if (isProcessing) return;
    setError(null);

    try {
      setProcessing(true);
      const response = await axios.post('/api/pix-create', {
        name: personalData.name,
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
        !e.response || e.response.status === 400
          ? 'server_validation'
          : 'unknown',
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
      <div className={styles.underline} />
      <div className={styles.container}>
        <div className={styles.tip} />
        <div className={styles.pixWrapper}>
          {qrcode === '' ? (
            <PixButton
              onButtonPressed={grabPixCode}
              isProcessing={isProcessing}
            />
          ) : (
            <div className={styles.innerWrapper}>
              <PixCode code={qrcode} />
              <PixCopyPaste copyPasteCode={copypaste} />
            </div>
          )}
        </div>
        {qrcode !== '' && <PixInstructions />}
      </div>
      {txid !== '' && <PixPoller txid={txid} onPaid={onSuccessfulCheckout} />}
      {error !== null && <ErrorBanner error={error} />}
    </main>
  );
}
