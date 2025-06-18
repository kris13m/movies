import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: setAuthUser } = useAuth(); // Registering also logs the user in
  const navigate = useNavigate();

  const register = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        credentials,
        { withCredentials: true }
      );
      setAuthUser(response.data.user);
    //  navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}