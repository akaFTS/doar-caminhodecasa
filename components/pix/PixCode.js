import React from 'react';
import styles from './PixCode.module.css';

export default function PixCode({ code }) {
  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/jpeg;base64,${code}`} alt="QRCode do Pix" />
    </div>
  );
}
