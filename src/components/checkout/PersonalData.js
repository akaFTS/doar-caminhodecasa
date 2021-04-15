import React from "react";
import * as styles from "./PersonalData.module.css";
import InputMask from "react-input-mask";
import cx from "classnames";

export default function PersonalData({ data, setData, shouldFlagBlankFields }) {
  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
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
          type="tel"
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
          name="email"
          type="email"
          className={cx({
            [styles.input]: true,
            [styles.blankInput]: shouldFlagBlankFields && isBlank(data.email),
          })}
          placeholder="E-mail"
          value={data.email}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
