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

