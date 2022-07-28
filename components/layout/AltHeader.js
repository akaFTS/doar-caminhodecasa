import React from 'react';
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo.png';
import styles from './AltHeader.module.css';
import { useBasket } from 'contexts/BasketContext';

export default function AltHeader() {
  const { basket } = useBasket();

  return (
    <header className={styles.header}>
      <div className={styles.headerInside}>
        <div className={styles.bar}>
          <div className={styles.leftBar}>
            <Link href="/">
              <a className={styles.logoWrap}>
                <div className={styles.logoWrapInner}>
                  <Image
                    layout="fill"
                    src={logo}
                    alt="Logotipo da Associação"
                  />
                </div>
              </a>
            </Link>
            <div className={styles.call}>
              <h2>
                Eles <span className={styles.highlight}>precisam </span>
                da sua ajuda
              </h2>
            </div>
          </div>
          <div className={styles.buttonBar}>
            <Link href="/cesta">
              <a className={styles.barItem}>
                {Object.keys(basket).length > 0 ? (
                  <span className={styles.badge}>
                    {Object.keys(basket).length}
                  </span>
                ) : null}{' '}
                Minha Cesta
              </a>
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
        </div>
        <div className={`${styles.call} ${styles.out}`}>
          <h2>
            Eles <span className={styles.highlight}>precisam </span>
            da sua ajuda
          </h2>
        </div>
      </div>
    </header>
  );
}
