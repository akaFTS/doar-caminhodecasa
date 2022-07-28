import React, { useState } from 'react';
import styles from './CardAddress.module.css';
import CepFetcher from './CepFetcher';
import CheckoutInput from 'components/checkout/CheckoutInput';

export default function CardAddress({ data, setData, shouldFlagBlankFields }) {
  const [fieldsShown, setFieldsShown] = useState(false);

  const handleCepFetched = ({ cep, street, city, state }) => {
    setFieldsShown(true);
    setData({ ...data, cep, street, city, state });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h4>Endereço de Cobrança</h4>
      <div className={styles.form}>
        <div className={styles.cepWrap}>
          <CepFetcher
            onCepFetched={handleCepFetched}
            shouldFlagIfBlank={shouldFlagBlankFields}
          />
        </div>
        {fieldsShown && (
          <>
            <CheckoutInput
              name="street"
              shouldShowError={shouldFlagBlankFields}
              wrapperClass={styles.street}
              placeholder="Rua"
              value={data.street}
              onChange={handleChange}
            />
            <CheckoutInput
              name="streetNumber"
              shouldShowError={shouldFlagBlankFields}
              wrapperClass={styles.input}
              placeholder="Número"
              value={data.streetNumber}
              onChange={handleChange}
            />
            <CheckoutInput
              name="complement"
              optional
              wrapperClass={styles.input}
              placeholder="Complemento"
              value={data.complement}
              onChange={handleChange}
            />
            <CheckoutInput
              name="city"
              shouldShowError={shouldFlagBlankFields}
              wrapperClass={styles.input}
              placeholder="Cidade"
              value={data.city}
              onChange={handleChange}
            />
            <CheckoutInput
              name="state"
              shouldShowError={shouldFlagBlankFields}
              wrapperClass={styles.input}
              placeholder="Estado"
              value={data.state}
              onChange={handleChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
