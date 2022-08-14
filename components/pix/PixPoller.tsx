import React, { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './PixPoller.module.css';

async function poll(txid: string, onPaid: (chargeCode: string) => void) {
  const response = await axios.get(`/api/is-paid?txid=${txid}`);

  if (response.data.isPaid) {
    onPaid(response.data.chargeCode);
  }
}

type Props = {
  txid: string;
  onPaid: (chargeCode: string) => void;
};

export default function PixPoller({ txid, onPaid }: Props) {
  useEffect(() => {
    if (txid === '') return null;

    const intervalId = setInterval(() => poll(txid, onPaid), 2000);

    // Stop polling after 10 minutes
    const timeoutId = setTimeout(() => clearInterval(intervalId), 600000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [txid, onPaid]);
  return (
    <div className={styles.poller}>
      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
      <span className={styles.text}>
        Aguardando confirmação de pagamento... Se a página não atualizar
        automaticamente,{' '}
        <button type="button" className={styles.action} onClick={() => poll}>
          clique aqui
        </button>
        .
      </span>
    </div>
  );
}
