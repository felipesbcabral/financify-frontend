import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Home.css";

import { AuthContext } from "../contexts/AuthProvider";

const Home = () => {
  const [billingData, setBillingData] = useState([]);
  const { accountId } = useParams();
  const authContext = useContext(AuthContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const token = authContext.loginResponse?.token;
        const accountId = authContext.loginResponse?.account?.id;

        const response = await axios.get(
          `http://localhost:5294/charge/accounts/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBillingData(response.data);
      } catch (error) {
        console.error("Erro ao obter as cobranças:", error);
      }
    };

    fetchBillingData();
  }, [authContext.loginResponse]);

  const handleEditCharge = (chargeId) => {
    // Navegar para a página de edição com o ID da cobrança
  };

  const handleDeleteCharge = (chargeId) => {
    // Implemente sua lógica para exclusão da cobrança aqui
  };

  const formatDate = (dateString) => {
    // Implemente sua lógica de formatação de data aqui
    return dateString;
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filteredBillingData = billingData.filter((charge) => {
    if (startDate && endDate) {
      const chargeDate = new Date(charge.dueDate);
      return chargeDate >= startDate && chargeDate <= endDate;
    }
    return true;
  });

  return (
    <div className="container">
      <div className="action-container">
        <NavLink to="/New">
          <Button variant="primary" className="addButton add-button">
            Criar Cobrança
          </Button>
        </NavLink>
        <div className="datePickerContainer">
          <span>Período:</span>
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            className="datePicker"
          />
        </div>
      </div>
      <div className="dashboard-table-container">
        <div className="table-responsive">
          <Table striped bordered hover className="table billing-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBillingData.map((charge) => (
                <tr key={charge.id}>
                  <td>{charge.description}</td>
                  <td>{formatDate(charge.dueDate)}</td>
                  <td>{charge.value}</td>
                  <td>{charge.status}</td>
                  <td>{formatDate(charge.createdAt)}</td>
                  <td>{formatDate(charge.updatedAt)}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="editButton"
                      onClick={() => handleEditCharge(charge.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      className="deleteButton"
                      onClick={() => handleDeleteCharge(charge.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Home;
