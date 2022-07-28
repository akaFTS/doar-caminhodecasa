import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './BlockButton.module.css';

export default function BlockButton({
  text,
  isProcessing,
  onClick,
  icon,
  IconElement,
}) {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={isProcessing}
      onClick={onClick}
    >
      {isProcessing ? (
        <span>
          <FontAwesomeIcon icon={faSpinner} spin className={styles.icon} />
          Processando...
        </span>
      ) : (
        <span className={styles.buttonInner}>
          {IconElement && <IconElement className={styles.iconSvg} />}
          {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
          {text}
        </span>
      )}
    </button>
  );
}
