import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/New.module.css";

const NewValues = ({ handleAddCharge }) => {
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
      id: Date.now(),
      description,
      dueDate: "", // Fill in with appropriate due date value
      value: parseFloat(value),
      status: "", // Fill in with appropriate status value
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    handleAddCharge(newCharge);
    setDescription("");
    setValue("");
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h2 className={styles.title}>Adicionar Valores</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.descricao}>
          <label htmlFor="description">Descrição:</label>
          <input
            className={styles.inputtext}
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className={styles.valor}>
          <label htmlFor="value">Valor:</label>
          <input
            className={styles.inputtext}
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <div className={styles.meuelemento}>
          <button className={styles.btnadd} type="submit">
            Salvar
          </button>
          <button className={styles.btnback} onClick={handleClick}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewValues;