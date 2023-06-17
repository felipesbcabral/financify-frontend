import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import AddChargePage from "./pages/NewValues";
import EditValues from "./pages/EditChargePage";
import Layout from "./components/Layout";
import Config from "./pages/config";
import HelpPage from "./pages/support";
import DataPage from "./pages/dados";
import PrivacyPage from "./pages/privacidade";
import ErrorPage from "./pages/Erro";
import axios from "axios";
import InitialPage from "./pages/initialPage";
import ResetPassword from "./pages/ResetPassword";


axios.defaults.baseURL = 'http://localhost:5294';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

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
              <Route path="/" element={<InitialPage />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/reset" element={<ResetPassword />} />
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
              <Route path="/edit/:chargeId" element={<EditValues />} />
              <Route path="/config" element={<Config />} />
              <Route path="/ajuda" element={<HelpPage />} />
              <Route path="/dados" element={<DataPage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
