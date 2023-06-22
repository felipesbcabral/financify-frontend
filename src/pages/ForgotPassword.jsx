import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/EsqueciSenha.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      toast.error("Por favor, preencha o campo de e-mail.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`/v1/Account/send-email`, { email: email });

      setEmailSent(true);
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
      toast.error(
        "Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente."
      );
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
            <button type="submit" className="btn-cadastrar" disabled={loading}>
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
          <p>
            Um e-mail de recuperação de senha foi enviado para o seu endereço de
            e-mail.
          </p>
          <p>Por favor, verifique seu e-mail para redefinir a senha.</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
