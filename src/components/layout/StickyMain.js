import React from "react";
import * as styles from "./StickyMain.module.css";

export default function StickyMain({ children }) {
  return <main className={styles.main}>{children}</main>;
}
