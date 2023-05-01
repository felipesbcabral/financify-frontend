import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/New.module.css";

function NewValues({ handleAddCharge }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
 const navigate = useNavigate();
  function handleClick() { navigate('/'); }
 
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
      <h2 className={styles.title}>Adicionar Valores</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.descricao}>
          <label htmlFor="description">Descrição:</label>
          <input className={styles.inputtext}
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className={styles.valor}>
          <label htmlFor="value">Valor:</label>
          <input className={styles.inputtext}
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        </form>
        <div className={styles.meuelemento}>

        <button className={styles.btnadd} onClick={handleClick}>Adicionar</button>
        <button className={styles.btnback}  onClick={handleClick}>Voltar</button>

        </div>
      
    </div>
  );
  }
  
export default NewValues;
