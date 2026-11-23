import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../api/baseApi";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: "onChange",
    });

    const [registerUser] = useRegisterMutation();

    const onSubmit = async (data: RegisterFormData) => {
        clearErrors("root");

        try {
            await registerUser(data).unwrap();

            alert("Registration successful!");
            reset();
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "status" in error &&
                error.status === 409
            ) {
                setError("root", {
                    type: "server",
                    message: "This email is already registered!",
                });
            } else {
                setError("root", {
                    type: "server",
                    message: "Registration failed. Please try again.",
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Registration</h2>

            <input
                placeholder="Name"
                {...register("name", {
                    required: "Name is required",
                })}
            />

            <input
                placeholder="Email"
                type="email"
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
                placeholder="Password"
                type="password"
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

            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;