import { useState, useEffect, useContext } from 'react';
import './App.css'
import MovieList from './components/movieList'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieCard from './components/movieCard';

//import AuthContext from './contexts/AuthContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CreateAccountPage from './pages/CreateAccountPage';

const queryClient = new QueryClient();

function App() {
  const [value, setValue] = useState('initial value');
  
  return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar></Navbar>
            <MovieCard></MovieCard>
              <Routes>
                <Route path = "/create" element = {<CreateAccountPage></CreateAccountPage>}></Route>
                <Route path = "/" element = {<HomePage></HomePage>}></Route>
                <Route path = "/list" element = {<MovieList></MovieList>}></Route>
              </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
  );
}



export default App;