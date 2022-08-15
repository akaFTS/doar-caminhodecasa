import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/basketContext';
import { usePersonalData } from 'contexts/personalDataContext';
import ThanksBox from 'components/layout/thanksBox';
import Loading from 'components/layout/loading';

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
  const paymentCode =
    query.paymentCode === 'card' || query.paymentCode === 'pix'
      ? query.paymentCode
      : 'pix';

  return (
    <>
      <Head>
        <title>Doação Efetuada - Caminho de Casa</title>
        <meta property="og:title" content="Doação Efetuada - Caminho de Casa" />
      </Head>
      <ThanksBox
        orderNumber={query.orderNumber as string}
        name={query.name as string}
        total={parseInt(query.total as string, 10)}
        paymentCode={paymentCode}
      />
    </>
  );
}
