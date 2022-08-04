import React, { useState } from 'react';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import styles from './PersonalData.module.css';
import ErrorBanner from './ErrorBanner';
import BlockButton from '../layout/BlockButton';
import BackButton from './BackButton';
import CheckoutInput from './CheckoutInput';
import CheckoutInputMask from './CheckoutInputMask';
import PixIcon from 'components/pix/PixIcon';
import { anyBlank, checkCPF } from 'utils/paymentUtils';

export default function PersonalData({ data, setData, onProceedToPayment }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const proceedToPayment = (type) => {
    setError('');

    if (anyBlank(data)) {
      setError('blank');
      return;
    }

    if (!checkCPF(data.cpf)) {
      setError('cpf');
      return;
    }

    if (!isEmail(data.email)) {
      setError('email');
      return;
    }

    if (!isAlphanumeric(data.name.replaceAll(' ', ''), 'pt-BR')) {
      setError('name');
      return;
    }

    onProceedToPayment(type);
  };

  return (
    <main className={styles.main}>
      <BackButton text="Voltar para Minha Cesta" path="/cesta" />
      <form>
        <h1 className={styles.title}>Meus Dados</h1>
        <div className={styles.underline} />
        <div className={styles.formWrap}>
          <CheckoutInput
            name="name"
            placeholder="Nome"
            value={data.name}
            onChange={handleChange}
            shouldShowError={error === 'blank'}
            wrapperClass={styles.input}
          />
          <CheckoutInputMask
            name="cpf"
            type="tel"
            placeholder="CPF"
            value={data.cpf}
            onChange={handleChange}
            shouldShowError={error === 'blank'}
            mask="999.999.999-99"
            wrapperClass={styles.input}
          />
          <CheckoutInput
            name="email"
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
            shouldShowError={error === 'blank'}
            wrapperClass={styles.input}
          />
        </div>
        {error !== '' && <ErrorBanner error={error} />}
        <div className={styles.buttons}>
          <BlockButton
            icon={faCreditCard}
            text="Pagar com Cartão"
            onClick={() => proceedToPayment('cartao')}
          />
          <BlockButton
            IconElement={PixIcon}
            text="Pagar com Pix"
            onClick={() => proceedToPayment('pix')}
          />
        </div>
      </form>
    </main>
  );
}
