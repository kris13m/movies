import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: setAuthUser } = useAuth(); 
  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials,
        { withCredentials: true }
      );
      setAuthUser(response.data.user); 
    } catch (err) {
   
      setError(err.response?.data?.message || "Invalid username or password.");
   
      throw err; 
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}