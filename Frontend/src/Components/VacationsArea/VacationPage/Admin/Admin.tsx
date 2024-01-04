import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../Models/VacationModel";
import noti from "../../../../Services/NotificationService";
import vacationService from "../../../../Services/VacationService";
import { useEffect, useState } from "react";
import appConfig from "../../../../Utils/AppConfig";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";

function Admin(): JSX.Element {
    const params = useParams();
    const uuid = params.uuid;
    const [imgSrc, setImgSrc] = useState<string>("");
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    useEffect(() => {
        const token = authStore.getState().token;
        if (!token) {
            noti.error("Please login in to view this page");
            navigate("/login");
        }
        if (authStore.getState().user?.userRoleId === 2) {
            noti.error("You must be administrator to view this page")
            navigate(appConfig.loginRoute)
        }
        vacationService.getOneVacation(uuid)
            .then(vacation => {
                setValue("vacationCity", vacation.vacationCity);
                setValue("vacationCountry", vacation.vacationCountry);
                setValue("vacationDescription", vacation.vacationDescription);
                setValue("vacationPrice", vacation.vacationPrice);
                // setValue("vacationStartDate", sDay);
                // setValue("vacationEndDate", vacation.vacationEndDate);

                // setValue("stock", product.stock);
                // setValue("imageUrl", product.imageUrl);
                setImgSrc(vacation.vacationImageUrl)
                // console.log(vacation);

            })
            .catch((err) => console.log(err));
    }, []);
    function handleImageChange(e: any) {
        if (e) {
            const file = (e.target.files)[0];
            const url = URL.createObjectURL(file);
            setImgSrc(url);
        }
    }

    async function update(vacation: VacationModel): Promise<void> {
        try {
            vacation.vacationUploadedImage = (vacation.vacationUploadedImage as unknown as FileList)[0];
            vacation.vacationUUID = uuid;
            noti.success("The vacation has been updated successfully!");
            await vacationService.updateVacation(vacation);

        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <div className="Admin">
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
            <div className="grid-container">

                <div className="left">
                    <div>
                        <h3>Summary</h3>
                    </div>
                </div>


                <div className="right">
                    <form onSubmit={handleSubmit(update)}>
                        <h3>Vacation Country: </h3><input type="text" {...register("vacationCountry")}
                            required minLength={2} maxLength={100} />
                        <h3>Vacation City: </h3><input type="text" {...register("vacationCity")}
                            required minLength={2} maxLength={100} />
                        <textarea {...register("vacationDescription")} cols={20} rows={7}
                            required minLength={2} maxLength={100} />
                        <h3>Vacation Price: </h3><input type="number" {...register("vacationPrice")}
                            required min={0} max={9999} />

                        <h3>Vacation Start Date: </h3><input type="date" {...register("vacationStartDate")} required />
                        <h3>Vacation End Date: </h3><input type="date" {...register("vacationEndDate")} required />

                        <h3>Vacation image: </h3><input type="file" {...register("vacationUploadedImage")}
                            accept="image/*" onChange={handleImageChange} />
                        <div className="imageContainer">
                            <img src={imgSrc} />
                        </div>
                        <button>Update Vacation</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;
