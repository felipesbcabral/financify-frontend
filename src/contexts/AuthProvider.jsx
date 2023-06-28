import React, { useState, useContext } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/v1/login", {
        Email: email,
        Password: password,
      });

      const { account, token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthenticated(true);
      setUserId(account.Id);
      setError(null);
      setLoginResponse(response.data);
    } catch (error) {
      setError(error.response.data.message);
      throw error;
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId(null);
    setError(null);
    setLoginResponse(null);
  };

  const getCharge = async (chargeId) => {
    try {
      const response = await axios.get(`/charges/${chargeId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching charge:", error);
      throw error;
    }
  };

  const updateCharge = async (chargeId, updatedCharge) => {
    try {
      const response = await axios.put(`/charges/${chargeId}`, updatedCharge);
      return response.data;
    } catch (error) {
      console.error("Error updating charge:", error);
      throw error;
    }
  };

  const authContextValue = {
    authenticated,
    userId,
    login,
    logout,
    error,
    loginResponse,
    getCharge,
    updateCharge,
    setLoginResponse,
    setUserId
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};