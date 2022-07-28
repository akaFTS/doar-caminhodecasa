import React from 'react';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from './ThanksBox.module.css';
import thanks from 'public/new-thanks.jpg';

export default function ThanksBox({ orderNumber, name, total, paymentCode }) {
  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <header className={styles.header}>
          <Image src={thanks} alt="" />
        </header>
        <main className={styles.content}>
          <h2>Obrigado!</h2>
          <p className={styles.orderSubtitle}>
            Sua doação foi realizada com sucesso.
          </p>
          <p className={styles.orderThanks}>
            Graças a ela, continuaremos levando esperança a quem mais precisa.
          </p>
          <div className={styles.info}>
            <p>
              <span className={styles.bold}>Código: </span>#{orderNumber}
            </p>
            <p data-hj-suppress>
              <span className={styles.bold}>Nome: </span>
              {name}
            </p>
            <p>
              <span className={styles.bold}>Valor: </span>R${total},00
            </p>
            <p>
              <span className={styles.bold}>Forma de Pagamento: </span>
              {paymentCode === 'card' ? 'Cartão  de Crédito' : 'Pix'}
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
