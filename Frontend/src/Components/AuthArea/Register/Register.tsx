import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import noti from "../../../Services/NotificationService";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import UseTitle from "../../../Utils/UseTitle";

function Register(): JSX.Element {
    UseTitle("Vasilenko Vacations | Register");
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            noti.success("You have successfully registered");
            navigate(appConfig.homeRoute);
        } catch (err: any) {
            noti.error(err)
        }

    }

    return (
        <div className="Register">
            <h2>
                Register
            </h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First name:</label><input type="text" {...register("firstName")} />
                <label>Last name:</label><input type="text" {...register("lastName")} />
                <label>Email:</label><input type="text" {...register("email")} />
                <label>Password:</label><input type="password" {...register("password")} />

                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
