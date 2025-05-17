import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const { user } = useAuth();
  const { logout } = useAuth();

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/Movies">Movies</Link>
        <Link to="/my-lists">My Lists</Link>

        {user ? (
          <>
            <span>Hello, {user.username}</span>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;