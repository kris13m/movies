import { useAuth } from "../contexts/AuthContext";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="navbar-container">
        <nav className = "navbar">
          <Link to="/">Home</Link> 
          <Link to="/Movies">Movies</Link>
          <Link to="/Create">Account</Link>
          <Link to="/login">Login</Link>
        </nav>
    </div>
  );
}

export default Navbar;