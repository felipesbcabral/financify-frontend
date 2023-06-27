import React from "react";
import { useNavigate } from "react-router-dom";

function InitialPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
      <div className="dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border dark:border-gray-700 max-w-screen-md">
        <div className="py-8 px-4 mx-auto sm:py-16 lg:px-6">
          <div className="text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight dark:text-white">
              Financify - Controle Financeiro
            </h2>
            <p className="mb-6 font-light dark:text-white md:text-lg">
              O Financify é seu aplicativo para controle financeiro pessoal,
              ajudando você a gerenciar suas finanças de forma eficaz.
            </p>
            <p className="mb-6 font-light dark:text-white md:text-lg">
              Com o Financify, você pode:
            </p>
            <ul className="list-disc mb-6 dark:text-white list-inside inline-block">
              <li>Acompanhar seus gastos diários, semanais e mensais</li>
              <li>Categorizar suas despesas para uma melhor compreensão</li>
              <li>Economizar dinheiro e planejar seu orçamento</li>
            </ul>
          </div>
          <div className="text-center">
            <div
              className="b relative mx-auto h-16 w-64 flex justify-center items-center"
              onClick={handleLoginClick}
            >
              <div className="i h-16 w-64 bg-primary-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
              <a className="text-center text-white dark:text-white font-semibold z-10 pointer-events-none">
                Acessar o Financify
              </a>
              <span className="absolute flex h-6 w-6 top-0 right-0 transform translate-x-2.5 -translate-y-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="absolute inline-flex rounded-full h-6 w-6 bg-primary-500"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialPage;
