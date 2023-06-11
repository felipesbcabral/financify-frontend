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

      // Armazene o token JWT no local storage ou em um cookie
      localStorage.setItem("token", token);

      setAuthenticated(true);
      setUserId(account.Id);
      setError(null);
      setLoginResponse(response.data); // Atualize o objeto de resposta do login
    } catch (error) {
      setError("Erro ao efetuar login");
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
