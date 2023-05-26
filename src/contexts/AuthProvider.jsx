import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5294/v1/login", {
        Username: email,
        Password: password,
      });
      const { user, token } = response.data;

      setAuthenticated(true);
      setUserId(user.Id);
    } catch (error) {
      // Lidar com erros na chamada ao backend, como exibir uma mensagem de erro
      console.error(error);
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId(null);
  };

  const authContextValue = {
    authenticated,
    userId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
