import { useAuth } from "../contexts/AuthContext";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className = "navbar">
      <Link to="/">Home</Link> 
      {isLoggedIn ? (
        <>
          {" | "}
          <Link to="/list">Popular now</Link>
        </>
      ) : null}
      {" | "}
      <Link to="/Create">Account</Link>
    </nav>
  );
}

export default Navbar;