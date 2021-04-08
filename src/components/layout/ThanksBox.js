import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import * as styles from "./ThanksBox.module.css";
import thanks from "url:../../assets/thanks.png";

export default function ThanksBox({ orderNumber, name, total, paymentCode }) {
  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <header className={styles.header}>
          <img src={thanks} alt="" />
        </header>
        <main className={styles.content}>
          <h2>Obrigado!</h2>
          <p className={styles.orderDetails}>
            Sua doação foi realizada com sucesso. Graças a ela, poderemos
            continuar levando esperança a quem mais precisa.
          </p>
          <div className={styles.info}>
            <p>
              <span className={styles.bold}>Código: </span>#{orderNumber}
            </p>
            <p>
              <span className={styles.bold}>Nome: </span>
              {name}
            </p>
            <p>
              <span className={styles.bold}>Valor: </span>R${total},00
            </p>
            <p>
              <span className={styles.bold}>Forma de Pagamento: </span>
              {paymentCode == "card" ? "Cartão  de Crédito" : "Pix"}
            </p>
          </div>
          <p className={styles.follow}>
            Siga nossas páginas nas redes sociais para conhecer mais sobre nosso
            trabalho e acompanhar a prestação de contas:
          </p>
          <div className={styles.socialBar}>
            <a
              href="https://www.instagram.com/associacao_caminhodecasa"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className={styles.instagram}
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
                className={styles.facebook}
              />
            </a>
          </div>
        </main>
      </div>
    </main>
  );
}
