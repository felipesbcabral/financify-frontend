import React, { useState } from "react";
import "./LoginPage.css"; // Importa o arquivo CSS
import styles from "../pages/New.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailClick = (event) => {
    navigate("/register");
  };

  const handlePasswordClick = (event) => {
    navigate("/forgot");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onLogin(email, password);
    navigate("/");
  };

  const handleForgotPassword = () => {
    // Coloque aqui a lógica de recuperação de senha
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src="../src/assets/financify-logo.jpg" alt="Logo do Financify" />
      </div>
      <div className="title-container"></div>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button className="log-in-button" type="submit">
          Entrar
        </button>
        <button className="log-in-button" onClick={handlePasswordClick}>
          Esqueci minha senha
        </button>
        <button className="log-in-button" onClick={handleEmailClick}>
          Cadastre-se
        </button>
      </form>
      <div className={styles.botaoentrar}>
        <div></div>
      </div>
    </div>
  );
}

export default LoginPage;
