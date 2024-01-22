import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import UseTitle from "../../../Utils/UseTitle";
import "./Register.css";

function Register(): JSX.Element {
    UseTitle("Vasilenko Vacations | Register");
    UseIsLoggedIn(false, 'Why would you like to register if you are already logged in?🥴');

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            if (await authService.register(user)) {
                noti.success("You have successfully registered");
                navigate(appConfig.vacationsRoute);
            }
        } catch (err: any) {
            noti.error(err)
        }

    }

    return (
        <div className="Register">
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit(send)}>
                    <label>First name:</label>
                    <input
                        required
                        type="text"
                        minLength={2}
                        maxLength={30}
                        {...register("userFirstName")}
                    />

                    <label>Last name:</label>
                    <input
                        required
                        type="text"
                        minLength={2}
                        maxLength={30}
                        {...register("userLastName")}
                    />

                    <label>Email:</label>
                    <input
                        required
                        type="email"
                        maxLength={50}
                        {...register("userEmail")}
                    />

                    <label>Password:</label>
                    <input
                        required
                        minLength={4}
                        type="password"
                        {...register("userPassword")}
                    />

                    <label>Already a member?<NavLink to={appConfig.loginRoute}>login</NavLink></label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
