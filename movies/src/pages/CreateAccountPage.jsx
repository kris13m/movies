import CreateAccount from "../components/CreateAccount";
import { useAuth } from "../contexts/AuthContext";
import Logout from "../components/Logout";

function CreateAccountPage() {
    const { isLoggedIn } = useAuth();
    const x = false

    return (
        <>
            {!isLoggedIn ? (
                <>
                    <p>new here?</p>
                    <h3>create account</h3>
                    <CreateAccount />
                </>
            ) : (
                <Logout />
            )}
        </>
    );
}

export default CreateAccountPage;