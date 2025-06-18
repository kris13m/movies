import './App.css';
import Navbar from './features/navigation/components/navbar/Navbar';
import Router from './pages/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthRedirect } from './features/authentication/hooks/useAuthRedirect';



function AuthRedirector() {
  useAuthRedirect();
  return null; 
}

function App() {
  return (
    <>
      <Navbar />
     
      <AuthRedirector />
      <Router />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

