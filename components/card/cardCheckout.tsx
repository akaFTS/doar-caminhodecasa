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
import {
  AddressData,
  CardData,
  CheckoutError,
  PersonalData,
} from 'types/checkout';
import { FullBodyFields } from 'pages/api/utils/misc_utils';
import { Basket, SimpleBasketItem } from 'types/basket';
import PagSeguroDisclaimer from 'components/layout/pagSeguroDisclaimer';

function getErrorNumberFromCode(e: AxiosError): CheckoutError {
  if (!e.response || e.response.status === 400) {
    return 'server_validation';
  }
  if (e.response.status === 422) {
    return 'server_card';
  }
  return 'unknown';
}

type Props = {
  personalData: PersonalData;
  basket: Basket;
  onSuccessfulCheckout: (
    total: number,
    orderNumber: string,
    paymentCode: string,
  ) => void;
};

export default function CardCheckout({
  personalData,
  basket,
  onSuccessfulCheckout,
}: Props) {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    holderName: '',
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

  const total: number = Object.values(basket).reduce(
    (acc, current) => acc + current.amount * current.product.price,
    0,
  );

  const handleFormSubmit = async () => {
    setError(null);

    // Check inputs
    if (anyBlank(cardData) || anyBlank(addressData, ['complement'])) {
      setError('blank');
      return;
    }

    const items: SimpleBasketItem[] = Object.values(basket).map(
      (basketItem) => ({
        name: basketItem.product.name,
        amount: basketItem.amount,
        price: basketItem.product.price,
      }),
    );

    // Send charge request
    try {
      setProcessing(true);
      const cardHash = await tokenizeCard(cardData);
      const payload: FullBodyFields = {
        name: personalData.name,
        cpf: personalData.cpf,
        email: personalData.email,
        items,
        street: addressData.street,
        streetNumber: addressData.streetNumber,
        complement: addressData.complement,
        city: addressData.city,
        state: addressData.state,
        cep: addressData.cep,
        cardHash,
        holderName: cardData.holderName,
        cvc: cardData.cvc,
      };
      const response = await axios.post('/api/card-create', payload);
      onSuccessfulCheckout(total, response.data.orderNumber, 'card');
    } catch (e) {
      setError(getErrorNumberFromCode(e));
      setProcessing(false);
    }
  };

  return (
    <main className={styles.main}>
      <BackButton text="Voltar para Meus Dados" path="/dados-pessoais" />
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
        <PagSeguroDisclaimer />
      </form>
    </main>
  );
}
