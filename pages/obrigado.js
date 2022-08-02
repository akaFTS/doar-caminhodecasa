import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import ThanksBox from 'components/layout/ThanksBox';
import Loading from 'components/layout/Loading';

export default function ThanksPage() {
  const router = useRouter();
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

  if (!router.isReady) {
    return <Loading />;
  }

  const { query } = router;

  return (
    <>
      <Head>
        <title>Doação Efetuada - Caminho de Casa</title>
        <meta property="og:title" content="Doação Efetuada - Caminho de Casa" />
      </Head>
      <ThanksBox
        orderNumber={query.orderNumber}
        name={query.name}
        total={query.total}
        paymentCode={query.paymentCode}
      />
    </>
  );
}
