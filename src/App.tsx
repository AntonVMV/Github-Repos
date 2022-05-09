import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { Battle } from "./pages/Battle/Battle";
import { Repos } from "./pages/Repos/Repos";
import { ReposCards } from "./components/reposPage/ReposCards";
import { ResultPage } from "./pages/Battle/ResultPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="Repos" replace />} />
          <Route path="Repos" element={<Repos />}>
            <Route index element={<Navigate to="All" replace />} />
            <Route path=":id" element={<ReposCards />} />
          </Route>
          <Route path="Battle" element={<Battle />} />
          <Route path="Battle/Result" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
