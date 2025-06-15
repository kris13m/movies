import LoginForm from "../components/LoginForm/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { getCookie } from '../utils/cookies.js';
import { useEffect } from "react";

function HomePage(){
    const {isLoggedIn} = useAuth();

    
useEffect(() => {
  const csrfToken = getCookie('csrf-token');
  console.log('CSRF token from cookie:', csrfToken);
}, []);

    return(
        <>
             
            <h1>welcome to the home page</h1>
            <br></br>
            <p>here's a movie database where you can discover an array of movies</p>
        </>
    )
}

export default HomePage;