import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Styles/CadastroUsuarios.css";

const CadastroUsuarios = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !password || !email) {
      toast.warning("Todos os campos são obrigatórios!");
      return;
    }

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

      console.log(response.data);

      toast.success("Usuário cadastrado com sucesso!");

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Ocorreu um erro ao cadastrar o usuário");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Cadastro de Usuários</h1>
      <ToastContainer />
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
        <div className="btCadastro-container">
  <button type="submit" className="btn-voltar">
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
