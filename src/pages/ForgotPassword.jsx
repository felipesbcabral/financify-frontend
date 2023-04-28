import React, { useState } from "react";
import "./ForgotPassword.css"; // Importe o arquivo de estilos
import { Link } from "react-router-dom";

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
    <div className="esqueci-senha-container">
      <h1>Esqueci a Senha</h1>
      <form onSubmit={handleSubmit} className="esqueci-senha-form">
        <label htmlFor="nomeUsuario">Nome de Usuário:</label>
        <input
          type="text"
          id="nomeUsuario"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />
        <br />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div className="esqueci-senha-buttons">
        <Link to="/"> <button type="submit" className="esqueci-senha-enviar">
            Enviar
          </button></Link>
          <Link to="/"> <button type="button" className="esqueci-senha-voltar">
            Voltar
          </button></Link>
        </div>
      </form>
    </div>
  );
};

export default EsqueciSenha;
