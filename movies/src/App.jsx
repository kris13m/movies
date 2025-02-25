import { useState, useEffect, useContext } from 'react';
import './App.css'
import MovieList from './components/movieList'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';

//import AuthContext from './contexts/AuthContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CreateAccountPage from './pages/CreateAccountPage';



function App() {
  const [value, setValue] = useState('initial value');
  
  return (
      <AuthProvider>
        <BrowserRouter>
            <Navbar></Navbar>

            
            <Routes>
                <Route path = "/create" element = {<CreateAccountPage></CreateAccountPage>}></Route>
                <Route path = "/" element = {<HomePage></HomePage>}></Route>
                <Route path = "/list" element = {<MovieList></MovieList>}></Route>
            </Routes>

       </BrowserRouter>
      </AuthProvider>
  );
}



export default App;