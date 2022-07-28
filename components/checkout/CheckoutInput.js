import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './CheckoutInput.module.css';

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

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
}) {
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
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
}
