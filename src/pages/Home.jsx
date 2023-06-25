import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Home.css";

import { AuthContext } from "../contexts/AuthProvider";

const Home = () => {
  const [billingData, setBillingData] = useState([]);
  const { accountId } = useParams();
  const authContext = useContext(AuthContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChargeId, setSelectedChargeId] = useState(null);
  const [balance, setBalance] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const token = authContext.loginResponse?.token;
        const accountId = authContext.loginResponse?.account?.id;

        const response = await axios.get(`/charge/account/${accountId}`);
        const charges = response.data;

        setBillingData(charges);
      } catch (error) {
        toast.error("Erro ao obter as cobranças");
      }
    };

    const fetchAccountBalance = async () => {
      try {
        const token = authContext.loginResponse?.token;
        const accountId = authContext.loginResponse?.account?.id;

        const response = await axios.get(`/v1/account/balance/${accountId}`);
        const accountBalance = response.data.balance;

        setBalance(accountBalance);
      } catch (error) {
        toast.error("Erro ao obter o saldo da conta");
      }
    };

    fetchBillingData();
    fetchAccountBalance();
  }, [authContext.loginResponse]);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
      navigate("/home");
    }
  }, [location, navigate]);

  const handleEditCharge = (chargeId) => {
    navigate(`/edit/${chargeId}`);
  };

  const handleShowDeleteModal = (chargeId) => {
    setSelectedChargeId(chargeId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = authContext.loginResponse?.token;
      await axios.delete(`/charge/${selectedChargeId}`);
      const updatedBillingData = billingData.filter(
        (charge) => charge.id !== selectedChargeId
      );
      setBillingData(updatedBillingData);
      toast.success("Cobrança excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir cobrança. Por favor, tente novamente.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
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
    <div className="body-home">
      <div className="home-container">
        <div className="home-action-container">
          <NavLink to="/New">
            <Button variant="primary" className="home-addButton">
              Criar Cobrança
            </Button>
          </NavLink>
          <div className="home-datePickerContainer">
            <span>Período:</span>
            <div className="home-datePickerWrapper">
              <DatePicker
                selected={startDate}
                onChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                className="home-datePicker"
              />
            </div>
          </div>
        </div>
        <div className="home-form">
          <div className="home-balance">
            Saldo: R$ <span className="balance-amount">{balance}</span>
          </div>
          <div className="home-dashboard-table-container">
            <div className="home-table-responsive">
              <Table striped bordered hover className="home-table billing-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Status</th>
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
                      <td>
                        <Button
                          variant="primary"
                          className="home-editButton"
                          onClick={() => handleEditCharge(charge.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          className="home-deleteButton"
                          onClick={() => handleShowDeleteModal(charge.id)}
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

        <ToastContainer />
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h2 className="modal-header">Confirmar Exclusão</h2>
              <div className="modal-body">
                Tem certeza de que deseja excluir essa cobrança?
              </div>
              <div className="modal-footer">
                <Button
                  variant="secondary"
                  onClick={handleCloseDeleteModal}
                  className="modal-button-cancel"
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={handleConfirmDelete}
                  className="modal-button-delete"
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
