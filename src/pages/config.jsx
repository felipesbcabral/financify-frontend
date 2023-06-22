import React from "react";
import { FaUser, FaLock, FaRegLifeRing } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/config.css";

function ConfigScreen() {
  return (
    <div className="config-container">
      <div className="config-item">
        <Link to="/dados" className="config-link">
          <FaUser className="config-icon" />
          <p className="config-text">Dados da conta</p>
        </Link>
      </div>
      <div className="config-item">
        <Link to="/privacidade" className="config-link">
          <FaLock className="config-icon" />
          <p className="config-text">Privacidade e segurança</p>
        </Link>
      </div>
      <div className="config-item">
        <Link to="/ajuda" className="config-link">
          <FaRegLifeRing className="config-icon" />
          <p className="config-text">Suporte</p>
        </Link>
      </div>
    </div>
  );
}

export default ConfigScreen;
