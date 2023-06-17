import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/EsqueciSenha.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getTokenFromQueryString = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get("token");
  };

  useEffect(() => {
    const token = getTokenFromQueryString();
    if (!token) {
      // Token inválido ou ausente, redirecionar para uma página de erro ou tratamento adequada.
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword === "") {
      alert("Por favor, preencha o campo de nova senha.");
      return;
    }

    setLoading(true);

    try {
      const token = getTokenFromQueryString(); // Obter o token novamente dentro da função handleSubmit
      // Redefinir a senha
      await axios.post(`/v1/Account/reset-password`, {
        token: token,
        newPassword: newPassword,
      });

      alert("Senha redefinida com sucesso!");
      window.location.href = "/login"; // Redirecionar para a página de login
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      alert("Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Redefinir Senha</h1>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <div className="form-group">
          <label htmlFor="newPassword">Nova Senha:</label>
          <input
            name="newPassword"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn-cadastrar" disabled={loading}>
            {loading ? "Enviando..." : "Redefinir Senha"}
          </button>
          <Link to="/login" className="link-voltar">
            <button type="button" className="btn-voltar">
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
