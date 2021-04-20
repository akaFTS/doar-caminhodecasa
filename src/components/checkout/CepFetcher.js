import React, { useState } from "react";
import * as styles from "./CepFetcher.module.css";
import InputMask from "react-input-mask";
import cx from "classnames";
import axios from "axios";

export default function CepFetcher({ onCepFetched, shouldFlagIfBlank }) {
  const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
  };

  const fetchCep = async (newCep) => {
    if (fetchState == "LOADING") return;

    setFetchState("LOADING");
    const cleanCep = newCep.replace(/\D/g, "");
    if (cleanCep.length != 8) {
      setFetchState("INVALID");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      onCepFetched({
        cep: cleanCep,
        state: data.uf,
        city: data.localidade,
        street: data.logradouro,
      });
      setFetchState("IDLE");
    } catch (e) {
      setFetchState("INVALID");
    }
  };

  const handleChange = (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length == 9) {
      fetchCep(newCep);
    }
  };

  const [cep, setCep] = useState("");
  const [fetchState, setFetchState] = useState("IDLE");

  return (
    <div className={styles.cepWrap}>
      <InputMask
        name="cep"
        type="tel"
        placeholder="CEP"
        className={cx({
          [styles.input]: true,
          [styles.invalid]:
            fetchState == "INVALID" || (isBlank(cep) && shouldFlagIfBlank),
        })}
        value={cep}
        onChange={handleChange}
        mask={"99999-999"}
        maskPlaceholder={null}
        onBlur={() => fetchCep(cep)}
        disabled={fetchState == "LOADING"}
      />
      {fetchState == "INVALID" && (
        <p className={styles.errorText}>CEP Inválido!</p>
      )}
    </div>
  );
}
