import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

function HomePage(){
    const {isLoggedIn} = useAuth();

    return(
        <>
            <h1>welcome to the home page</h1>
            <p>here's a movie database where you can discover new and trending movies</p>

            {!isLoggedIn && <LoginForm />}
        </>
    )
}

export default HomePage;