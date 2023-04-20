import React, { useState } from "react";
import "./LoginPage.css"; // Importa o arquivo CSS
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Coloque aqui a lógica de autenticação
  };

  const handleForgotPassword = () => {
    // Coloque aqui a lógica de recuperação de senha
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src='../src/assets/financify-logo.jpg' alt="Logo do Financify" />
      </div>
      <div className="title-container">
        <h1>Financify</h1>
      </div>
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
        <Link to="Home  "><button className="log-in-button" type="submit">
          Entrar
        </button></Link>
      </form>
      <div className="button-container">
        <div className="button-wrapper">
        <Link to="ForgotPassword"> <button onClick={handleForgotPassword}>Esqueci minha senha</button></Link>
          <Link to="Register"><button>Cadastre-se</button></Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
