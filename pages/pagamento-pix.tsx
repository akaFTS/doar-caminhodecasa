import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/basketContext';
import { usePersonalData } from 'contexts/personalDataContext';
import PixCheckout from 'components/pix/pixCheckout';
import Loading from 'components/layout/loading';
import Redirect from 'components/layout/redirect';
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

  const handleSuccessfulCheckout = (total: number, orderNumber: string) => {
    router.push({
      pathname: '/obrigado',
      query: {
        name: personalData.name,
        orderNumber,
        total,
        paymentCode: 'pix',
      },
    });
  };

  return (
    <>
      <Head>
        <title>Pagamento - Caminho de Casa</title>
        <meta property="og:title" content="Pagamento - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      <PixCheckout
        personalData={personalData}
        basket={basket}
        onSuccessfulCheckout={handleSuccessfulCheckout}
      />
    </>
  );
}
