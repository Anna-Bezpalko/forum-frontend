import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../api/baseApi";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

function RegisterForm() {
    const { register, handleSubmit, reset } =
        useForm<RegisterFormData>();

    const [registerUser] = useRegisterMutation();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const result = await registerUser(data);

            if (result.data) {
                alert("Registration successful!");
                reset();
            } else {
                alert("Registration failed!");
            }
        } catch {
            alert("An error occurred!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Registration</h2>

        <input
            placeholder="Name"
            {...register("name", { required: true })}
        />

        <input
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
        />

        <input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
        />

        <button type="submit">Register</button>
    </form>
);
}

export default RegisterForm;