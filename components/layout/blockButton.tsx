import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './blockButton.module.css';

type Props = {
  text: string;
  isProcessing?: boolean;
  onClick: () => void;
  renderIcon?: (iconStyles: string) => React.ReactNode;
};

export default function BlockButton({
  text,
  isProcessing,
  onClick,
  renderIcon,
}: Props) {
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
          {renderIcon(styles.icon)}
          {text}
        </span>
      )}
    </button>
  );
}

BlockButton.defaultProps = {
  isProcessing: false,
  renderIcon: () => {},
};
