import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';


export function useAuthRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/home');
    }
  }, [user, navigate, location.pathname]); 
}