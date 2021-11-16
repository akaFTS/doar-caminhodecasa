import React, { useState } from "react";
import * as styles from "./PersonalData.module.css";
import ErrorBanner from "./ErrorBanner";
import BlockButton from "../layout/BlockButton";
import BackButton from "./BackButton";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import PixIcon from "../pix/PixIcon";
import { anyBlank } from "../../paymentUtils";
import CheckoutInput from "./CheckoutInput";
import CheckoutInputMask from "./CheckoutInputMask";

export default function PersonalData({ data, setData, onProceedToPayment }) {
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const proceedToPayment = (type) => {
    setError(false);

    if (anyBlank(data)) {
      setError(true);
      return;
    }

    onProceedToPayment(type);
  };

  return (
    <main className={styles.main}>
      <BackButton text="Voltar para Minha Cesta" path="/cesta" />
      <form>
        <h1 className={styles.title}>Meus Dados</h1>
        <div className={styles.underline}></div>
        <div className={styles.formWrap}>
          <CheckoutInput
            name="name"
            placeholder="Nome"
            value={data.name}
            onChange={handleChange}
            shouldShowError={error}
            wrapperClass={styles.input}
          />
          <CheckoutInputMask
            name="cpf"
            type="tel"
            placeholder="CPF"
            value={data.cpf}
            onChange={handleChange}
            shouldShowError={error}
            mask={"999.999.999-99"}
            wrapperClass={styles.input}
          />
          <CheckoutInput
            name="email"
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
            shouldShowError={error}
            wrapperClass={styles.input}
          />
        </div>
        {error && <ErrorBanner error="blank" />}
        <div className={styles.buttons}>
          <BlockButton
            icon={faCreditCard}
            text="Pagar com Cartão"
            onClick={() => proceedToPayment("card")}
          />
          <BlockButton
            IconElement={PixIcon}
            text="Pagar com Pix"
            onClick={() => proceedToPayment("pix")}
          />
        </div>
      </form>
    </main>
  );
}
