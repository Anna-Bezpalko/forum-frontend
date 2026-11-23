import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/baseApi";

interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: "onChange",
    });

    const [loginUser] = useLoginMutation();

    const onSubmit = async (data: LoginFormData) => {
        clearErrors("root");

        try {
            await loginUser(data).unwrap();

            alert("Login successful!");
            reset();
        } catch (error: unknown) {
            let message = "Login failed. Please try again.";

            if (
                typeof error === "object" &&
                error !== null &&
                "status" in error
            ) {
                if (error.status === 401) {
                    message = "Incorrect email or password!";
                } else if (error.status === "FETCH_ERROR") {
                    message = "Network error. Check your connection.";
                } else {
                    message = "Server error. Please try again.";
                }
            }

            setError("root", {
                type: "server",
                message,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email address",
                    },
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    },
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            {errors.root && <p>{errors.root.message}</p>}

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;