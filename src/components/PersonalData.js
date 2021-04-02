import React, { useState } from "react";
import * as styles from "./PersonalData.module.css";
import InputMask from "react-input-mask";

export default function PersonalData({
  name,
  cpf,
  email,
  phone,
  setName,
  setCpf,
  setEmail,
  setPhone,
}) {
  const beforeMaskedValueChange = ({ nextState }) => {
    const newValue = nextState.value.replace(/\D/g, "");
    if (newValue.length === 10) {
      return {
        ...nextState,
        value: newValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3"),
      };
    }

    return nextState;
  };

  return (
    <section>
      <h1 className={styles.title}>Dados Pessoais</h1>
      <div className={styles.underline}></div>
      <div className={styles.formWrap}>
        <input
          name="name"
          className={styles.input}
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputMask
          name="cpf"
          placeholder="CPF"
          className={styles.input}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          mask={"999.999.999-99"}
          maskPlaceholder={null}
        />
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputMask
          name="phone"
          placeholder="Telefone"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          mask="(99) 99999-9999"
          maskPlaceholder={null}
          beforeMaskedStateChange={beforeMaskedValueChange}
        />
      </div>
    </section>
  );
}
