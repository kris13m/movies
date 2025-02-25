import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setIsLoggedIn, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const log = () => {
        setAuthUser(null);
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <button onClick={log}>Log out</button>
    );
}

export default Logout;