import { useEffect, useState } from "react";
import UserModel from "../../Models/UserModel";
import { authStore } from "../../Redux/AuthState";
import Header from "../Common/header/header";
import "./UserArea.css";
import profilePic from "../../Assets/Images/UtilityImages/me_square.jpeg"
import { useForm } from "react-hook-form";

function UserArea(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const [isFormEditDisabled, setIsFormEditDisabled] = useState<boolean>(true);
    const { register, handleSubmit, setValue } = useForm<UserModel>();

    useEffect(() => {
        const user: UserModel = authStore.getState().user;
        if (!user) throw new Error("Something went wrong, Please try agin later!");
        setUser(user);
        setValue("userFirstName", user.userFirstName);
        setValue("userLastName", user.userLastName);
        setValue("userEmail", user.userEmail);
    }, []);

    async function send(user: UserModel) {
        console.log(user);

    }

    return (
        <div className="UserArea">
            <Header {...{ title: `Hi ${user?.userFirstName}!` }} />
            <div>
                <div className="edit-button-container">
                    <button
                        className="toggle-edit-button"
                        onClick={() => setIsFormEditDisabled(!isFormEditDisabled)}>
                        {isFormEditDisabled ? "Enable" : "Disable"} editing
                    </button>
                </div>
                <div className="grid-container">

                    <div className="left">
                        <img src={profilePic} />
                    </div>

                    <div className="right">
                        <form onSubmit={handleSubmit(send)}>
                            <input
                                required
                                type="text"
                                minLength={2}
                                maxLength={30}
                                disabled={isFormEditDisabled}
                                {...register("userFirstName")}
                            />
                            <input
                                required
                                type="text"
                                minLength={2}
                                maxLength={30}
                                {...register("userLastName")}
                                disabled={isFormEditDisabled}
                            />
                            <input
                                required
                                type="email"
                                maxLength={50}
                                {...register("userEmail")}
                                disabled={isFormEditDisabled}
                            />
                            <div>
                                <button disabled={isFormEditDisabled}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserArea;
