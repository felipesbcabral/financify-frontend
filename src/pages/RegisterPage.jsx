import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/financify-logo.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CadastroUsuarios = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Novo estado

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = [];

    if (!firstName) {
      newErrors.push("O campo Primeiro Nome é obrigatório!");
    }

    if (!lastName) {
      newErrors.push("O campo Último Nome é obrigatório!");
    }

    if (!email) {
      newErrors.push("O campo Seu Email é obrigatório!");
    }

    if (!password) {
      newErrors.push("O campo Senha é obrigatório!");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/v1/Account",
        {
          FirstName: firstName,
          LastName: lastName,
          Password: password,
          Email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // Reset form and errors
      setFirstName("");
      setLastName("");
      setSenha("");
      setEmail("");
      setErrors([]);
      setErrorMessage(""); // Limpar a mensagem de erro

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data);

        // Definir a mensagem de erro retornada pelo backend
        setErrorMessage(error.response.data);
      } else {
        console.error("Ocorreu um erro ao cadastrar o usuário");

        // Definir uma mensagem de erro genérica
        setErrorMessage("Ocorreu um erro ao cadastrar o usuário");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="mx-auto h-40 w-auto"
            src={logo}
            alt="Financify Logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Criar uma conta
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {errorMessage && (
                <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
              )}
              <div className="relative">
                <label
                  htmlFor="nomeUsuario"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    !firstName && "text-red-500"
                  }`}
                >
                  Primeiro nome
                  {!firstName && (
                    <span className="absolute top-1 right-0 text-red-500">
                      *
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  id="nomeUsuario"
                  className={`bg-gray-50 border ${
                    errors.includes("O campo Primeiro Nome é obrigatório!")
                      ? "border-red-500"
                      : "border-gray-300"
                  } block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm focus:ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Felipe"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="sobrenomeUsuario"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    !lastName && "text-red-500"
                  }`}
                >
                  Último nome
                  {!lastName && (
                    <span className="absolute top-1 right-0 text-red-500">
                      *
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  id="sobrenomeUsuario"
                  className={`bg-gray-50 border ${
                    errors.includes("O campo Último Nome é obrigatório!")
                      ? "border-red-500"
                      : "border-gray-300"
                  } block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm focus:ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Cabral"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    !email && "text-red-500"
                  }`}
                >
                  Seu email
                  {!email && (
                    <span className="absolute top-1 right-0 text-red-500">
                      *
                    </span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.includes("O campo Seu Email é obrigatório!")
                      ? "border-red-500"
                      : "border-gray-300"
                  } block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm focus:ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="senha"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    !password && "text-red-500"
                  }`}
                >
                  Senha
                  {!password && (
                    <span className="absolute top-1 right-0 text-red-500">
                      *
                    </span>
                  )}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="senha"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.includes("O campo Senha é obrigatório!")
                      ? "border-red-500"
                      : "border-gray-300"
                  } block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm focus:ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={password}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-1/2 transform -translate-y-1">
                  <button
                    type="button"
                    className="text-gray-400 focus:outline-none"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    required
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Eu aceito os{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Termos e condições
                    </a>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Registrar
                </button>
              </div>
              <div className="flex items-center justify-center mt-6">
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  Já tem uma conta?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Entrar
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastroUsuarios;
