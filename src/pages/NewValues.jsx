import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthProvider";

const NewValues = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCancel = (event) => {
    navigate("/home");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description) {
      toast.warning("Os campos obrigatórios não foram preenchidos.");
      return;
    }

    const newChargeRequest = {
      name,
      description,
      dueDate,
      value: parseFloat(value),
      status,
    };

    try {
      authContext.loginResponse?.token;

      const response = await axios.post(
        `/charge/accounts/${authContext.loginResponse?.account?.id}`,
        newChargeRequest
      );
      console.log("Cobrança criada com sucesso:", response.data);

      setTimeout(() => {
        toast.success("Cobrança criada com sucesso.");
      }, 1000);

      navigate("/");
    } catch (error) {
      console.error("Erro ao criar a cobrança:", error);
      toast.error("Erro ao criar a cobrança.");
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                C
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Criar cobrança</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Crie sua cobrança para controlar melhor seu dinheiro
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col mb-4">
                  <label className="leading-loose">Titulo:</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Titulo da cobrança"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="leading-loose">Descrição:</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Descrição da cobrança"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Data de vencimento:</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="date"
                        className="pr-4 pl-6 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="25/02/2020"
                        value={dueDate}
                        onChange={handleDueDateChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="leading-loose">Valor:</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Valor da cobrança"
                    value={value}
                    onChange={handleValueChange}
                  />
                </div>
                <div className="new-values-status mb-4">
                  <label
                    className="new-values-label"
                    htmlFor="status"
                    style={{ color: "#000" }}
                  >
                    Status:
                  </label>
                  <select
                    className="new-values-select px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="">Selecione</option>
                    <option value="Pago">Pago</option>
                    <option value="Expirado">Expirado</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                  onClick={handleCancel}
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>{" "}
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  onClick={handleSubmit}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewValues;
