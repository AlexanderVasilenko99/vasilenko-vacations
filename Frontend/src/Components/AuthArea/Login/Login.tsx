import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../Assets/Images/UtilityImages/project-logo.png";
import CredentialsModel from "../../../Models/CredentialsModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import UseTitle from "../../../Utils/UseTitle";
import "./Login.css";


function Login(): JSX.Element {
    UseTitle("Vasilenko Vacations | Login");
    UseIsLoggedIn(false, "You are already logged in!🥴");

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<CredentialsModel>();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            const fname = authStore.getState().user?.userFirstName;
            notificationService.success(`Welcome back ${fname}!`);
            navigate(appConfig.vacationsRoute);
        } catch (err: any) {
            notificationService.error(err)
        }

    }

    return (
        <div className="Login">
            <div className="grid-container">
                <div className="left">
                    <img src={logo} />
                </div>
                <div className="right">
                    <form onSubmit={handleSubmit(send)}>
                        <div>
                            <label>Email:</label>
                            <input
                                required
                                type="email"
                                maxLength={50}
                                {...register("email")}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password"
                                required
                                minLength={4}
                                {...register("password")}
                            />
                        </div>
                        <div>
                            <label>Not a member yet? <NavLink to={appConfig.registerRoute}>Register Here!</NavLink></label>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
