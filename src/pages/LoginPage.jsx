import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/financify-logo.jpg";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setError("Email e senha são obrigatórios.");
      return;
    }
    try {
      await authContext.login(email, password);
      onLogin(event);
      console.log("Login bem-sucedido!");
      toast.success("Login bem-sucedido!");
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Email ou senha estão incorretos.");
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-40 w-auto" src={logo} alt="Financify Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Entrar na conta
        </h2>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-6 bg-white rounded-lg shadow dark:border dark:border-gray-700 mx-auto max-w-screen-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="email@example.com"
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm focus:ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Senha
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot"
                  className="font-semibold text-primary-600 hover:text-primary-500"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                placeholder="senha"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-10 text-gray-900 ring-inset dark:border-gray-600 focus:ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
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
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          <Link
            to="/register"
            className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
          >
            Criar uma nova conta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
