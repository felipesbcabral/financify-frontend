import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import "../Styles/DepositarSaldo.css";

const DepositarSaldo = () => {
  const { loginResponse } = useContext(AuthContext); // Obter o loginResponse do contexto
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleMetodoPagamentoChange = (event) => {
    setMetodoPagamento(event.target.value);
  };

  const handleNumeroCartaoChange = (event) => {
    setNumeroCartao(event.target.value);
  };

  const handleDataValidadeChange = (event) => {
    setDataValidade(event.target.value);
  };

  const handleCodigoSegurancaChange = (event) => {
    setCodigoSeguranca(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (valor <= 0) {
      setMensagem("O valor do depósito deve ser maior que zero.");
      return;
    }

    try {
      const userId = loginResponse?.id; // Obter o ID do usuário do loginResponse
      console.log("Depósito realizado com sucesso:", loginResponse.id);
      const response = await axios.put(`/v1/account/deposit/${userId}`, {
        valor,
        metodoPagamento,
        numeroCartao,
        dataValidade,
        codigoSeguranca,
        senha,
      });

      console.log("Depósito realizado com sucesso:", response.data);

      setValor("");
      setMetodoPagamento("");
      setNumeroCartao("");
      setDataValidade("");
      setCodigoSeguranca("");
      setSenha("");
      setMensagem("Depósito realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar o depósito:", error);
      setMensagem(
        "Erro ao realizar o depósito. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleCancelar = () => {
    setValor("");
    setMetodoPagamento("");
    setNumeroCartao("");
    setDataValidade("");
    setCodigoSeguranca("");
    setSenha("");
    setMensagem("");
  };

  return (
    <div className="depositar-saldo-container">
      <div className="depositar-saldo-form">
        <h2 className="depositar-saldo-title">Depósito</h2>
        {mensagem && <p>{mensagem}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="valor" className="depositar-saldo-label">
            Valor:
          </label>
          <input
            type="text"
            id="valor"
            value={valor}
            onChange={handleValorChange}
            className="depositar-saldo-inputtext"
          />

          <label htmlFor="metodoPagamento" className="depositar-saldo-label">
            Método de Pagamento:
          </label>
          <select
            id="metodoPagamento"
            value={metodoPagamento}
            onChange={handleMetodoPagamentoChange}
            className="depositar-saldo-select"
          >
            <option value="">Selecione um método de pagamento</option>
            <option value="cartaoCredito">Cartão de Crédito</option>
            <option value="transferenciaBancaria">Transferência Bancária</option>
            <option value="carteiraDigital">Carteira Digital</option>
          </select>

          {metodoPagamento === "cartaoCredito" && (
            <>
              <label htmlFor="numeroCartao" className="depositar-saldo-label">
                Número do Cartão:
              </label>
              <input
                type="text"
                id="numeroCartao"
                value={numeroCartao}
                onChange={handleNumeroCartaoChange}
                className="depositar-saldo-inputtext"
              />

              <label htmlFor="dataValidade" className="depositar-saldo-label">
                Data de Validade:
              </label>
              <input
                type="text"
                id="dataValidade"
                value={dataValidade}
                onChange={handleDataValidadeChange}
                className="depositar-saldo-inputtext"
              />

              <label htmlFor="codigoSeguranca" className="depositar-saldo-label">
                Código de Segurança:
              </label>
              <input
                type="text"
                id="codigoSeguranca"
                value={codigoSeguranca}
                onChange={handleCodigoSegurancaChange}
                className="depositar-saldo-inputtext"
              />
            </>
          )}

          <label htmlFor="senha" className="depositar-saldo-label">
            Senha:
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={handleSenhaChange}
            className="depositar-saldo-inputtext"
          />

          <div className="depositar-saldo-button-container">
            <button type="submit" className="depositar-saldo-btn-depositar">
              Depositar
            </button>
            <button type="button" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositarSaldo;
