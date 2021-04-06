import React from "react";
import * as styles from "./PersonalData.module.css";
import InputMask from "react-input-mask";
import cx from "classnames";

export default function PersonalData({ data, setData, shouldFlagBlankFields }) {
  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <h1 className={styles.title}>Dados Pessoais</h1>
      <div className={styles.underline}></div>
      <div className={styles.formWrap}>
        <input
          name="name"
          className={cx({
            [styles.input]: true,
            [styles.blankInput]: shouldFlagBlankFields && isBlank(data.name),
          })}
          placeholder="Nome"
          value={data.name}
          onChange={handleChange}
        />
        <InputMask
          name="cpf"
          placeholder="CPF"
          className={cx({
            [styles.input]: true,
            [styles.blankInput]: shouldFlagBlankFields && isBlank(data.cpf),
          })}
          value={data.cpf}
          onChange={handleChange}
          mask={"999.999.999-99"}
          maskPlaceholder={null}
        />
        <input
          type="email"
          name="email"
          className={cx({
            [styles.input]: true,
            [styles.blankInput]: shouldFlagBlankFields && isBlank(data.email),
          })}
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
        />
        <InputMask
          name="phone"
          placeholder="Telefone"
          className={cx({
            [styles.input]: true,
            [styles.blankInput]: shouldFlagBlankFields && isBlank(data.phone),
          })}
          value={data.phone}
          mask="(99) 99999-9999"
          maskPlaceholder={null}
          beforeMaskedStateChange={beforeMaskedValueChange}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
