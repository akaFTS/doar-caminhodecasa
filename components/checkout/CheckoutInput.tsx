import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './CheckoutInput.module.css';

function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}

type Props = {
  name: string;
  type?: 'tel' | 'email';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  shouldShowError?: boolean;
  wrapperClass?: string;
  optional?: true;
};

export default function CheckoutInput({
  name,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  shouldShowError,
  wrapperClass,
  optional,
}: Props) {
  return (
    <div className={cx(styles.inputWrap, wrapperClass)}>
      {!optional && shouldShowError && isBlank(value) && (
        <FontAwesomeIcon className={styles.icon} icon={faExclamationTriangle} />
      )}
      <input
        name={name}
        className={cx(styles.input, {
          [styles.blankInput]: !optional && shouldShowError && isBlank(value),
        })}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
}

CheckoutInput.defaultProps = {
  type: 'text',
  optional: false,
  onFocus: () => {},
  shouldShowError: false,
  wrapperClass: null,
};
