import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import "../Styles/EditCharges.css";

const EditChargePage = () => {
  const { chargeId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { updateCharge, getCharge } = useContext(AuthContext);

  useEffect(() => {
    const fetchCharge = async () => {
      try {
        const charge = await getCharge(chargeId);
        setName(charge.name);
        setDescription(charge.description);
        setDueDate(charge.dueDate);
        setValue(charge.value);
        setStatus(charge.status);
      } catch (error) {
        console.error("Error fetching charge:", error);
      }
    };

    fetchCharge();
  }, [chargeId, getCharge]);

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

    const updatedCharge = {
      name,
      description,
      dueDate,
      value: parseFloat(value),
      status,
    };

    try {
      await axios.put(`http://localhost:5294/charge/${chargeId}`, updatedCharge);
      navigate("/home", { state: { successMessage: "Cobrança atualizada com sucesso." } });
    } catch (error) {
      console.error("Error updating charge:", error);
      // Lógica adicional em caso de erro na atualização da cobrança (charge), se necessário...
    }
  };

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="edit-charge-container">
      <form className="edit-charge-form" onSubmit={handleSubmit}>
        <h2 className="edit-charge-title">Editar Cobrança</h2>
        <div className="edit-charge-descricao">
          <label className="edit-charge-label" htmlFor="name">
            Nome:
          </label>
          <input
            className="edit-charge-inputtext"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="edit-charge-descricao">
          <label className="edit-charge-label" htmlFor="description">
            Descrição:
          </label>
          <input
            className="edit-charge-inputtext"
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="edit-charge-descricao">
          <label className="edit-charge-label" htmlFor="dueDate">
            Data de Vencimento:
          </label>
          <input
            className="edit-charge-inputtext"
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
        <div className="edit-charge-descricao">
          <label className="edit-charge-label" htmlFor="value">
            Valor:
          </label>
          <input
            className="edit-charge-inputtext"
            type="text"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <div className="edit-charge-descricao">
          <label className="edit-charge-label" htmlFor="status">
            Status:
          </label>
          <select
            className="edit-charge-select"
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
        <div className="edit-charge-button-container">
          <button className="edit-charge-btn-back" type="button" onClick={handleClick}>
            Voltar
          </button>
          <button className="edit-charge-btn-save" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditChargePage;
