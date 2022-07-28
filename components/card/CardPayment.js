import React, { useState } from 'react';
import Card from 'react-credit-cards';
import styles from './CardPayment.module.css';
import 'react-credit-cards/es/styles-compiled.css';
import CheckoutInput from 'components/checkout/CheckoutInput';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from 'utils/paymentUtils';

export default function Payments({ data, setData, shouldFlagBlankFields }) {
  const [focused, setFocused] = useState('');

  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  return (
    <div>
      <div className={styles.cardWrap}>
        <div data-hj-suppress>
          <Card
            number={data.number}
            name={data.cardname}
            expiry={data.expiry}
            cvc={data.cvc}
            focused={focused}
            locale={{ valid: 'Validade' }}
            placeholders={{ name: '' }}
          />
        </div>
        <div className={styles.formWrap}>
          <CheckoutInput
            type="tel"
            name="number"
            placeholder="Número do cartão"
            shouldShowError={shouldFlagBlankFields}
            value={data.number}
            onChange={(e) =>
              setData({
                ...data,
                number: formatCreditCardNumber(e.target.value),
              })
            }
            onFocus={handleInputFocus}
            wrapperClass={styles.input}
          />
          <CheckoutInput
            type="text"
            name="cardname"
            placeholder="Nome (como consta no cartão)"
            shouldShowError={shouldFlagBlankFields}
            value={data.cardname}
            onChange={(e) => setData({ ...data, cardname: e.target.value })}
            onFocus={handleInputFocus}
            wrapperClass={styles.input}
          />
          <CheckoutInput
            type="tel"
            name="expiry"
            placeholder="Validade"
            shouldShowError={shouldFlagBlankFields}
            halfInput
            value={data.expiry}
            onChange={(e) =>
              setData({ ...data, expiry: formatExpirationDate(e.target.value) })
            }
            onFocus={handleInputFocus}
            wrapperClass={styles.halfInput}
          />
          <CheckoutInput
            type="tel"
            name="cvc"
            placeholder="CVC"
            shouldShowError={shouldFlagBlankFields}
            halfInput
            value={data.cvc}
            onChange={(e) =>
              setData({ ...data, cvc: formatCVC(e.target.value) })
            }
            onFocus={handleInputFocus}
            wrapperClass={styles.halfInput}
          />
        </div>
      </div>
    </div>
  );
}
