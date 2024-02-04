import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import UseTitle from "../../../Utils/UseTitle";
import "./Register.css";
import logo from "../../../Assets/Images/UtilityImages/project-logo.png"

function Register(): JSX.Element {
    UseTitle("Vasilenko Vacations | Register");
    UseIsLoggedIn(false, 'Why would you like to register if you are already logged in?🥴');

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            noti.success("You have successfully registered");
            navigate(appConfig.vacationsRoute);
        } catch (err: any) {
            noti.error(err)
        }

    }

    return (
        <div className="Register">
            <div className="grid-container">

                <div className="left">
                    <img src={logo} />
                </div>

                <div className="right">
                    <form onSubmit={handleSubmit(send)}>
                        <div>
                            <label>First name:</label>
                            <input
                                required
                                type="text"
                                minLength={2}
                                maxLength={30}
                                {...register("userFirstName")}
                            />
                        </div>
                        <div>
                            <label>Last name:</label>
                            <input
                                required
                                type="text"
                                minLength={2}
                                maxLength={30}
                                {...register("userLastName")}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                required
                                type="email"
                                maxLength={50}
                                {...register("userEmail")}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                required
                                minLength={4}
                                type="password"
                                {...register("userPassword")}
                            />
                        </div>
                        <div>
                            <label>Already a member? <NavLink to={appConfig.loginRoute}>Login Here!</NavLink></label>
                        </div>

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
