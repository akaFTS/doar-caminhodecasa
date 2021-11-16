import React, { useState } from "react";
import * as styles from "./CepFetcher.module.css";
import CheckoutInputMask from "../checkout/CheckoutInputMask";
import axios from "axios";

export default function CepFetcher({ onCepFetched, shouldFlagIfBlank }) {
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
      <CheckoutInputMask
        name="cep"
        type="tel"
        placeholder="CEP"
        shouldShowError={fetchState == "INVALID" || shouldFlagIfBlank}
        value={cep}
        onChange={handleChange}
        mask={"99999-999"}
        onBlur={() => fetchCep(cep)}
        disabled={fetchState == "LOADING"}
      />
      {fetchState == "INVALID" && (
        <p className={styles.errorText}>CEP Inválido!</p>
      )}
    </div>
  );
}
