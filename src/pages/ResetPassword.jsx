import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getTokenFromQueryString = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get("token");
  };

  useEffect(() => {
    const token = getTokenFromQueryString();
    if (!token) {
      navigate("/*");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword === "") {
      toast.warning("Por favor, preencha o campo de nova senha.");
      return;
    }

    setLoading(true);

    try {
      const token = getTokenFromQueryString();
      await axios.post(`/v1/Account/reset-password`, {
        token: token,
        newPassword: newPassword,
      });

      setTimeout(() => {
        toast.success("Cobrança criada com sucesso.");
      }, 1000);
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      toast.error(
        "Ocorreu um erro ao redefinir a senha. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24">
      <div className="border-2 bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 space-y-6 antialiased">
        <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
          <h1 className="mb-5 text-3xl font-bold text-center">Não se preocupe</h1>
          <p className="text-center mx-12 font-bold text-lg text-gray-800">
            Por favor, insira sua nova senha abaixo para atualizá-la:
          </p>
          <form action="#" className="space-y-6 w-ful" onSubmit={handleSubmit}>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
              name="Password"
              type="password"
              id="newPassword"
              placeholder="Nova senha"
              required=""
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Redefinir Senha"}
              </button>
            </div>
          </form>
          <div className="text-sm text-gray-600 items-center flex justify-between">
            <a
              href="/login"
              className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Voltar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
