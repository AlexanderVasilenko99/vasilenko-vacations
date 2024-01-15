import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";
import UseTitle from "../../../Utils/UseTitle";
import "./Login.css";
import appConfig from "../../../Utils/AppConfig";


function Login(): JSX.Element {
    UseTitle("Vasilenko Vacations | Login");
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            console.log(credentials);

            noti.success(`Welcome back`);
            navigate(appConfig.vacationsRoute); //CHANGE THIS TO NAVIGATE TO ALL VACATIONS

        } catch (err: any) {
            noti.error(err)
        }

    }

    return (
        <div className="Login">
            <div className="form-container">
                <h2>
                    Login
                </h2>
                <form onSubmit={handleSubmit(send)}>
                    <label>Email:</label><input type="email" {...register("email")} required />
                    <label>Password:</label><input type="password" {...register("password")} required minLength={4} />
                    <label>Not a member? <NavLink to={appConfig.registerRoute}>register</NavLink></label>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
