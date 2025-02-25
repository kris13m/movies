import { useState } from "react";
import Axios from 'axios';
import { useAuth } from "../contexts/AuthContext";



function LoginForm() {
    const [input, setInput] = useState({ username: '', password: '' });
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();

    // Handle form input updates
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleUserInput = async (e) => {
        e.preventDefault();

        // Validate input
        if (!input.username || !input.password) {
            alert("Please provide a valid input");
            return;
        }

        try {
            Axios.post("http://localhost:3000/api/users/login", input)
            .then((response) => {
                console.log("Login successful:", response.data); // Logs the server response
                const { AuthoToken, user } = response.data;
               localStorage.setItem("AuthoToken",AuthoToken);
               setAuthUser(user);
               setIsLoggedIn(true);

                alert(user.username +" logged in succesfully")

               
             })
            .catch((error) => {
        if (error.response) {
            console.error("Login failed:", error.response.data); // Logs server error
        } else if (error.request) {
            console.error("No response received from server:", error.request);
        } else {
            console.error("Error during request setup:", error.message);
        }
    });
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleUserInput}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default LoginForm;