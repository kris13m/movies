/*import { useState } from "react";
import Axios from 'axios';
import { useAuth } from "../../../../contexts/AuthContext";
import { useForm} from "react-hook-form";
import './LoginForm.css';
import { Link } from "react-router-dom";



function LoginForm(){
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm();
     const { login } = useAuth();

    const onSubmit = async(data) => {
        await login(data);
    };

    return(
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username:</label>
                <input 
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                        value: 6,
                        message: "Username must be at least 6 characters long"
                        },
                        maxLength: {
                        value: 20,
                        message: "Username must be less than 20 characters long"
                        },
                        pattern: {
                        value: /^[A-Za-z0-9_-]+$/,
                        message: "Username must only contain letters a-z, numbers, - and _"
                        }
                    })}
                    type="text"
                />
                <p className="error">
                  
                </p>
                <label>Password:</label>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                        },
                        maxLength: {
                        value: 20,
                        message: "Password must be less than 20 characters long"
                        },
                        pattern: {
                        value: /^[A-Za-z0-9_!\-]+$/,
                        message: "Password must only contain letters a-z, numbers, or characters - _ !"
                        }
                    })}
                    type="password"
                />
                <p className="error">
                    {errors.password?.message || "\u00A0"}
                </p>
                <button type="submit" disabled={isSubmitting} className="login-btn">Login</button>
            </form>
            <p>Don't have an account? <Link to="/Register">Create Account</Link></p>
        </div>
    );
}

export default LoginForm;
*/

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import './LoginForm.css';

// --- 1. Import the new hook instead of useAuth ---
import { useLogin } from '../../hooks/useLogin'; 
import Button from "../../../../components/ui/Button/Button"; // Using our shared button

function LoginForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    
    // --- 2. Use the new hook to get the login function and its state ---
    const { login, isLoading, error: serverError } = useLogin();

    // The onSubmit function is now even simpler
    const onSubmit = async (data) => {
        try {
            await login(data);
        } catch (err) {
            // react-hook-form can catch the error if the hook re-throws it
            console.error("Login failed on the component level");
        }
    };

    return(
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username:</label>
                <input {...register("username", { /* ...your validation rules... */ })} type="text" />
                <p className="error">{errors.username?.message || "\u00A0"}</p>
                
                <label>Password:</label>
                <input {...register("password", { /* ...your validation rules... */ })} type="password" />
                <p className="error">{errors.password?.message || "\u00A0"}</p>
                
                {/* --- 3. Display the server error from our hook --- */}
                {serverError && <p className="error server-error">{serverError}</p>}
                
                {/* --- 4. Use our shared Button and combine loading states --- */}
                <Button type="submit" disabled={isSubmitting || isLoading} className="login-btn">
                    {isLoading ? 'Logging in' : 'Login'}
                </Button>
            </form>
            <p>Don't have an account? <Link to="/Register">Create Account</Link></p>
        </div>
    );
}

export default LoginForm;