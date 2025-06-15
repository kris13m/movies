import { useState} from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './pages/Router';




function App() {
 // const [value, setValue] = useState('initial value');
  
  return (
        <>
            <Navbar/>
            <Router/>
        </>
       
  );
}


export default App;