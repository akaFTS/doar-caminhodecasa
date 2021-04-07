import React from "react";
import QRCode from "qrcode.react";
import * as styles from "./PixCode.module.css";

export default function PixCode({ code }) {
  return (
    <div className={styles.wrapper}>
      <QRCode value={code} renderAs="svg" level="M" />
    </div>
  );
}
