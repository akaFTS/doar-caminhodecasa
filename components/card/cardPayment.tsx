import React, { useState } from 'react';
import Card from 'react-credit-cards';
import styles from './cardPayment.module.css';
import 'react-credit-cards/es/styles-compiled.css';
import CheckoutInput from 'components/checkout/checkoutInput';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from 'utils/paymentUtils';
import { CardData } from 'types/checkout';

type Props = {
  shouldFlagBlankFields: boolean;
  data: CardData;
  setData: (data: CardData) => void;
};

export default function Payments({
  data,
  setData,
  shouldFlagBlankFields,
}: Props) {
  const [focused, setFocused] = useState('');

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(e.target.name);
  };

  return (
    <div>
      <div className={styles.cardWrap}>
        <div data-hj-suppress>
          <Card
            number={data.number}
            name={data.holderName}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({
                ...data,
                number: formatCreditCardNumber(e.target.value),
              })
            }
            onFocus={handleInputFocus}
            wrapperClass={styles.input}
          />
          <CheckoutInput
            name="holderName"
            placeholder="Nome (como consta no cartão)"
            shouldShowError={shouldFlagBlankFields}
            value={data.holderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, holderName: e.target.value })
            }
            onFocus={handleInputFocus}
            wrapperClass={styles.input}
          />
          <CheckoutInput
            type="tel"
            name="expiry"
            placeholder="Validade"
            shouldShowError={shouldFlagBlankFields}
            value={data.expiry}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            value={data.cvc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
