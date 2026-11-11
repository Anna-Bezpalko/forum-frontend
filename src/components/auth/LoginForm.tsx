import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/baseApi";

interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const { register, handleSubmit, reset } =
        useForm<LoginFormData>();

    const [loginUser] = useLoginMutation();

    const onSubmit = async (data: LoginFormData) => {
        const result = await loginUser(data);

        if (result.data) {
            alert("Login successful!");
            reset();
        } else {
            alert("Login failed! Check your email and password.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
            />

            <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;