import React, { useState } from "react";
import { Link } from "react-router-dom";

const CadastroUsuarios = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para validar os dados do usuário e realizar o cadastro

    // Exemplo de validação simples apenas para fins ilustrativos
    if (nomeUsuario === "" || senha === "" || email === "") {
      alert("Por favor, preencha todos os campos.");
    } else {
      // Realizar o cadastro do usuário
      alert("Usuário cadastrado com sucesso!");
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Usuários</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
         <Link to="/"><button type="submit" className="btn-cadastrar">
            Cadastrar
          </button></Link>
          <Link to="/"><button type="button" className="btn-voltar">
            Voltar
          </button></Link>
        </div>
      </form>
    </div>
  );
};

export default CadastroUsuarios;
