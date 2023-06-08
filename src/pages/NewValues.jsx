import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/NewValues.css";
import { AuthContext } from "../contexts/AuthProvider";

const NewValues = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se os campos obrigatórios estão preenchidos
    if (!name || !description) {
      console.error("Os campos obrigatórios não foram preenchidos.");
      return;
    }

    const newChargeRequest = {
      name,
      description,
      dueDate,
      value: parseFloat(value),
      status,
    };

    try {
      const token = authContext.loginResponse?.token;

      const response = await axios.post(
        `http://localhost:5294/charge/accounts/${authContext.loginResponse?.account?.id}`,
        newChargeRequest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cobrança criada com sucesso:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar a cobrança:", error);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Adicionar Cobranças</h2>
        <div className="descricao">
          <label className="label" htmlFor="Name">
            Nome:
          </label>
          <input
            className="inputtext"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="descricao">
          <label className="label" htmlFor="Description">
            Descrição:
          </label>
          <input
            className="inputtext"
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="descricao">
          <label className="label" htmlFor="DueDate">
            Data de Vencimento:
          </label>
          <input
            className="inputtext"
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
        <div className="valor">
          <label className="label" htmlFor="Value">
            Valor:
          </label>
          <input
            className="inputtext"
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <div className="status">
          <label className="label" htmlFor="Status">
            Status:
          </label>
          <select
            className="select"
            id="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">Selecione</option>
            <option value="Payed">Payed</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="button-container">
          <button className="btn-back" onClick={handleClick}>
            Voltar
          </button>
          <button className="btn-save" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewValues;
