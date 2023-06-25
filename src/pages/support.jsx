import React from "react";
import { Link } from "react-router-dom";

function SupportPage() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-blueGray-50 py-1 bg-gray-100">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h1 className="text-blueGray-700 text-xl font-bold">Suporte</h1>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <p className="mb-4">
                Se você precisa de ajuda, por favor entre em contato conosco:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <span className="text-blueGray-600 font-bold">E-mail:</span>{" "}
                  financifyCompany@gmail.com
                </li>
                <li>
                  <span className="text-blueGray-600 font-bold">Telefone:</span>{" "}
                  (XX) XXXX-XXXX EM BREVE
                </li>
              </ul>
              <p className="mb-4">
                Nosso horário de atendimento é de segunda a sexta, das 9h às
                18h.
              </p>
              <Link
                to="/home"
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
