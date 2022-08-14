import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import PersonalDataForm from 'components/checkout/PersonalDataForm';
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

  const handleProceedToPayment = (type: 'pix' | 'cartao') => {
    router.push(`/pagamento-${type}`);
  };

  router.prefetch('/pagamento-pix');
  router.prefetch('/pagamento-cartao');

  return (
    <>
      <Head>
        <title>Dados Pessoais - Caminho de Casa</title>
        <meta property="og:title" content="Dados Pessoais - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      <PersonalDataForm
        data={personalData}
        setData={setPersonalData}
        onProceedToPayment={handleProceedToPayment}
      />
    </>
  );
}
