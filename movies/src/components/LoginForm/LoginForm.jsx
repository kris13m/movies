import { useState } from "react";
import Axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import { useForm} from "react-hook-form";
import './LoginForm.css';


function LoginForm(){
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm();

    const onSubmit = async(data) => {
        const response = await Axios.post("http://localhost:3000/api/users/login", data);
        return response.data;

        reset();
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
                    {errors.username?.message || "\u00A0" /* non-breaking space */}
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
            <p>Don't have an account? <a href="/create-account">Create Account</a></p>
        </div>
    );
}

export default LoginForm;
