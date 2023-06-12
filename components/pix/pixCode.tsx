import React from 'react';
import styles from './pixCode.module.css';

type Props = {
  codeUrl: string;
};

export default function PixCode({ codeUrl }: Props) {
  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={codeUrl} alt="QRCode do Pix" />
    </div>
  );
}
