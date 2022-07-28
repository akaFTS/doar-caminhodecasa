import React from 'react';
import Link from 'next/link';
import styles from './BlockLink.module.css';

export default function BlockButton({ to, text, secondary }) {
  return (
    <Link href={to}>
      <a className={`${styles.button} ${secondary ? styles.secondary : ''}`}>
        <span>{text}</span>
      </a>
    </Link>
  );
}
