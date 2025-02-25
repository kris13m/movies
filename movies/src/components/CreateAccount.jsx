import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {setAuthUser, setIsLoggedIn} = useAuth();

    const navigate = useNavigate();


    const inputValidation = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            console.log("Error: Password must be at least 6 characters long.");
          alert("username must belonger than 6")
            return;
        }

        if (password !== confirmPassword) {
            console.log("Error: Passwords do not match.");
            alert("password must match confirmation")
            return;
        }

        try {
            const response = await Axios.post("http://localhost:3000/api/users/register", {
                username,
                password
            });
            console.log("Account created:", response.data);
            const {user} = response.data;
            
            setAuthUser({user});
            setIsLoggedIn(true);
            navigate("/");
            alert("account created succesfully")
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    return (
        <>
            <form onSubmit={inputValidation}>
                <label htmlFor="user">Username: </label>
                <input
                    type="text"
                    placeholder="username"
                    id="user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="pwd">Password: </label>
                <input
                    type="password"
                    id="pwd"
                    name="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="pwd2">Confirm Password: </label>
                <input
                    type="password"
                    id="pwd2"
                    name="pwd2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <input type="submit" value="Create Account" />
            </form>
        </>
    );
}

export default CreateAccount;