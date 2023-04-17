import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePage.css";

function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [balance, setBalance] = useState(1200);
  const [charges, setCharges] = useState([
    {
      id: 1,
      description: "Conta de luz",
      value: 120,
      date: new Date(),
    },
    {
      id: 2,
      description: "Conta de água",
      value: 90,
      date: new Date(),
    },
    {
      id: 3,
      description: "Aluguel",
      value: 900,
      date: new Date(),
    },
  ]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleAddCharge = (event) => {
    event.preventDefault();
    const newCharge = {
      id: charges.length + 1,
      description,
      value: parseFloat(value),
      date: new Date(),
    };
    setCharges([...charges, newCharge]);
    setBalance(balance - parseFloat(value));
    setDescription("");
    setValue("");
  };

  const filteredCharges = charges.filter((charge) => {
    const chargeDate = new Date(charge.date);
    return chargeDate >= startDate && chargeDate <= endDate;
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="home">
      <h1>Minhas cobranças</h1>
      <div className="filter-container">
        <DatePicker
          selected={startDate}
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
        <div className="add-charge-container">
          <h2>Novo lançamento</h2>
          <form onSubmit={handleAddCharge}>
            <label>
              Descrição:
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
              />
            </label>
            <label>
              Valor:
              <input
                type="number"
                min="0"
                step="0.01"
                value={value}
                onChange={handleValueChange}
              />
            </label>
            <button type="submit">Adicionar</button>
          </form>
        </div>
      </div>
      <div className="charges-container">
        <div className="balance-container">
          <h2>Saldo: R${balance.toFixed(2)}</h2>
        </div>
        <ul>
          {filteredCharges.map((charge) => (
            <li key={charge.id}>
              <div className="charge-info">
                <div className="charge-date">
                  <span>{formatDate(charge.date)}</span>
                </div>
                <div className="charge-description">
                  <span>{charge.description}</span>
                </div>
                <div
                  className={`charge-value ${
                    charge.value > 0 ? "positive" : "negative"
                  }`}
                >
                  {charge.value > 0
                    ? `+ R$${charge.value.toFixed(2)}`
                    : `- R$${(-charge.value).toFixed(2)}`}
                </div>
                <div className="charge-actions">
                  <button className="edit-button">Editar</button>
                  <button className="delete-button">Excluir</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Home;
