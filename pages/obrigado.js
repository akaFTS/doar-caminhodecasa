import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AltHeader from 'components/layout/AltHeader';
import ThanksBox from 'components/layout/ThanksBox';
import Footer from 'components/layout/Footer';

export default function ThanksPage() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (
      !query.orderNumber ||
      !query.name ||
      !query.total ||
      !query.paymentCode
    ) {
      router.push('/');
    }
  }, [query, router]);

  return (
    <>
      <Head>
        <title>Doação Efetuada - Caminho de Casa</title>
        <meta property="og:title" content="Doação Efetuada - Caminho de Casa" />
      </Head>
      <AltHeader />
      <ThanksBox
        orderNumber={query.orderNumber}
        name={query.name}
        total={query.total}
        paymentCode={query.paymentCode}
      />
      <Footer />
    </>
  );
}
