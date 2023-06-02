// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import AddChargePage from "./pages/NewValues";
import EditChargePage from "./pages/EditChargePage";
import Layout from "./components/Layout";
import React from "react";
import Config from "./pages/config";
import HelpPage from "./pages/support";
import DataPage from "./pages/dados";
import PrivacyPage from "./pages/privacidade";
import ErrorPage from "./pages/Erro";

export default function App() {
  const [logado, setLogado] = useState(false);
  const [userID, setUserID] = useState();

  function handleLogin(event) {
    setLogado(true);
    setUserID(100);
  }

  function handleLogout(event) {
    setLogado(false);
    setUserID(null);
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {!logado ? (
            <>
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          ) : (
            <Route
              path="/"
              element={<Layout id={userID} onLogout={handleLogout} />}
            >
              <Route index element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/new" element={<AddChargePage />} />
              <Route path="/edit" element={<EditChargePage />} />
              <Route path="/config" element={<Config />} />
              <Route path="/ajuda" element={<HelpPage />} />
              <Route path="/dados" element={<DataPage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} /> // Adicione esta rota para lidar com páginas não encontradas
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
