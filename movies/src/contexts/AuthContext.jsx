import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`, 
      credentials
    );
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
