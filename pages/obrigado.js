import React, { useEffect } from 'react';
import Head from 'next/head';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import ThanksBox from 'components/layout/ThanksBox';

export async function getServerSideProps(context) {
  const { query } = context;
  if (!query.orderNumber || !query.name || !query.total || !query.paymentCode) {
    return { redirect: { destination: '/' } };
  }

  return {
    props: { ...query },
  };
}

export default function ThanksPage({ orderNumber, name, total, paymentCode }) {
  const { setBasket } = useBasket();
  const { setPersonalData } = usePersonalData();

  useEffect(() => {
    // Empty basket
    setBasket({});

    // Empty personal data
    setPersonalData({
      name: '',
      email: '',
      cpf: '',
    });
  }, []);

  return (
    <>
      <Head>
        <title>Doação Efetuada - Caminho de Casa</title>
        <meta property="og:title" content="Doação Efetuada - Caminho de Casa" />
      </Head>
      <ThanksBox
        orderNumber={orderNumber}
        name={name}
        total={total}
        paymentCode={paymentCode}
      />
    </>
  );
}
