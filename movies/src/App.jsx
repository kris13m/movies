import './App.css';
import Navbar from './features/navigation/components/navbar/Navbar';
import { useAuthRedirect } from './features/authentication/hooks/useAuthRedirect';
import Router from './pages/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AuthRedirector() {
  useAuthRedirect();
  return null;
}


function App() {
  return (
    <>
      <Navbar />
      <AuthRedirector />

      <main className="content-container">
        <Router />
      </main>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default App;