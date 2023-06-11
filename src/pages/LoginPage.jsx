import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "../Styles/LoginPage.css";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authContext.login(email, password);
    onLogin(event);
    navigate("/");
  };

  const handleForgotPassword = () => {
    // Coloque aqui a lógica de recuperação de senha
  };

  const handlePasswordClick = () => {
    handleForgotPassword();
  };

  const handleEmailClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-page" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="input"
            placeholder="Email"
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
            placeholder="Senha"
            required
          />
        </div>
        <div className="btLogin-container">
          <button type="submit" className="log-in-btLogin">
            Entrar
          </button>
          <div className="btLogin-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
            <Link to="/forgot" className="link">
              Esqueci minha senha
            </Link>
            <span className="link-divider">|</span>
            <Link to="/register" className="link">
              Criar uma nova conta
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
