import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from "./New.module.css";

function EditValues({ handleAddCharge }) {
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
    <div >
      <h2>Editar valores</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.descricao}>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className={styles.valor}>
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        </form>
        <div className={styles.meuelemento}>

        <button onClick={handleClick}>Editar</button>
        <button onClick={handleClick}>Voltar</button>

        </div>
      
    </div>
  );
  }
  
export default EditValues;
