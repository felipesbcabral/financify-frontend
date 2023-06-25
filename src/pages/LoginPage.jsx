import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/LoginPage.css";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
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
    try {
      await authContext.login(email, password);
      onLogin(event);
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao efetuar login");
      }
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label" htmlFor="email">E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="input"
            id="email"
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="password">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
            id="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="btLogin-container">
          <button type="submit" className="log-in-btLogin">
            Entrar
          </button>
          <div className="btLogin-wrapper">
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