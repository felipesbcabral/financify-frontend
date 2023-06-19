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
        `/charge/accounts/${authContext.loginResponse?.account?.id}`,
        newChargeRequest
      );
      console.log("Cobrança criada com sucesso:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar a cobrança:", error);
    }
  };

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="new-values-container">
      <form className="new-values-form" onSubmit={handleSubmit}>
        <h2 className="new-values-title" style={{ color: "#000" }}>
          Criar cobrança
        </h2>
        <div className="new-values-descricao">
          <label className="new-values-label" htmlFor="Name" style={{ color: "#000" }}>
            Nome:
          </label>
          <input
            className="new-values-inputtext"
            type="text"
            id="name"
            placeholder="Digite o nome"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="new-values-descricao">
          <label className="new-values-label" htmlFor="Description" style={{ color: "#000" }}>
            Descrição:
          </label>
          <input
            className="new-values-inputtext"
            type="text"
            id="description"
            placeholder="Digite a descrição"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="new-values-descricao">
          <label className="new-values-label" htmlFor="DueDate" style={{ color: "#000" }}>
            Data de Vencimento:
          </label>
          <input
            className="new-values-inputtext"
            type="date"
            id="dueDate"
            placeholder="Selecione a data de vencimento"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
        <div className="new-values-valor">
          <label className="new-values-label" htmlFor="Value" style={{ color: "#000" }}>
            Valor:
          </label>
          <input
            className="new-values-inputtext"
            type="number"
            id="value"
            placeholder="Digite o valor"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <div className="new-values-status">
          <label className="new-values-label" htmlFor="Status" style={{ color: "#000" }}>
            Status:
          </label>
          <select
            className="new-values-select"
            id="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">Selecione</option>
            <option value="Pago">Pago</option>
            <option value="Expirado">Expirado</option>
            <option value="Pendente">Pendente</option>
          </select>
        </div>
        <div className="new-values-button-container">
          <button className="new-values-btn-save" type="submit" style={{ backgroundColor: "#023e73", color: "#fff" }}>
            Salvar
          </button>
          <button className="new-values-btn-back" onClick={handleClick} style={{ backgroundColor: "#023e73", color: "#fff" }}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewValues;