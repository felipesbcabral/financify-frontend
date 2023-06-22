import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/EsqueciSenha.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      alert("Por favor, preencha o campo de e-mail.");
      return;
    }

    setLoading(true);

    try {
      // Enviar o email de recuperação de senha
      await axios.post(`/v1/Account/send-email`, { email: email });

      setEmailSent(true);
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
      alert("Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Esqueci a Senha</h1>
      {!emailSent ? (
        <form onSubmit={handleSubmit} className="form-cadastro">
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="btn-enviar" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
            <Link to="/login" className="link-voltar">
              <button type="button" className="btn-voltar">
                Voltar
              </button>
            </Link>
          </div>
        </form>
      ) : (
        <div>
          <p>Um e-mail de recuperação de senha foi enviado para o seu endereço de e-mail.</p>
          <p>Por favor, verifique seu e-mail para redefinir a senha.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
