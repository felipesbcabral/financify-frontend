import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Home.css";

const Home = () => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [billingData, setBillingData] = useState([
    {
      id: 1,
      description: "Cobrança 1",
      dueDate: "2023-06-10",
      value: 100.0,
      status: "Pendente",
      createdAt: "2023-06-01 10:00:00",
      updatedAt: "2023-06-01 10:00:00",
    },
    {
      id: 2,
      description: "Cobrança 2",
      dueDate: "2023-06-15",
      value: 150.0,
      status: "Pago",
      createdAt: "2023-06-02 14:30:00",
      updatedAt: "2023-06-02 14:30:00",
    },
    // Add more billing data as needed
  ]);
  const navigate = useNavigate();

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (dateString) => {
    // Implement your date formatting logic here
    return dateString;
  };

  const handleEditCharge = (chargeId) => {
    navigate(`/Edit`);
  };

  const handleDeleteCharge = (chargeId) => {
    // Implement your logic to handle delete charge action
  };

  const handleAddCharge = (newCharge) => {
    const updatedBillingData = [...billingData, newCharge];
    setBillingData(updatedBillingData);
    navigate("/");
  };

  const filteredCharges = []; // Add your logic to filter charges based on selected date range

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div>
          <button
            className="add-button"
            onClick={() => setDatePickerVisible(!datePickerVisible)}
          >
            Selecionar datas
          </button>{" "}
          {datePickerVisible && (
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
        <div className="ml-4">
          <Table bordered size="sm" className="billing-table">
            <tbody>
              {filteredCharges.map((charge) => (
                <tr key={charge.id}>
                  <td>{charge.id}</td>
                  <td>{charge.description}</td>
                  <td>R$ {charge.value}</td>
                  <td>{formatDate(charge.date)}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditCharge(charge.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
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
      </div>
      <div className="dashboard-table-container">
        <Table bordered size="sm" className="billing-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data de Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((billing) => (
              <tr key={billing.id}>
                <td>{billing.description}</td>
                <td>{billing.dueDate}</td>
                <td>{billing.value}</td>
                <td>{billing.status}</td>
                <td>{billing.createdAt}</td>
                <td>{billing.updatedAt}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditCharge(billing.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCharge(billing.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="add-button-container">
          <NavLink className="add-button" to="/New">
            Adicionar
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
