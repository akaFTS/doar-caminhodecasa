import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import CardCheckout from 'components/card/CardCheckout';
import Loading from 'components/layout/Loading';
import Redirect from 'components/layout/Redirect';
import { anyBlank } from 'utils/paymentUtils';

export default function CardPaymentPage() {
  const router = useRouter();
  const { basket, basketReady } = useBasket();
  const { personalData, personalDataReady } = usePersonalData();

  if (!basketReady || !personalDataReady) {
    return <Loading />;
  }

  if (Object.keys(basket).length === 0) {
    return <Redirect to="/cesta" />;
  }

  if (anyBlank(personalData)) {
    return <Redirect to="/dados-pessoais" />;
  }

  const total = Object.values(basket).reduce(
    (acc, current) => acc + current.amount * current.product.price,
    0,
  );

  const description = Object.values(basket)
    .map(
      (obj) =>
        `${obj.product.name} x${obj.amount} : R$${
          obj.amount * obj.product.price
        },00`,
    )
    .join(' - ');

  const handleSuccessfulCheckout = (orderNumber, paymentCode) => {
    router.push({
      pathname: '/obrigado',
      query: { name: personalData.name, orderNumber, total, paymentCode },
    });
  };

  return (
    <>
      <Head>
        <title>Pagamento - Caminho de Casa</title>
        <meta property="og:title" content="Pagamento - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      <CardCheckout
        personalData={personalData}
        total={total}
        description={description}
        onSuccessfulCheckout={handleSuccessfulCheckout}
      />
    </>
  );
}