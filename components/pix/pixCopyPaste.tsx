import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './pixCopyPaste.module.css';

type Props = {
  copyPasteCode: string;
};

export default function PixCopyPaste({ copyPasteCode }: Props) {
  const [showCode, setShowCode] = useState(false);

  return showCode ? (
    <div className={styles.codeBox}>
      <span>Cole este código no app do seu banco:</span>
      <textarea readOnly>{copyPasteCode}</textarea>
    </div>
  ) : (
    <button
      type="button"
      className={styles.copyButton}
      onClick={() => setShowCode(true)}
    >
      <FontAwesomeIcon icon={faCopy} />
      <span>Copia-e-Cola</span>
    </button>
  );
}
