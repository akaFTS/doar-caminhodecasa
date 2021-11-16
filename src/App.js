import React, { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import BasketPage from "./pages/BasketPage";
import PersonalDataPage from "./pages/PersonalDataPage";
import CampaignPage from "./pages/CampaignPage";
import PixPaymentPage from "./pages/PixPaymentPage";
import CardPaymentPage from "./pages/CardPaymentPage";
import ThanksPage from "./pages/ThanksPage";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import BasketContext from "./BasketContext";
import PersonalDataContext from "./PersonalDataContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const initialBasket = JSON.parse(localStorage.getItem("Basket")) || {};
  const [basket, setBasket] = useState(initialBasket);

  const initialPersonalData = JSON.parse(
    localStorage.getItem("PersonalData")
  ) || {
    name: "",
    email: "",
    cpf: "",
  };
  const [personalData, setPersonalData] = useState(initialPersonalData);

  useEffect(() => {
    localStorage.setItem("Basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    localStorage.setItem("PersonalData", JSON.stringify(personalData));
  }, [personalData]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      <PersonalDataContext.Provider value={{ personalData, setPersonalData }}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/*" element={<MainPage />}></Route>
            <Route path="/cesta" element={<BasketPage />}></Route>
            <Route
              path="/dados_pessoais"
              element={<PersonalDataPage />}
            ></Route>
            <Route path="/pagamento_pix" element={<PixPaymentPage />}></Route>
            <Route path="/pagamento_card" element={<CardPaymentPage />}></Route>
            <Route path="/obrigado" element={<ThanksPage />}></Route>
            <Route path="/projetos/:slug" element={<CampaignPage />}></Route>
          </Routes>
        </BrowserRouter>
      </PersonalDataContext.Provider>
    </BasketContext.Provider>
  );
}
