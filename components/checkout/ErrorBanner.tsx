import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { CheckoutError } from 'types/checkout';
import styles from './ErrorBanner.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

function getErrorMessageFromCode(code: CheckoutError) {
  switch (code) {
    case 'blank':
      return 'Preencha todos os campos!';
    case 'cpf':
      return 'O CPF é inválido!';
    case 'email':
      return 'O e-mail digitado é inválido!';
    case 'name':
      return 'Nome inválido! Utilize apenas letras e números.';
    case 'pix_blank':
      return 'Primeiro, preencha seus dados pessoais.';
    case 'server_validation':
      return 'Não foi possível completar sua doação. Verifique seus dados e tente novamente, ou utilize o Pix.';
    case 'server_card':
      return 'Não foi possível completar sua doação com este cartão. Por favor, tente novamente com outro.';
    case 'server_antifraud':
      return 'Não foi possível autorizar o pagamento neste cartão. Tente novamente com outro ou utilize o Pix.';
    case 'unknown':
      return 'Ocorreu um erro interno. Por favor, tente novamente mais tarde.';
    default:
      return assertUnreachable(code);
  }
}

type Props = {
  error: CheckoutError;
};

export default function ErrorBanner({ error }: Props) {
  return (
    <div className={styles.alert}>
      <FontAwesomeIcon className={styles.icon} icon={faExclamationCircle} />
      <p>{getErrorMessageFromCode(error)}</p>
    </div>
  );
}
