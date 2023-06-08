import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../Styles/Home.css";
import { AuthContext } from "../contexts/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Cobranças</h2>
      <div className={styles.datePickerContainer}>
        <DatePicker
          selected={startDate}
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          placeholderText="Selecione um intervalo de datas"
          className={styles.datePicker}
        />
      </div>
      <NavLink to="/New">
        <Button variant="primary" className={styles.addButton}>
          Criar Cobrança
        </Button>
      </NavLink>
      <Table striped bordered hover className={styles.billingTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Data de Vencimento</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredBillingData.map((charge) => (
            <tr key={charge.id}>
              <td>{charge.id}</td>
              <td>{charge.name}</td>
              <td>{charge.description}</td>
              <td>{formatDate(charge.dueDate)}</td>
              <td>{charge.value}</td>
              <td>{charge.status}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditCharge(charge.id)}
                  className={styles.editButton}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCharge(charge.id)}
                  className={styles.deleteButton}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
