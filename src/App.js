import React, { useEffect } from "react";
import MainPage from "./MainPage";
import BasketPage from "./BasketPage";
import CampaignPage from "./CampaignPage";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<MainPage />}></Route>
        <Route path="/cesta" element={<BasketPage />}></Route>
        <Route path="/projetos/:slug" element={<CampaignPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
