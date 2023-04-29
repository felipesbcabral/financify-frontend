import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import AddChargePage from "./pages/NewValues"
import EditChargePage from "./pages/EditChargePage";
import Navbar from "./components/Navbar";

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
    <Navbar />
      <Routes>
        {logado ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit" element={<EditChargePage />} />
            <Route path="/new" element={<AddChargePage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
