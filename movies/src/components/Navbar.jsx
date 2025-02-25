import { useAuth } from "../contexts/AuthContext";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

function Navbar()
{
    const {isLoggedIn, authUser} = useAuth();
    

    return(
        
        !isLoggedIn ?
        <nav>
                <Link to="/">Home</Link> | <Link to="/Create">account</Link>
        </nav>

        :<nav>
                <Link to="/">Home</Link> | <Link to="/list">Popular now</Link> | <Link to="/Create">account</Link>
        </nav>
        
    )
}

export default Navbar;