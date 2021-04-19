import React from "react";
import * as styles from "./Footer.module.css";
import logo from "url:../../assets/logo.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.information}>
        <div className={styles.flexBlock}>
          <img
            src={logo}
            className={styles.logo}
            alt="Logotipo da Associação"
          />
          <div className={styles.text}>
            <p className={styles.main}>ASSOCIAÇÃO CAMINHO DE CASA</p>
            <p>CNPJ 21.227.397/0001-29</p>
            <p>R. Pe. Benedito de Camargo, 356, São Paulo/SP</p>
            <p>atendimento@caminhodecasa.org.br</p>
          </div>
        </div>
        <div className={styles.bankData}>
          <p className={styles.main}>
            Para doar outros valores, utilize nossos dados bancários:
          </p>
          <p>CNPJ: 21.227.397/0001-29</p>
          <p>Bradesco - Ag. 0545-2</p>
          <p>C/C 18.353-9</p>
        </div>
      </div>
    </footer>
  );
}
