import { useState} from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './pages/Router';



const queryClient = new QueryClient();

function App() {
  const [value, setValue] = useState('initial value');
  
  return (
        <QueryClientProvider client={queryClient}>
            <Navbar/>
            <Router/>
        </QueryClientProvider>
  );
}


export default App;