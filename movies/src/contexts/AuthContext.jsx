import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/session`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchUser();
  }, []);


  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

 
  const value = { user, login, logout, isLoadingSession: isLoading };

 
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


/*import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`, 
    credentials,
    { withCredentials: true } // <--- send & receive cookies
  );
  
  // No token in response.body, only user info
  const { user } = response.data;
  setUser(user);
  navigate("/home");
};


useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/session`, {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  fetchUser();
}, []);

  const logout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout error", err);
  }
  setUser(null);
  navigate("/Home");
};

  const register = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    credentials,
    { withCredentials: true } 
  );
  
  const { user } = response.data;
  setUser(user);
  navigate("/home");
};

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

*/