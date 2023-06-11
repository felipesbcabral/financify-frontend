import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import "../Styles/LoginPage.css";

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
    <div className="login-page">
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
        <div className="button-container">
          <button type="submit" className="log-in-button">
            Entrar
          </button>
          <div className="button-wrapper">
            <Link to="/forgot" className="link">
              Esqueci minha senha
            </Link>
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