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
import { HashLink } from "react-router-hash-link";

function Admin(): JSX.Element {
    const params = useParams();
    const uuid = params.uuid;
    const [imgSrc, setImgSrc] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();


    // const dateParser = (date: Date | string): string => {
    //     const initialDate = new Date(date);
    //     const day = initialDate.getDate();
    //     const month = initialDate.getMonth() + 1;
    //     const year = initialDate.getFullYear();
    //     return `${year}-${month < 9 ? '0' : ''}${month}-${day < 9 ? '0' : ''
    //         }${day}`;
    // };
    // const [imageName, setImageName] = useState<string>("");
    const [v, setV] = useState<VacationModel>();

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
                setV(vacation);
                setValue("vacationCity", vacation.vacationCity);
                setValue("vacationCountry", vacation.vacationCountry);
                setValue("vacationDescription", vacation.vacationDescription);
                setValue("vacationPrice", vacation.vacationPrice);
                setImgSrc(vacation.vacationImageUrl)
                // setImageName(vacation.vacationImageName)
                // setValue("vacationStartDate", new Date(vacation.vacationStartDate).toISOString().substring(0, 10));
                // setValue("vacationEndDate", vacation.vacationEndDate);

                // setValue('vacationStartDate', vacation.vacationStartDate);
                // setValue('vacationEndDate', vacation.vacationEndDate);

                // setValue("imageUrl", product.imageUrl);
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
    function toggleEdit(): void {
        setIsDisabled(!isDisabled);
    }

    async function update(vacation: VacationModel): Promise<void> {
        try {

            vacation.vacationUUID = uuid;
            vacation.vacationImageName = v.vacationImageName;
            vacation.vacationImageUrl = v.vacationImageUrl;
            if (vacation.vacationUploadedImage)
                vacation.vacationUploadedImage = (vacation.vacationUploadedImage as unknown as FileList)[0];

            await vacationService.updateVacation(vacation);
            noti.success("The vacation has been updated successfully!");
            navigate(appConfig.vacationsRoute);

        } catch (err: any) {
            noti.error(err);
        }
    }

    return (
        <div className="Admin">
            <h1>
                <NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink>
                <button className="toggle-edit-button" onClick={toggleEdit}>{isDisabled ? "Enable" : "Disable"} Editing</button>
            </h1>
            <div className="grid-container">

                <div className="left">
                    <div>
                        <h3>Summary</h3>
                        <ul>
                            <li><HashLink smooth to="#vacation-country">Vacation Country</HashLink></li>
                            <li><HashLink smooth to="#vacation-city">Vacation City</HashLink></li>
                            <li><HashLink smooth to="#vacation-description">Vacation Description</HashLink></li>
                            <li><HashLink smooth to="#vacation-price">Vacation Price</HashLink></li>
                            <li><HashLink smooth to="#vacation-start">Vacation Dates</HashLink></li>
                            <li><HashLink smooth to="#vacation-image">Vacation Image</HashLink></li>
                        </ul>
                    </div>
                </div>


                <div className="right">
                    <form onSubmit={handleSubmit(update)}>
                        <h3 id="vacation-country">Vacation Country: </h3>
                        <input type="text" {...register("vacationCountry")}
                            required minLength={2} maxLength={100} disabled={isDisabled} />

                        <h3 id="vacation-city">Vacation City: </h3>
                        <input type="text" {...register("vacationCity")}
                            required minLength={2} maxLength={100} disabled={isDisabled} />

                        <h3 id="vacation-description">Vacation Description: </h3>
                        <textarea {...register("vacationDescription")} rows={3}
                            required minLength={2} maxLength={100} disabled={isDisabled} />

                        <h3 id="vacation-price">Vacation Price: </h3>
                        <input type="number"{...register("vacationPrice")}
                            required min={0} max={9999} disabled={isDisabled} />

                        <div className="dates-container">
                            <div className="startDate">
                                <h3 id="vacation-start">Vacation Start Date: </h3>
                                <input type="date"
                                    {...register("vacationStartDate", { valueAsDate: true })}
                                    required disabled={isDisabled} />
                            </div>
                            <div className="endDate">
                                <h3>Vacation End Date: </h3>
                                <input type="date"
                                    {...register("vacationEndDate", { valueAsDate: true })}
                                    required disabled={isDisabled} />
                            </div>
                        </div>
                        <div className="image-section-container">
                            <h3 id="vacation-image">Vacation image: </h3>
                            <input className="imageInput" type="file" accept="image/*" disabled={isDisabled}
                                {...register("vacationUploadedImage")} onChange={handleImageChange} />
                        </div>
                        <div className="imageContainer">
                            <img src={imgSrc} />
                        </div>
                        <div className="button-container">
                            <button disabled={isDisabled}>Update Vacation</button>
                        </div>
                    </form>
                </div>
            </div>
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
        </div>
    );
}

export default Admin;
