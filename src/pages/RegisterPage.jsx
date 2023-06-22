import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/CadastroUsuarios.css";
import axios from "axios";

const CadastroUsuarios = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/v1/Account",
        {
          FirstName: firstName,
          LastName: lastName,
          Password: password,
          Email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Aqui você pode tratar a resposta do servidor, se necessário
      console.log(response.data);

      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("Ocorreu um erro ao cadastrar o usuário");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Cadastro de Usuários</h1>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <div className="form-group">
          <label htmlFor="nomeUsuario">Primeiro nome:</label>
          <input
            type="text"
            id="nomeUsuario"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nomeUsuario">Ultimo nome:</label>
          <input
            type="text"
            id="nomeUsuario"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={password}
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
        {error && <div className="error-message">{error}</div>}
        <div className="btCadastro-container">
          <button type="submit" className="btn-cadastrar">
            Cadastrar
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

export default CadastroUsuarios;
