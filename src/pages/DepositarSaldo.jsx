import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";
import "../Styles/DepositarSaldo.css";
import "react-toastify/dist/ReactToastify.css";

const DepositarSaldo = () => {
  const { loginResponse } = useContext(AuthContext);
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const navigate = useNavigate();

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleMetodoPagamentoChange = (event) => {
    setMetodoPagamento(event.target.value);
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
      toast.error("Erro ao realizar o depósito. Por favor, tente novamente mais tarde.");
    }
  };

  const handleCancelar = () => {
    navigate("/home");
    setValor("");
    setMetodoPagamento("");
  };

  return (
    <div className="depositar-saldo-container">
      <div className="depositar-saldo-form">
        <h2 className="depositar-saldo-title">Depósito</h2>
        <form onSubmit={handleSubmit}>
          <div className="depositar-saldo-descricao">
            <label
              className="depositar-saldo-label"
              htmlFor="valor"
              style={{ color: "#000" }}
            >
              Valor:
            </label>
            <input
              className="depositar-saldo-inputtext"
              type="text"
              id="valor"
              value={valor}
              onChange={handleValorChange}
            />
          </div>

          <div className="depositar-saldo-descricao">
            <label
              className="depositar-saldo-label"
              htmlFor="metodoPagamento"
              style={{ color: "#000" }}
            >
              Método de Pagamento:
            </label>
            <select
              className="depositar-saldo-select"
              id="metodoPagamento"
              value={metodoPagamento}
              onChange={handleMetodoPagamentoChange}
            >
              <option value="">Selecione um método de pagamento</option>
              <option value="transferenciaBancaria">
                Transferência Bancária
              </option>
              <option value="carteiraDigital">Carteira Digital</option>
            </select>
          </div>
          <div className="depositar-saldo-button-container">
            <button className="depositar-saldo-btn-depositar" type="submit">
              Depositar
            </button>
            <button type="button" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DepositarSaldo;
