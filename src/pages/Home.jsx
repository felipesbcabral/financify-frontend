import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", options);
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

  useEffect(() => {
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

  const handleDateRangeChange = (range) => {
    setStartDate(range[0]);
    setEndDate(range[1]);
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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                trokelinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">R$11,257</p>
            <p>Quantidade economizada</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                trokelinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="text-right">
            <p className="text-2xl">R${balance}</p>
            <p>Saldo</p>
          </div>
        </div>
      </div>
      <div className="">
        <table className="w-full mt-8">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Descrição
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Vencimento
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Valor
              </th>
              <th
                className={`p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell ${
                  window.innerWidth >= 1020 ? "border-l border-r" : ""
                }`}
              >
                Status
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((charge) => (
              <tr
                key={charge.id}
                className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Descrição
                  </span>
                  {charge.description}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Vencimento
                  </span>
                  {formatDate(charge.dueDate)}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Valor
                  </span>
                  {charge.value}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Status
                  </span>
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                      charge.status === "Expirado"
                        ? "bg-red-50 text-red-600"
                        : charge.status === "Pendente"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        charge.status === "Expirado"
                          ? "bg-red-600"
                          : charge.status === "Pendente"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                      }`}
                    ></span>
                    {charge.status}
                  </span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Ações
                  </span>
                  <div className="flex justify-center items-center">
                    <a
                      className="action-link"
                      href="#"
                      onClick={() => handleShowDeleteModal(charge.id)}
                      x-data="{ tooltip: 'Delete' }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>
                    <a
                      className="action-link"
                      href="#"
                      onClick={() => handleEditCharge(charge.id)}
                      x-data="{ tooltip: 'Edite' }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="modal-container bg-white p-6 rounded-lg relative">
              <h2 className="modal-header text-lg font-bold mb-4">
                Confirmar Exclusão
              </h2>
              <div className="modal-body mb-4">
                Tem certeza de que deseja excluir essa cobrança?
              </div>
              <div className="modal-footer flex justify-end">
                <button
                  onClick={handleCloseDeleteModal}
                  className="modal-button-cancel mr-2 py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="modal-button-delete py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
