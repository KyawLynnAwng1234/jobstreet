import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

// Custom Hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const value = {
    userEmail,
    setUserEmail,
    loading,
    setLoading,
    message,
    setMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};