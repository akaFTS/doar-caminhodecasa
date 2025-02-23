import React from 'react';
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo.png';
import styles from './header.module.css';
import { useBasket } from 'contexts/basketContext';

export default function Header() {
  const { basket } = useBasket();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoWrap}>
        <Image
          layout="responsive"
          src={logo}
          alt="Logotipo da Associação"
          sizes="6rem"
          placeholder="blur"
        />
      </Link>
      <div className={styles.buttonBar}>
        <Link href="/cesta" className={styles.barItem}>
          {Object.keys(basket).length > 0 ? (
            <span className={styles.badge}>{Object.keys(basket).length}</span>
          ) : null}{' '}
          Minha Cesta
        </Link>
        <div className={styles.separator} />
        <a
          href="https://www.instagram.com/associacao_caminhodecasa"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className={`${styles.socialIcon} ${styles.instagram}`}
          />
        </a>
        <div className={styles.separator} />
        <a
          href="https://www.facebook.com/associacaocaminhodecasa/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebookSquare}
            className={`${styles.socialIcon} ${styles.facebook}`}
          />
        </a>
      </div>
    </header>
  );
}
