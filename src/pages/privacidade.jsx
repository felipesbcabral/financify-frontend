import React from "react";
import { Link } from "react-router-dom";

function PrivacySecurity() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-blueGray-50 py-1 bg-gray-100">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h1 className="text-blueGray-700 text-xl font-bold">
                  Privacidade e Segurança
                </h1>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <p className="mb-4">
                Aqui você pode gerenciar suas configurações de privacidade e
                segurança.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Gerenciar suas senhas</li>
                <li>Ativar autenticação de dois fatores</li>
                <li>
                  Controlar as informações que compartilha com outras pessoas
                </li>
                <li>Rever as configurações de privacidade de suas postagens</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacySecurity;
