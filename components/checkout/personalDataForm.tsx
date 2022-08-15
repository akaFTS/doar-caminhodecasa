import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import styles from './personalDataForm.module.css';
import ErrorBanner from './errorBanner';
import BlockButton from '../layout/blockButton';
import BackButton from './backButton';
import CheckoutInput from './checkoutInput';
import CheckoutInputMask from './checkoutInputMask';
import PixIcon from 'components/pix/pixIcon';
import { anyBlank, checkCPF } from 'utils/paymentUtils';
import { CheckoutError, PersonalData } from 'types/checkout';

type Props = {
  data: PersonalData;
  setData: (data: PersonalData) => void;
  onProceedToPayment: (type: 'pix' | 'cartao') => void;
};

export default function PersonalDataForm({
  data,
  setData,
  onProceedToPayment,
}: Props) {
  const [error, setError] = useState<CheckoutError>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const proceedToPayment = (type: 'pix' | 'cartao') => {
    setError(null);

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
        {error !== null && <ErrorBanner error={error} />}
        <div className={styles.buttons}>
          <BlockButton
            renderIcon={(iconStyles) => (
              <FontAwesomeIcon icon={faCreditCard} className={iconStyles} />
            )}
            text="Pagar com Cartão"
            onClick={() => proceedToPayment('cartao')}
          />
          <BlockButton
            renderIcon={(iconStyles) => <PixIcon className={iconStyles} />}
            text="Pagar com Pix"
            onClick={() => proceedToPayment('pix')}
          />
        </div>
      </form>
    </main>
  );
}
