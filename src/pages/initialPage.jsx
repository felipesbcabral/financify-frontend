import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/initialPage.css";

function InitialPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="initial-page-container">
      <h1 className="initial-page-heading">Financify - Controle Financeiro</h1>
      <p className="initial-page-text">
        O Financify é seu aplicativo para controle financeiro pessoal, ajudando
        você a gerenciar suas finanças de forma eficaz.
      </p>
      <p className="initial-page-text">Com o Financify, você pode:</p>
      <ul className="initial-page-list">
        <li>Acompanhar seus gastos diários, semanais e mensais</li>
        <li>Categorizar suas despesas para uma melhor compreensão</li>
        <li>Economizar dinheiro e planejar seu orçamento</li>
      </ul>
      <button className="initial-page-button" onClick={handleLoginClick}>
        Acessar o Financify
      </button>
    </div>
  );
}

export default InitialPage;
