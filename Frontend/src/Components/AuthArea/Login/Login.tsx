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
            navigate(-1); //CHANGE THIS TO NAVIGATE TO ALL VACATIONS

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
                <label>Email:</label><input type="email" {...register("email")} required />
                <label>Password:</label><input type="password" {...register("password")} required minLength={4} />

                <button>Log in</button>
            </form>

        </div>
    );
}

export default Login;
