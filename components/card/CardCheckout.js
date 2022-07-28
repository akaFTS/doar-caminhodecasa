import React, { useState } from 'react';
import axios from 'axios';
import styles from './CardCheckout.module.css';
import CardPayment from './CardPayment';
import CardDisclaimer from './CardDisclaimer';
import CardAddress from './CardAddress';
import BlockButton from 'components/layout/BlockButton';
import ErrorBanner from 'components/checkout/ErrorBanner';
import BackButton from 'components/checkout/BackButton';
import { tokenizeCard, anyBlank } from 'utils/paymentUtils';

function getErrorNumberFromCode(e) {
  if (!e.response || e.response.status === 400) {
    return 'server_validation';
  }
  if (e.response.status === 422) {
    return 'server_card';
  }
  if (e.response.status === 403) {
    return 'server_antifraud';
  }
  return 'server_internal';
}

export default function CardCheckout({
  personalData,
  total,
  description,
  onSuccessfulCheckout,
}) {
  const [cardData, setCardData] = useState({
    number: '',
    cardname: '',
    cvc: '',
    expiry: '',
  });

  const [addressData, setAddressData] = useState({
    cep: '',
    street: '',
    streetNumber: '',
    complement: '',
    city: '',
    state: '',
  });

  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async () => {
    setError('');

    // Check inputs
    if (anyBlank(cardData) || anyBlank(addressData, ['complement'])) {
      setError('blank');
      return;
    }

    // Send charge request
    try {
      setProcessing(true);
      const cardHash = await tokenizeCard(cardData);
      const response = await axios.post('/.netlify/functions/card-create', {
        name: personalData.name,
        cpf: personalData.cpf,
        email: personalData.email,
        cardHash,
        total,
        description,
        street: addressData.street,
        streetNumber: addressData.streetNumber,
        complement: addressData.complement,
        city: addressData.city,
        state: addressData.state,
        cep: addressData.cep,
      });
      onSuccessfulCheckout(response.data.orderNumber, 'card');
    } catch (e) {
      setError(getErrorNumberFromCode(e));
      setProcessing(false);
    }
  };

  return (
    <main className={styles.main}>
      <BackButton text="Voltar para Meus Dados" path="/dados_pessoais" />
      <h1 className={styles.title}>Dados de Pagamento</h1>
      <div className={styles.underline} />
      <form>
        <CardPayment
          data={cardData}
          setData={setCardData}
          shouldFlagBlankFields={error === 'blank'}
        />
        <CardAddress
          data={addressData}
          setData={setAddressData}
          shouldFlagBlankFields={error === 'blank'}
        />
        <CardDisclaimer />
        <div>
          {error !== '' && <ErrorBanner error={error} />}
          <BlockButton
            isProcessing={isProcessing}
            text={`Finalizar Doação - R$${total},00`}
            onClick={handleFormSubmit}
          />
        </div>
      </form>
    </main>
  );
}
