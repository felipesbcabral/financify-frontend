import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  function handleClick() { navigate('/Home'); }
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
      <h1>Home</h1>
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
      <br />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharges.map((charge) => (
              <tr key={charge.id}>
                <td>{charge.id}</td>
                <td>{charge.description}</td>
                <td>R$ {charge.value}</td>
                <td>{formatDate(charge.date)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <NavLink to="/New">Adicionar</NavLink>
       <NavLink to="/Edit">Editar</NavLink>
      </div>
    </div>
  );
}

export default Home;
