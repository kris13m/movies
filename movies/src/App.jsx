import { useState, useEffect, useContext } from 'react';
import './App.css'
import MovieList from './components/movieList'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import CreateAccountPage from './pages/CreateAccountPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import MovieList2 from './components/MovieList2';

const queryClient = new QueryClient();

function App() {
  const [value, setValue] = useState('initial value');
  
  return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar></Navbar>
            <MovieList2></MovieList2>
              <Routes>
                <Route path = "/create" element = {<CreateAccountPage></CreateAccountPage>}></Route>
                <Route path = "/" element = {<HomePage></HomePage>}></Route>
                <Route path = "/list" element = {<MovieList></MovieList>}></Route>
              </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
  );
}


export default App;