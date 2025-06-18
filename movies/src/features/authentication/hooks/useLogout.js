import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout: clearAuthUser } = useAuth();

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { 
        withCredentials: true 
      });
    } catch (err) {
     
      console.error("Logout API call failed, but logging out client-side anyway.", err);
    } finally {
    
      clearAuthUser();
      setIsLoading(false);
      
    }
  };

  return { logout, isLoading };
}