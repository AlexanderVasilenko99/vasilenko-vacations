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
    UseIsLoggedIn('Why would you like to register if you are already logged in?🥴');
    UseTitle("Vasilenko Vacations | Register");
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();


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
                <h2>
                    Register
                </h2>
                <form onSubmit={handleSubmit(send)}>
                    <label>First name:</label>
                    <input type="text"{...register("userFirstName")} required />

                    <label>Last name:</label>
                    <input type="text" {...register("userLastName")} required />

                    <label>Email:</label>
                    <input type="email" {...register("userEmail")} required />

                    {/* ADD CHECK IF EMAIL IS ALREADY TAKEN! */}
                    <label>Password:</label>
                    <input type="password" {...register("userPassword")}
                        required minLength={4} />

                    <label>Already a member?
                        <NavLink to={appConfig.loginRoute}>login</NavLink></label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
