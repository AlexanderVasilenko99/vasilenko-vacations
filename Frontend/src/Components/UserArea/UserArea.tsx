import { useEffect, useState } from "react";
import UserModel from "../../Models/UserModel";
import { authStore } from "../../Redux/AuthState";
import Header from "../Common/header/header";
import "./UserArea.css";
import profilePic from "../../Assets/Images/UtilityImages/me_square.jpeg"
import { useForm } from "react-hook-form";
import authService from "../../Services/AuthService";
import noti from "../../Services/NotificationService";
import UseTitle from "../../Utils/UseTitle";
import useImagePreview from "../../Utils/UseImagePreview";

function UserArea(): JSX.Element {
    UseTitle("Vasilenko Vacation | Profile")
    const [user, setUser] = useState<UserModel>();
    const [imgSrc, setImgSrc] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>();
    const [isFormEditDisabled, setIsFormEditDisabled] = useState<boolean>(true);

    const { register, handleSubmit, setValue } = useForm<UserModel>();

    const imageSrc = useImagePreview(imageFile);

    useEffect(() => {
        const user: UserModel = authStore.getState().user;
        if (!user) throw new Error("Something went wrong, Please try agin later!");

        setUser(user);
        setImgSrc(user.userImageUrl);
        setValue("userEmail", user.userEmail);
        setValue("userLastName", user.userLastName);
        setValue("userFirstName", user.userFirstName);

    }, []);

    function handleChange(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;

        const url = URL.createObjectURL(files[0]);
        setImageFile(files.item(0));
        setImgSrc(url);
    }

    async function send(changedUser: UserModel) {
        try {
            changedUser.userUUID = user.userUUID;
            changedUser.userRoleId = user.userRoleId;
            changedUser.userUploadedImage = imageFile;

            // await authService.update(changedUser);

            setUser(changedUser);
            setIsFormEditDisabled(!isFormEditDisabled)
            noti.success("The changes have been saved successfully!");
        } catch (err: any) {
            noti.error(err)
        }
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
                    <form onSubmit={handleSubmit(send)}>
                        <div className="left">
                            {imgSrc && <img
                                src={imgSrc}
                                title="Change photo"
                                className={isFormEditDisabled ? "disabled" : ""}
                                onClick={() => {
                                    const inp = document.getElementById("image-file-input") as HTMLInputElement;
                                    inp.click();
                                }}
                            />}
                            <input
                                type="file"
                                accept="image/*"
                                title="Upload Photo"
                                id="image-file-input"
                                className={imgSrc ? "invisible" : "imageInput"}
                                onChangeCapture={handleChange}
                                {...register("userUploadedImage")}
                                disabled={isFormEditDisabled}
                            />
                        </div>

                        <div className="right">
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
                                <button
                                    className="submit-edit-button"
                                    disabled={isFormEditDisabled}>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default UserArea;
