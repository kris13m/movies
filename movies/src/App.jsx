import { useState, useEffect, useContext } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './pages/Router';

import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  const [value, setValue] = useState('initial value');
  
  return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <Navbar/>
            <Router/>
        </QueryClientProvider>
      </AuthProvider>
  );
}


export default App;