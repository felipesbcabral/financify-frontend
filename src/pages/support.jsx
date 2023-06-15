import React from "react";
import { Link } from "react-router-dom";

function SupportPage() {
  return (
    <div>
      <h1>Suporte</h1>
      <p>Se você precisa de ajuda, por favor entre em contato conosco:</p>
      <ul>
        <li>E-mail: suporte@meusite.com</li>
        <li>Telefone: (XX) XXXX-XXXX</li>
      </ul>
      <p>Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.</p>
      <Link to="/home">Voltar para a página inicial</Link>
    </div>
  );
}

export default SupportPage;
