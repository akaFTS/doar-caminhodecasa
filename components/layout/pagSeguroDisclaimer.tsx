import React from 'react';
import styles from './pagSeguroDisclaimer.module.css';
import pagseguro from 'public/pagseguro.png';
import Image from 'next/image';

export default function PagSeguroDisclaimer() {
  return (
    <div className={styles.info}>
      <span className={styles.text}>powered by</span>
      <div className={styles.logoWrap}>
        <Image
          layout="responsive"
          src={pagseguro}
          alt="Logotipo do PagSeguro"
          sizes="6rem"
          placeholder="blur"
        />
      </div>
    </div>
  );
}
