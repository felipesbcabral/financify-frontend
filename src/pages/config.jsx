import React from "react";
import { FaUser, FaLock, FaRegLifeRing } from "react-icons/fa";
import { Link } from "react-router-dom";

function ConfigScreen() {
  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      <div className="text-center">
        <div className="mb-8">
          <Link to="/dados" className="config-link flex flex-row items-center">
            <FaUser className="config-icon text-5xl mr-4" />
            <p className="config-text text-2xl">Dados da conta</p>
          </Link>
        </div>
        <div className="mb-8">
          <Link to="/privacidade" className="config-link flex flex-row items-center">
            <FaLock className="config-icon text-5xl mr-4" />
            <p className="config-text text-2xl">Privacidade e segurança</p>
          </Link>
        </div>
        <div>
          <Link to="/ajuda" className="config-link flex flex-row items-center">
            <FaRegLifeRing className="config-icon text-5xl mr-4" />
            <p className="config-text text-2xl">Suporte</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfigScreen;
