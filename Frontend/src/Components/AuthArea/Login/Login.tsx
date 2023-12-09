import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";
import UseTitle from "../../../Utils/UseTitle";
import "./Login.css";


function Login(): JSX.Element {
    UseTitle("Vasilenko Vacations | Login");
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            console.log(credentials);

            noti.success(`Welcome back`);
            navigate(-1);

        } catch (err: any) {
            noti.error(err)
        }

    }

    return (
        <div className="Login">

            <h2>
                Login
            </h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Username:</label><input type="text" {...register("username")} />
                <label>Password:</label><input type="password" {...register("password")} />

                <button>Log in</button>
            </form>

        </div>
    );
}

export default Login;
