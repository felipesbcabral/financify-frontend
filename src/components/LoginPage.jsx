import React, { useState } from "react";
import "./LoginPage.css"; // Importa o arquivo CSS

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
      <h1>
        <img src='../src/assets/financify-logo.jpg' alt="Logo do Financify" />
        Financify
      </h1>
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
      </form>
      <div className="button-container">
        <div className="button-wrapper">
          <button onClick={handleForgotPassword}>Esqueci minha senha</button>
          <button>Cadastre-se</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
