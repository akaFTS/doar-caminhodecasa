import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import cx from "classnames";
import * as styles from "./PixInstructions.module.css";

export default function PixInstructions({ copypaste }) {
  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        <div className={cx(styles.iconWrap, "fa-2x")}>
          <div className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faCircle} />
            <span className={cx("fa-layers-text fa-inverse", styles.iconText)}>
              1
            </span>
          </div>
        </div>
        <span>
          Abra o app do seu banco e vá em{" "}
          <span className={styles.highlight}>&quot;Pix&quot;</span> &gt;{" "}
          <span className={styles.highlight}>&quot;Pagar com QRCode&quot;</span>
          .
        </span>
      </div>
      <div className={styles.instruction}>
        <div className={cx(styles.iconWrap, "fa-2x")}>
          <div className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faCircle} />
            <span className={cx("fa-layers-text fa-inverse", styles.iconText)}>
              2
            </span>
          </div>
        </div>
        <span>
          Aponte a câmera do seu celular para o código ao lado e siga as
          instruções.
        </span>
      </div>
      <div className={styles.instruction}>
        <div className={cx(styles.iconWrap, "fa-2x")}>
          <div className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faCircle} />
            <span className={cx("fa-layers-text fa-inverse", styles.iconText)}>
              3
            </span>
          </div>
        </div>
        <span>
          Se não for possível ler o código, cole o seguinte texto no campo{" "}
          <span className={styles.highlight}>Pix Copia-e-Cola</span>:
        </span>
      </div>
      <div>
        <div className={styles.copyPaste}>{copypaste}</div>
      </div>
    </div>
  );
}
