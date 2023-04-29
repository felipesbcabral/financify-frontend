import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./New.module.css";

function EditValues(props) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

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
    if (typeof props.handleAddCharge === 'function') {
      props.handleAddCharge(newCharge);
    }
    setDescription("");
    setValue("");
  };

  function handleClick(event) {
    if (typeof props.onLogin === 'function') {
      props.onLogin(event)
    }
    navigate("/");
  }

  return (
    <div>
      <h2 className={styles.title}>Editar Valores</h2>
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
