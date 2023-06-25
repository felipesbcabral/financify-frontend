import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const DepositarSaldo = () => {
  const { loginResponse } = useContext(AuthContext);
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const navigate = useNavigate();

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (valor <= 0) {
      toast.error("O valor do depósito deve ser maior que zero.");
      return;
    }

    try {
      const token = loginResponse?.token;
      const accountId = loginResponse?.account?.id;
      const userId = accountId;

      const response = await axios.put(
        `/v1/account/deposit/${userId}`,
        {
          valor,
          metodoPagamento,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setValor("");
      setMetodoPagamento("");
      toast.success("Depósito realizado com sucesso!");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      console.error("Erro ao realizar o depósito:", error);
      toast.error(
        "Erro ao realizar o depósito. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleCancelar = () => {
    navigate("/home");
    setValor("");
    setMetodoPagamento("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                D
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Criar cobrança</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Deposite saldo na sua conta para melhor controle.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Valor:</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Valor do depósito"
                      value={valor}
                      onChange={handleValorChange}
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={handleCancelar}
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
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
                    type="submit"
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Depositar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositarSaldo;
