import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import UseTitle from "../../../Utils/UseTitle";
import "./Login.css";
import { authStore } from "../../../Redux/AuthState";


function Login(): JSX.Element {
    UseTitle("Vasilenko Vacations | Login");
    UseIsLoggedIn(false, "You are already logged in!🥴");

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<CredentialsModel>();


    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);

            const fname = authStore.getState().user?.userFirstName;
            noti.success(`Welcome back ${fname}!`);
            navigate(appConfig.vacationsRoute);
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
                    <label>Email:</label>
                    <input
                        required
                        type="email"
                        maxLength={50}
                        {...register("email")}
                    />

                    <label>Password:</label>
                    <input type="password"
                        required
                        minLength={4}
                        {...register("password")}
                    />

                    <label>Not a member? <NavLink to={appConfig.registerRoute}>register</NavLink></label>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
