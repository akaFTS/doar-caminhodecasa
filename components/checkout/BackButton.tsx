import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './BackButton.module.css';

type Props = {
  text: string;
  path: string;
};

export default function BackButton({ text, path }: Props) {
  return (
    <Link href={path}>
      <a className={styles.button}>
        <FontAwesomeIcon className={styles.chevron} icon={faChevronLeft} />
        <span>{text}</span>
      </a>
    </Link>
  );
}
