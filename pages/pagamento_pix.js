import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useBasket } from 'contexts/BasketContext';
import { usePersonalData } from 'contexts/PersonalDataContext';
import PixCheckout from 'components/pix/PixCheckout';
import { anyBlank } from 'utils/paymentUtils';

export default function CardPaymentPage() {
  const router = useRouter();
  const { basket, setBasket } = useBasket();
  const { personalData, setPersonalData } = usePersonalData();

  useEffect(() => {
    if (!router.isReady) return;

    if (Object.keys(basket).length === 0 || anyBlank(personalData)) {
      router.push('/cesta');
    }
  }, [router.isReady]);

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
    // Empty basket
    setBasket({});

    // Empty personal data
    setPersonalData({
      name: '',
      email: '',
      cpf: '',
    });

    // Navigate to Thanks page
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
      <PixCheckout
        personalData={personalData}
        total={total}
        description={description}
        onSuccessfulCheckout={handleSuccessfulCheckout}
      />
    </>
  );
}
