import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './cardCheckout.module.css';
import CardPayment from './cardPayment';
import CardDisclaimer from './cardDisclaimer';
import CardAddress from './cardAddress';
import BlockButton from 'components/layout/blockButton';
import ErrorBanner from 'components/checkout/errorBanner';
import BackButton from 'components/checkout/backButton';
import { tokenizeCard, anyBlank } from 'utils/paymentUtils';
import { AddressData, CardData, CheckoutError } from 'types/checkout';

function getErrorNumberFromCode(e: AxiosError): CheckoutError {
  if (!e.response || e.response.status === 400) {
    return 'server_validation';
  }
  if (e.response.status === 422) {
    return 'server_card';
  }
  if (e.response.status === 403) {
    return 'server_antifraud';
  }
  return 'unknown';
}

export default function CardCheckout({
  personalData,
  total,
  description,
  onSuccessfulCheckout,
}) {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    cardname: '',
    cvc: '',
    expiry: '',
  });

  const [addressData, setAddressData] = useState<AddressData>({
    cep: '',
    street: '',
    streetNumber: '',
    complement: '',
    city: '',
    state: '',
  });

  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<CheckoutError>(null);

  const handleFormSubmit = async () => {
    setError(null);

    // Check inputs
    if (anyBlank(cardData) || anyBlank(addressData, ['complement'])) {
      setError('blank');
      return;
    }

    // Send charge request
    try {
      setProcessing(true);
      const cardHash = await tokenizeCard(cardData);
      const response = await axios.post('/api/card-create', {
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
          {error !== null && <ErrorBanner error={error} />}
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
