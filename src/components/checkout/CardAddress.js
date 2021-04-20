import React, { useState } from "react";
import * as styles from "./CardAddress.module.css";
import CepFetcher from "./CepFetcher";
import cx from "classnames";

export default function CardAddress({ data, setData, shouldFlagBlankFields }) {
  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

  const handleCepFetched = ({ cep, street, city, state }) => {
    setFieldsShown(true);
    setData({ ...data, cep, street, city, state });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [fieldsShown, setFieldsShown] = useState(false);

  return (
    <div className={styles.container}>
      <h4>Endereço de Cobrança</h4>
      <div className={styles.form}>
        <div className={styles.cepWrap}>
          <CepFetcher
            onCepFetched={handleCepFetched}
            shouldFlagIfBlank={shouldFlagBlankFields}
          />
        </div>
        {fieldsShown && (
          <>
            <input
              name="street"
              className={cx({
                [styles.input]: true,
                [styles.street]: true,
                [styles.invalid]: shouldFlagBlankFields && isBlank(data.street),
              })}
              placeholder="Rua"
              value={data.street}
              onChange={handleChange}
            />
            <input
              name="streetNumber"
              className={cx({
                [styles.input]: true,
                [styles.invalid]:
                  shouldFlagBlankFields && isBlank(data.streetNumber),
              })}
              placeholder="Número"
              value={data.streetNumber}
              onChange={handleChange}
            />
            <input
              name="complement"
              className={styles.input}
              placeholder="Complemento"
              value={data.complement}
              onChange={handleChange}
            />
            <input
              name="city"
              className={cx({
                [styles.input]: true,
                [styles.invalid]: shouldFlagBlankFields && isBlank(data.city),
              })}
              placeholder="Cidade"
              value={data.city}
              onChange={handleChange}
            />
            <input
              name="state"
              className={cx({
                [styles.input]: true,
                [styles.invalid]: shouldFlagBlankFields && isBlank(data.state),
              })}
              placeholder="Estado"
              value={data.state}
              onChange={handleChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
