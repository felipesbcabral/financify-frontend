import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5294/v1/login", {
        Email: email,
        Password: password,
      });
      const { account, token } = response.data;

      setAuthenticated(true);
      setUserId(account.Id);
      setError(null);
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 400) {
          setError(error.response.data);
        } else {
          setError(error.response.data.message);
        }
      } else {
        setError("Ocorreu um erro ao realizar o login");
      }
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId(null);
    setError(null);
  };

  const updateCharge = async (chargeId, updatedCharge) => {
    try {
      const response = await axios.put(
        `http://localhost:5294/v1/charge/${chargeId}`,
        updatedCharge
      );
      // Lógica adicional após a atualização da cobrança (charge), se necessário...

      setError(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Ocorreu um erro ao atualizar a cobrança");
      }
    }
  };

  const authContextValue = {
    authenticated,
    userId,
    login,
    logout,
    updateCharge,
    error,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
