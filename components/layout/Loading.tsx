import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Loading.module.css';

export default function Loading() {
  return <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />;
}
