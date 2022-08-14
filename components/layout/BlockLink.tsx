import React from 'react';
import Link from 'next/link';
import styles from './BlockLink.module.css';

type Props = {
  to: string;
  text: string;
  secondary?: boolean;
};

export default function BlockLink({ to, text, secondary }: Props) {
  return (
    <Link href={to}>
      <a className={`${styles.button} ${secondary ? styles.secondary : ''}`}>
        <span>{text}</span>
      </a>
    </Link>
  );
}

BlockLink.defaultProps = {
  secondary: false,
};
