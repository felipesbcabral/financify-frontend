import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthProvider";

function EditValues(props) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { updateCharge } = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const updatedCharge = {
      name,
      dueDate,
      value,
    };
    
    try {
      await updateCharge(props.chargeId, updatedCharge);
      navigate("/");
    } catch (error) {
      console.error("Error updating charge:", error);
      // Lógica adicional em caso de erro na atualização da cobrança (charge), se necessário...
    }
  };

  function handleClick(event) {
    navigate("/");
  }

  return (
    <div>
      <h2 className="title">Editar Valores</h2>
      <form onSubmit={handleSubmit}>
        <div className="descricao">
          <label htmlFor="name">Nome:</label>
          <input
            className="inputtext"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        
        <div className="dueDate">
          <label htmlFor="dueDate">Data de Vencimento:</label>
          <input
            className="inputtext"
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>
        
        <div className="valor">
          <label htmlFor="value">Valor:</label>
          <input
            className="inputtext"
            type="text"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        
        <div className="meuelemento">
          <button className="btnadd" type="submit" >Editar</button>
          <button className="btnback" onClick={handleClick}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default EditValues;
