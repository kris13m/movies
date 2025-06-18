

import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

import { useLogout } from '../../../authentication/hooks/useLogout';
import Button from '../../../../components/ui/Button/Button';
import './NavBar.css'; 

function NavBar() {

  const { user } = useAuth();
 
  const { logout, isLoading } = useLogout();

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-links-left">
          <Link to="/">Home</Link>
          <Link to="/Movies">Movies</Link>
         
          {user && <Link to="/my-lists">My Lists</Link>}
        </div>

        <div className="navbar-links-right">
          {user ? (
            <>
              <span className="navbar-user-greeting">Hello, {user.username}</span>
              
              <Button 
                onClick={logout} 
                disabled={isLoading}
                className="navbar-logout-btn"
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;







/*import { useAuth } from "../../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const { user, logout } = useAuth();

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
*/