import React from "react";
import { Link } from "react-router-dom";
import "../Styles/support.css";

function SupportPage() {
  return (
    <div className="support-container">
      <div className="support-card">
        <h1>Suporte</h1>
        <p>Se você precisa de ajuda, por favor entre em contato conosco:</p>
        <ul>
          <li><span className="support-label">E-mail:</span> financifyCompany@gmail.com</li>
          <li><span className="support-label">Telefone:</span> (XX) XXXX-XXXX EM BREVE</li>
        </ul>
        <p>Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.</p>
        <Link to="/home">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}

export default SupportPage;
