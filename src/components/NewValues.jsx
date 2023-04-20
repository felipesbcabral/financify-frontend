import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function AddChargePage({ handleAddCharge }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
 const navigate = useNavigate();
  function handleClick() { navigate('/Home'); }
 
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCharge = {
      description,
      value: parseFloat(value),
      date: new Date(),
    };
    handleAddCharge(newCharge);
    setDescription("");
    setValue("");
  };
 
 
  return (
    <div>
      <h2>Adicionar Valor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <button onClick={handleClick}>Voltar</button>

        <button onClick={handleClick}>Adicionar</button>
       
      </form>
    </div>
  );
}

export default AddChargePage;
