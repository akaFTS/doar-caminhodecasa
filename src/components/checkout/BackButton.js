import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { HashLink as Link } from "react-router-hash-link";
import * as styles from "./BackButton.module.css";

export default function BackButton({ text, path }) {
  return (
    <Link to={path} className={styles.button}>
      <FontAwesomeIcon className={styles.chevron} icon={faChevronLeft} />
      <span>{text}</span>
    </Link>
  );
}
