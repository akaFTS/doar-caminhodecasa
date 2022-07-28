import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from 'components/layout/Footer';
import AltHeader from 'components/layout/AltHeader';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import PersonalData from 'components/checkout/PersonalData';

export default function PersonalDataPage() {
  const router = useRouter();
  const { basket } = useBasket();
  const { personalData, setPersonalData } = usePersonalData();

  if (Object.keys(basket).length === 0) {
    return router.push('/cesta');
  }

  const handleProceedToPayment = (type) => {
    router.push(`/pagamento_${type}`);
  };

  return (
    <>
      <Head>
        <title>Dados Pessoais - Caminho de Casa</title>
        <meta property="og:title" content="Dados Pessoais - Caminho de Casa" />
        <meta property="og:site_name" content="Caminho de Casa" />
      </Head>
      <AltHeader />
      <main>
        <PersonalData
          data={personalData}
          setData={setPersonalData}
          onProceedToPayment={handleProceedToPayment}
        />
      </main>
      <Footer />
    </>
  );
}
