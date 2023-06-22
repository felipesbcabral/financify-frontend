import React from "react";
import "../Styles/privacidade.css";

function PrivacySecurity() {
  return (
    <div className="privacy-container">
      <div className="privacy-card">
        <h1>Privacidade e Segurança</h1>
        <p>
          Aqui você pode gerenciar suas configurações de privacidade e
          segurança.
        </p>
        <ul>
          <li>Gerenciar suas senhas</li>
          <li>Ativar autenticação de dois fatores</li>
          <li>Controlar as informações que compartilha com outras pessoas</li>
          <li>Rever as configurações de privacidade de suas postagens</li>
        </ul>
      </div>
    </div>
  );
}

export default PrivacySecurity;
