import LoginForm from "../components/LoginForm/LoginForm";
import { useAuth } from "../contexts/AuthContext";

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