import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import styles from './CheckoutInput.module.css';

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

type Props = {
  name: string;
  type?: 'tel' | 'email';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  onBlur?: () => void;
  shouldShowError: boolean;
  wrapperClass?: string;
  disabled?: boolean;
  mask: string;
};

export default function CheckoutInputMask({
  name,
  type,
  placeholder,
  value,
  mask,
  onChange,
  onBlur,
  disabled,
  shouldShowError,
  wrapperClass,
}: Props) {
  return (
    <div className={cx(styles.inputWrap, wrapperClass)}>
      {shouldShowError && isBlank(value) && (
        <FontAwesomeIcon className={styles.icon} icon={faExclamationTriangle} />
      )}
      <InputMask
        name={name}
        className={cx(styles.input, {
          [styles.blankInput]: shouldShowError && isBlank(value),
        })}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        mask={mask}
        maskPlaceholder={null}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
}

CheckoutInputMask.defaultProps = {
  type: 'text',
  disabled: false,
  onBlur: () => {},
  wrapperClass: null,
};
