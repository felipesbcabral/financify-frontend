import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal } from "react-bootstrap";
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
  const [successMessageShown, setSuccessMessageShown] = useState(false); // Novo estado
  const location = useLocation();

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const token = authContext.loginResponse?.token;
        const accountId = authContext.loginResponse?.account?.id;

        const response = await axios.get(`/charge/accounts/${accountId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBillingData(response.data);
      } catch (error) {
        console.error("Erro ao obter as cobranças:", error);
      }
    };

    fetchBillingData();
  }, [authContext.loginResponse]);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
      navigate("/home"); // Navega para a página inicial sem o estado da localização
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
      await axios.delete(`/charge/${selectedChargeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedBillingData = billingData.filter(
        (charge) => charge.id !== selectedChargeId
      );
      setBillingData(updatedBillingData);
      toast.success("Cobrança excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cobrança:", error);
    } finally {
      setShowDeleteModal(false);
    }
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

  const renderDeleteModal = () => {
    return (
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir essa cobrança?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="home-container">
      <div className="home-action-container">
        <NavLink to="/New">
          <Button variant="primary" className="home-addButton">
            Criar Cobrança
          </Button>
        </NavLink>
        <div className="home-datePickerContainer">
          <span>Período:</span>
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
      <div className="home-dashboard-table-container">
        <div className="home-table-responsive">
          <Table striped bordered hover className="home-table billing-table">
            <thead>
              <tr>
                <th>Nome</th>
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
                  <td>{charge.name}</td>
                  <td>{charge.description}</td>
                  <td>{formatDate(charge.dueDate)}</td>
                  <td>{charge.value}</td>
                  <td>{charge.status}</td>
                  <td>{formatDate(charge.createdAt)}</td>
                  <td>{formatDate(charge.updatedAt)}</td>
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
      <ToastContainer />
      {renderDeleteModal()}
    </div>
  );
};

export default Home;
