import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import PersonalData from 'components/checkout/PersonalData';
import Loading from 'components/layout/Loading';
import Redirect from 'components/layout/Redirect';

export default function PersonalDataPage() {
  const router = useRouter();
  const { basket, basketReady } = useBasket();
  const { personalData, setPersonalData } = usePersonalData();

  if (!basketReady) {
    return <Loading />;
  }

  if (Object.keys(basket).length === 0) {
    return <Redirect to="/cesta" />;
  }

  const handleProceedToPayment = (type) => {
    router.push(`/pagamento_${type}`);
  };

  router.prefetch('/pagamento_pix');
  router.prefetch('/pagamento_cartao');

  return (
    <>
      <Head>
        <title>Dados Pessoais - Caminho de Casa</title>
        <meta property="og:title" content="Dados Pessoais - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      <PersonalData
        data={personalData}
        setData={setPersonalData}
        onProceedToPayment={handleProceedToPayment}
      />
    </>
  );
}
