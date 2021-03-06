import React, { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import BasketPage from "./pages/BasketPage";
import CampaignPage from "./pages/CampaignPage";
import ThanksPage from "./pages/ThanksPage";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import BasketContext from "./BasketContext";

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

  useEffect(() => {
    localStorage.setItem("Basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<MainPage />}></Route>
          <Route path="/cesta" element={<BasketPage />}></Route>
          <Route path="/obrigado" element={<ThanksPage />}></Route>
          <Route path="/projetos/:slug" element={<CampaignPage />}></Route>
        </Routes>
      </BrowserRouter>
    </BasketContext.Provider>
  );
}
