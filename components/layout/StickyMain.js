import React from 'react';
import styles from './StickyMain.module.css';

export default function StickyMain({ children }) {
  return <main className={styles.main}>{children}</main>;
}
