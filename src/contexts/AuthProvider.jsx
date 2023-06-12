import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null); // Adicione esta linha

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5294/v1/login", {
        Email: email,
        Password: password,
      });
  
      const { account, token } = response.data;
      localStorage.setItem("token", token);
  
      setAuthenticated(true);
      setUserId(account.Id);
      setError(null);
      setLoginResponse(response.data);
    } catch (error) {
      setError(error.response.data.message); // Definir o erro da resposta do servidor como mensagem de erro
      throw error; // Lançar o erro para ser capturado no front-end
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId(null);
    setError(null);
    setLoginResponse(null); // Adicione esta linha para limpar o objeto de resposta do login
  };

  const authContextValue = {
    authenticated,
    userId,
    login,
    logout,
    error,
    loginResponse, // Adicione esta linha para disponibilizar o objeto de resposta do login
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
