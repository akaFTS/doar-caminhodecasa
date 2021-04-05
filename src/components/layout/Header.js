import React, { useContext } from "react";
import logo from "url:../../assets/logo.png";
import * as styles from "./Header.module.css";
import {
  faInstagram,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";
import BasketContext from "../../BasketContext";

export default function Header() {
  const { basket } = useContext(BasketContext);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoWrap}>
        <img src={logo} className={styles.logo} />
      </Link>
      <div className={styles.buttonBar}>
        <Link to="/cesta" className={styles.barItem}>
          {Object.keys(basket).length > 0 ? (
            <span className={styles.badge}>{Object.keys(basket).length}</span>
          ) : null}{" "}
          Minha Cesta
        </Link>
        <div className={styles.separator} />
        <a
          href="https://www.instagram.com/associacao_caminhodecasa"
          target="_blank"
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
