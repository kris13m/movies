import LoginForm from "../features/authentication/components/LoginForm/LoginForm.jsx";
import { useAuth } from "../contexts/AuthContext";
import { getCookie } from '../utils/cookies.js';
import { useEffect } from "react";

function HomePage(){
    const {isLoggedIn} = useAuth();

    


    return(
        <>
            <h1>welcome to the home page</h1>
            <br></br>
            <p>here's a movie database where you can discover an array of movies</p>
        </>
    )
}

export default HomePage;