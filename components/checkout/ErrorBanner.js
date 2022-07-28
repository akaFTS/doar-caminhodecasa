import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ErrorBanner.module.css';

function getErrorMessageFromCode(code) {
  if (code === 'blank') {
    return 'Preencha todos os campos!';
  }
  if (code === 'cpf') {
    return 'O CPF é inválido!';
  }
  if (code === 'email') {
    return 'O e-mail digitado é inválido!';
  }
  if (code === 'name') {
    return 'Nome inválido! Utilize apenas letras e números.';
  }
  if (code === 'pix_blank') {
    return 'Primeiro, preencha seus dados pessoais.';
  }
  if (code === 'server_validation') {
    return 'Não foi possível completar sua doação. Verifique seus dados e tente novamente, ou utilize o Pix.';
  }
  if (code === 'server_card') {
    return 'Não foi possível completar sua doação com este cartão. Por favor, tente novamente com outro.';
  }
  if (code === 'server_antifraud') {
    return 'Não foi possível autorizar o pagamento neste cartão. Tente novamente com outro ou utilize o Pix.';
  }
  return 'Ocorreu um erro interno. Por favor, tente novamente mais tarde.';
}

export default function ErrorBanner({ error }) {
  return (
    <div className={styles.alert}>
      <FontAwesomeIcon className={styles.icon} icon={faExclamationCircle} />
      <p>{getErrorMessageFromCode(error)}</p>
    </div>
  );
}
