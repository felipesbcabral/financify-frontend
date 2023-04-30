import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./New.module.css";
import "./EsqueciSenha.css"; // <--- Adicione essa linha

const EsqueciSenha = (props) => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o e-mail de redefinição de senha

    // Exemplo de validação simples apenas para fins ilustrativos
    if (nomeUsuario === "" || email === "") {
      alert("Por favor, preencha todos os campos.");
    } else {
      // Enviar e-mail de redefinição de senha
      alert("E-mail de redefinição de senha enviado com sucesso!");
    }
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Esqueci a Senha</h1>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <div className="form-group">
          <label htmlFor="nomeUsuario">Nome de Usuário:</label>
          <input
            type="text"
            id="nomeUsuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Link to="/login">
            <button type="submit" className="btn-cadastrar">
              Enviar
            </button>
          </Link>
          <Link to="/login " className="link-voltar">
            <button type="button" className="btn-voltar">
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EsqueciSenha;