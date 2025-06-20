import React from 'react';
import { useForm } from "react-hook-form";
import "./RegisterForm.css";

// --- HOOKS & COMPONENTS ---
// Import the custom hook for registration logic
import { useRegister } from '../../hooks/useRegister'; 
// Import your shared, reusable Button component
import Button from "../../../../components/ui/Button/Button";

function RegisterForm() {
    // --- FORM STATE MANAGEMENT (react-hook-form) ---
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        reset, 
        getValues 
    } = useForm();
    
    const { register: registerUser, isLoading, error: serverError } = useRegister();

    // --- FORM SUBMISSION HANDLER ---
    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            reset();
        } catch (err) {
         
            console.error("Registration failed at the component level:", err);
        }
    };


    return(
        <div className="register-form">
            <h2>Register</h2>
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
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]+$/,
                            message: "Must include upper/lower case, a number, and only use letters, numbers, -, _"
                        }
                    })}
                    type="password"
                />
                <p className="error">
                    {errors.password?.message || "\u00A0"}
                </p>

                <label>Confirm:</label>
                <input
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === getValues("password") || "Passwords do not match"
                    })}
                    type="password"
                />
                <p className="error">
                    {errors.confirmPassword?.message || "\u00A0"}
                </p>

                
                {typeof serverError === 'string' && serverError.length > 0 && (
                    <p className="error server-error">{serverError}</p>
                )}

                <Button 
                    type="submit" 
                    disabled={isSubmitting || isLoading} 
                    className="register-btn"
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;

/*import { useForm } from "react-hook-form";
import "./RegisterForm.css";

import { useAuth } from "../../../../contexts/AuthContext";



function RegisterForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm();
    const { register: registerUser } = useAuth();

    const onSubmit = async(data) => {
        
        
        await registerUser(data);
        reset();
    };

    return(
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit ={handleSubmit(onSubmit)}>
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
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]+$/,
                        message: "must include both upper- and lower case letter, one number, and only use letters, numbers, - and _"
                    }
                    })}
                    type="password"
                />
                <p className="error">
                    {errors.password?.message || "\u00A0"}
                </p>
                <label>Confirm:</label>
                <input
                    {...register("confirmPassword", {
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
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]+$/,
                        message: "must include both upper- and lower case letter, one number, and only use letters, numbers, - and _"
                    },
                        validate: (value) => value === getValues("password") || "Passwords do not match"
                    })}
                    type="password"
                />
                <p className="error">
                    {errors.confirmPassword?.message || "\u00A0"}
                </p>
                <button type="submit" disabled={isSubmitting} className="register-btn">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm;
*/