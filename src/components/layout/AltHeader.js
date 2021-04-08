import React, { useContext } from "react";
import logo from "url:../../assets/logo.png";
import * as styles from "./AltHeader.module.css";
import {
  faInstagram,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";
import BasketContext from "../../BasketContext";

export default function AltHeader() {
  const { basket } = useContext(BasketContext);

  return (
    <header className={styles.header}>
      <div className={styles.headerInside}>
        <div className={styles.bar}>
          <div className={styles.leftBar}>
            <Link to="/" className={styles.logoWrap}>
              <img
                src={logo}
                className={styles.logo}
                alt="Logotipo da Associação"
              />
            </Link>
            <div className={styles.call}>
              <h2>
                Eles <span className={styles.highlight}>precisam </span>
                da sua ajuda
              </h2>
            </div>
          </div>
          <div className={styles.buttonBar}>
            <Link to="/cesta" className={styles.barItem}>
              {Object.keys(basket).length > 0 ? (
                <span className={styles.badge}>
                  {Object.keys(basket).length}
                </span>
              ) : null}{" "}
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
