import React from "react";
import * as styles from "./PixCode.module.css";

export default function PixCode({ code }) {
  return (
    <div className={styles.wrapper}>
      <img src={`data:image/jpeg;base64,${code}`} />
    </div>
  );
}
