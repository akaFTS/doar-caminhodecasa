import React from "react";
import logo from "url:../assets/logo.png";
import * as styles from "./Header.module.css";
import {
  faInstagram,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Header({ inverted }) {
  return (
    <header className={`${styles.header} ${inverted ? styles.inverted : ""}`}>
      <a href="https://www.caminhodecasa.org.br" className={styles.logoWrap}>
        <img src={logo} className={styles.logo} />
      </a>
      <div className={styles.buttonBar}>
        <Link to="/" className={styles.barItem}>
          Campanhas
        </Link>
        <div className={styles.separator} />
        <a href="https://www.instagram.com/associacao_caminhodecasa">
          <FontAwesomeIcon
            icon={faInstagram}
            className={`${styles.socialIcon} ${styles.instagram}`}
          />
        </a>
        <div className={styles.separator} />
        <a href="https://www.facebook.com/associacaocaminhodecasa/">
          <FontAwesomeIcon
            icon={faFacebookSquare}
            className={`${styles.socialIcon} ${styles.facebook}`}
          />
        </a>
      </div>
    </header>
  );
}
