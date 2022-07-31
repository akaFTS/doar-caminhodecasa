import React from 'react';
import Head from 'next/head';
import ThanksBox from 'components/layout/ThanksBox';

export async function getServerSideProps(context) {
  const { query } = context;

  console.log(query);

  if (!query.orderNumber || !query.name || !query.total || !query.paymentCode) {
    return { redirect: { destination: '/' } };
  }

  const { orderNumber, name, total, paymentCode } = query;

  return {
    props: { orderNumber, name, total, paymentCode },
  };
}

export default function ThanksPage({ orderNumber, name, total, paymentCode }) {
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
