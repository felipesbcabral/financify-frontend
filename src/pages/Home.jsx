import React, { useState } from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../Styles/Home.css"; // Importe seu arquivo CSS aqui
import styles from "../Styles/New.module.css"

const Dashboard = (props) => {
  const navigate = useNavigate();

  function handleClick(event) {
    props.onLogin(event)
    navigate("/home");
  }

  const [datePickerVisible, setDatePickerVisible] = useState(false); // estado que controla a visibilidade do calendário
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

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleEditCharge = (id) => {
    navigate("/edit");
  };

  const handleDeleteCharge = (id) => {
    const updatedCharges = charges.filter((charge) => charge.id !== id);
    setCharges(updatedCharges);
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
    <div>
      <div>
        <button className={styles.calender} onClick={() => setDatePickerVisible(!datePickerVisible)}>
          Selecionar datas
        </button>{" "}
        {/* botão que controla a visibilidade do calendário */}
        {datePickerVisible && ( // calendário que só aparece quando a variável datePickerVisible é true
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        )}
      </div>
      <br />
      <div className="dashboard-table-container">
        <div>
          <Table striped bordered hover size="sm" className="table-without-bg">
            <thead>
              <tr>
                <th id="id">ID</th>
                <th id="description">Descrição</th>
                <th id="value">Valor</th>
                <th id="date">Data</th>
                <th id="actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharges.map((charge) => (
                <tr key={charge.id}>
                  <td>{charge.id}</td>
                  <td>{charge.description}</td>
                  <td>R$ {charge.value}</td>
                  <td>{formatDate(charge.date)}</td>
                  <td>
                    {" "}
                    <button
                      className={styles.btnadd}
                      onClick={() => handleEditCharge(charge.id)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.btnback}
                      onClick={() => handleDeleteCharge(charge.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <br />
        <div>
          <NavLink className={styles.btnadd} to="/New">
            Adicionar
          </NavLink>
        </div>
      </div>
    </div>
  );
  
};
export default Dashboard;
