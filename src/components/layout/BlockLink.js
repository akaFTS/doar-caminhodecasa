import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import * as styles from "./BlockLink.module.css";

export default function BlockButton({ to, text, secondary }) {
  return (
    <Link
      to={to}
      className={`${styles.button} ${secondary ? styles.secondary : ""}`}
    >
      <span>{text}</span>
    </Link>
  );
}
