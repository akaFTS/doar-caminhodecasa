import React from 'react';
import cx from 'classnames';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PixButton.module.css';

export default function PixButton({ isProcessing, onButtonPressed }) {
  return (
    <button
      type="button"
      className={cx(styles.button, { [styles.processing]: isProcessing })}
      onClick={onButtonPressed}
    >
      {isProcessing ? (
        <FontAwesomeIcon size="2x" icon={faSpinner} spin />
      ) : (
        <span>Toque para gerar</span>
      )}
    </button>
  );
}
