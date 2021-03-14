import React from "react";
import MainPage from "./MainPage";
import CampaignPage from "./CampaignPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/:campaign" element={<CampaignPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
