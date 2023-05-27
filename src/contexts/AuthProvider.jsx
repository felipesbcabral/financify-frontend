import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null); // Adicionado estado para armazenar o erro

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5294/v1/login", {
        Username: email,
        Password: password,
      });
      const { user, token } = response.data;

      setAuthenticated(true);
      setUserId(user.Id);
      setError(null); // Limpa o erro caso ocorra um login bem-sucedido
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Usuário ou senha inválidos"); // Define a mensagem de erro personalizada
      } else {
        setError("Ocorreu um erro ao realizar o login"); // Define uma mensagem de erro genérica
      }
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId(null);
    setError(null); // Limpa o erro ao fazer logout
  };

  const authContextValue = {
    authenticated,
    userId,
    login,
    logout,
    error, // Adiciona o estado de erro ao contexto
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
